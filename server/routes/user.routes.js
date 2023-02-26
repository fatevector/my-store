const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });

router.put("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        // todo: userId === current user id
        if (userId) {
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
                new: true
            });
            res.send(updatedUser);
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

router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        // todo: userId === current user id
        if (userId) {
            const foundUser = await User.findById(userId);
            res.send(foundUser);
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
