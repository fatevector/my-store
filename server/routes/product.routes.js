const express = require("express");
const { check, validationResult } = require("express-validator");

const Product = require("../models/Product");
const auth = require("../middleware/auth.middleware");
const Category = require("../models/Category");
const User = require("../models/User");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
    try {
        const { filterBy, equalTo } = req.query;
        let list = [];
        if (filterBy && equalTo) {
            list = await Product.find({ [filterBy]: equalTo });
        } else {
            list = await Product.find();
        }

        // todo: фильтр list по !isDeleted

        res.status(200).send(list);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

router.get("/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const foundProduct = await Product.findById(productId);

        // todo: Если isDeleted, то кинуть ошибку

        res.send(foundProduct);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

router.post("/", auth, [
    check("name", "Наименование товара не может отсутствовать").exists(),
    check("category", "Категория товара не может отсутствовать").exists(),
    check("price", "Стоимость товара не может отсутствовать").exists(),
    async (req, res) => {
        try {
            const foundUser = await User.findById(req.user._id);
            if (foundUser && foundUser.role === "admin") {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        error: {
                            message: "INVALID_DATA",
                            code: 400,
                            errors: errors.array()
                        }
                    });
                }

                const foundCategory = await Category.findById(
                    req.body.category
                );

                const image = req.body?.image
                    ? req.body.image
                    : "https://cdn-icons-png.flaticon.com/512/1867/1867848.png";

                const newProduct = await Product.create({
                    ...req.body,
                    image,
                    category: foundCategory._id
                });

                res.status(201).send(newProduct);
            } else {
                res.status(401).json({
                    error: {
                        message: "UNAUTHORIZED",
                        code: 401
                    }
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже"
            });
        }
    }
]);

router.delete("/:productId", auth, async (req, res) => {
    try {
        const foundUser = await User.findById(req.user._id);
        if (foundUser && foundUser.role === "admin") {
            const { productId } = req.params;
            const removedProduct = await Product.findById(productId);

            removedProduct.isDeleted = true;
            removedProduct.save();

            return res.send(null);
        } else {
            res.status(401).json({
                error: {
                    message: "UNAUTHORIZED",
                    code: 401
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

// todo: Проверить patch

router.patch("/:productId", auth, async (req, res) => {
    try {
        const { productId } = req.params;
        const foundUser = await User.findById(req.user._id);
        if (foundUser && foundUser.role === "admin") {
            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                req.body,
                {
                    new: true
                }
            );
            res.send(updatedProduct);
        } else {
            res.status(401).json({
                error: {
                    message: "UNAUTHORIZED",
                    code: 401
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

module.exports = router;
