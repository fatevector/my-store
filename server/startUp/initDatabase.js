const chalk = require("chalk");

const categoriesMock = require("../mock/categories.json");
const productsMock = require("../mock/products.json");

const Category = require("../models/Category");
const Product = require("../models/Product");

const createInitialEntity = async (Model, data) => {
    await Model.collection.drop();
    return Promise.all(
        data.map(async item => {
            try {
                delete item.id;
                const newItem = new Model(item);
                await newItem.save();
                return newItem;
            } catch (error) {
                console.log(chalk.red(error));
                return error;
            }
        })
    );
};

module.exports = async () => {
    const categories = await Category.find();
    if (categories.length !== categoriesMock.length) {
        await createInitialEntity(Category, categoriesMock);
    }

    const products = await Product.find();
    if (products.length !== productsMock.length) {
        await createInitialEntity(Product, productsMock);
    }
};
