const { ObjectId } = require("mongodb");
const GroceryIndexModel = require("../model/GroceryIndex")
const GroceryItemModel = require("../model/GroceryItem")

const sampleIndex = {
    "interiorItems": [
        { "name": "Table", "createAt": "2024-02-18T13:19:09Z" },
        { "name": "Chair", "createAt": "2024-02-18T13:19:09Z" },
        { "name": "Bookshelf", "createAt": "2024-02-18T13:19:09Z" },
        { "name": "Bed", "createAt": "2024-02-18T13:19:09Z" },
        { "name": "Lamp", "createAt": "2024-02-18T13:19:09Z" },
        { "name": "Wardrobe", "createAt": "2024-02-18T13:19:09Z" },
        { "name": "Shelf", "createAt": "2024-02-18T13:19:09Z" },
        { "name": "Dressing Table", "createAt": "2024-02-18T13:19:09Z" },
        { "name": "Refrigerator", "createAt": "2024-02-18T13:19:09Z" },
        { "name": "Stove", "createAt": "2024-02-18T13:19:09Z" },
        { "name": "Shoe Cabinet", "createAt": "2024-02-18T13:19:09Z" },
        { "name": "Sofa", "createAt": "2024-02-18T13:19:09Z" }
    ]
}

const addToDb = async (_req, res) => {
    try {
        for (let item of sampleIndex.interiorItems) {
            console.log(item.name);

            const res = await GroceryIndexModel.create({
                name: item.name,
                createAt: Date.now()
            })
        }

        return res.status(201).json({ message: "Create datas successfully" })
    } catch (err) {
        console.log(">>>Error: ", err);
        return res.status(500).json({ message: "Failed to add file" })
    }
}


const getGroceryIndex = async (req, res) => {
    try {
        const { name } = req.query
        const find = name ? await GroceryIndexModel.find({ name: name }) : await GroceryIndexModel.find()

        res.status(200).json({ message: "Found data", counter: find.length, data: find })
    } catch (err) {
        console.log(">>>Error fecth grocery", err);
        res.status(202).json({ message: "OK2" })
    }
}

const getGroceryItem = async (req, res) => {
    try {
        const { name } = req.query
        const find = await GroceryItemModel.find({ name: new RegExp(name, 'i') }).populate('index')

        res.status(202).json({ message: "OK1", index: find })
    } catch (err) {
        console.log(">>>Error fecth grocery", err);
        res.status(202).json({ message: "OK2" })
    }
}

items = ["Table", "Chair", "Bookshelf", "Bed", "Lamp", "Wardrobe", "Shelf", "Dressing Table", "Refrigerator", "Stove", "Shoe Cabinet", "Sofa"]

const addItem = async (req, res) => {
    const { name } = req.query
    try {

        const quantity = Math.round(Math.random(0, 0.5) * 10 + 5);
        console.log("quantity:", quantity);

        const find = await GroceryIndexModel.findOne({ name: name })

        if (!find) res.status(400).json({ message: "Error 400 :))" })


        for (let i = 0; i < quantity; i++) {
            const length = Math.random(100, 300)
            await GroceryItemModel.create({
                index: find._id,
                name: `${name} ${i}`,
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.".slice(0, length),
                quantity: Math.round(Math.random(0, 1) * 100),
                price: Math.round(Math.random(0, 1) * 100000 / 1000) * 1000,
                createAt: Date.now(),
                updateAt: Date.now()
            })
        }
        res.status(201).json({ message: "Create datas successfully" })
    } catch (err) {
        console.log(">>>Error: ", err);
        res.status(500)
        // return res.status(500).json({ message: "Failed to add file" })
    }
}

const getProducts = async (req, res) => {
    let type;
    try {
        type = req.body.data.type
        if (type) {
            const getType = await GroceryIndexModel.findOne({ name: type }).then(response => response._id)
            const response = await GroceryItemModel.find({ index: getType }).populate('index')

            res.status(200).json({ message: "Ok", response: response })
        } else {
            res.status(400).json({ message: "Syntax Error" })
        }

    } catch (err) {
        if (!type) {
            try {
                const response = await GroceryItemModel.find().populate('index')
                //shuffle array
                const shuffle = response.map((origin) => ({ sort: Math.random(), value: origin }))
                    .sort((a, b) => a.sort - b.sort)
                    .map((newFlow) => newFlow.value);


                res.status(200).json({ message: "Notype Ok", response: shuffle })

            } catch (err) {
                res.status(400).json({ message: " Notype Syntax Error" })
            }
        } else {
            console.log(">>>Error getting products");
            res.status(400).json({ message: ">>>Error getting products" })
        }
    }
}

module.exports = {
    addToDb,
    getGroceryIndex,
    addItem,
    getGroceryItem,
    getProducts
}