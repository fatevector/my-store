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
            required: false,
            default: "https://cdn-icons-png.flaticon.com/512/1867/1867848.png"
        },
        popular: {
            type: Boolean,
            required: false,
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
        },
        isDeleted: {
            type: Boolean
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("Product", schema);
