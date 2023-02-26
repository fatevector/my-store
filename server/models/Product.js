const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        definition: {
            type: String
        },
        image: {
            type: String,
            required: true,
            default: "https://cdn-icons-png.flaticon.com/512/1867/1867848.png"
        },
        popular: {
            type: Boolean,
            required: true,
            default: false
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("Product", schema);
