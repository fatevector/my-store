const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            uniq: true
        },
        password: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true,
            default:
                "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        },
        role: {
            type: String,
            required: true,
            default: "user"
        },
        cart: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = model("User", schema);
