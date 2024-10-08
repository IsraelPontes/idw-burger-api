import * as Yup from 'yup'
import Order from '../schemas/Order'
import Product from '../models/Products'
import Category from '../models/Category'

class OrderController {
    async store(request, response) {
        const schema = Yup.object({
            products: Yup
                .array()
                .required()
                .of(
                    Yup.object({
                        id: Yup.number().required(),
                        quantity: Yup.number().required(),
                    })
                )
        })

        try {
            schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const { products } = request.body;
        const productsId = products.map((product) => product.id)
        const findProducts = await Product.findAll({
            where: {
                id: productsId,
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name'],
                }
            ]
        })
        const formattedProducts = findProducts.map(product => {
            const productIndex = products.findIndex(
                (item) => item.id === product.id
            )
            const newProdut = {
                id: product.id,
                name: product.name,
                category: product.category.name,
                price: product.price,
                url: product.url,
                quantity: product[productIndex].quantity,
            }
            return newProdut
        })
        const order = {
            user: {
                id: request.userId,
                name: request.userName,
            },
            products: formattedProducts,
            status: 'Pedido realizado',
        }
        const createdOrder = await Order.create(order);
        return response.status(201).json(createdOrder);
    }
    async index(request, response) {
        const orders = await Order.find();
        return response.json(orders);
    }
    async update(request, response) {
        const schema = Yup.object({
            status: Yup.string().required(),
        })

        try {
            schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const { id } = request.parans;
        const { status } = request.body;

        try {
            await Order.updateOne({ _id: id }, { status });
        } catch (err) {
            return response.status(400).json({ error: err.message })
        }
        
        return response.json({ message: 'Status updated sucessfully' });
    }
}
export default new OrderController();