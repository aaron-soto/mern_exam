const mongoose = require("mongoose");
// var uniqueValidator = require("mongoose-unique-validator");

const PetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "The pets name is required"],
            // unique: true,
            minlength: [3, "The pets name must be at least 3 characters long."],
        },
        type: {
            type: String,
            required: [true, "The pets type is required"],
            minlength: [3, "The pets name must be at least 3 characters long."],
        },
        description: {
            type: String,
            required: [true, "The pets description is required"],
            minlength: [3, "The pets name must be at least 3 characters long."],
        },
        skill1: {
            type: String,
        },
        skill2: {
            type: String,
        },
        skill3: {
            type: String,
        },
        likes: {
            type: Number,
        },
    },
    { timestamps: true }
);

module.exports.Pet = mongoose.model("Pet", PetSchema);
// PetSchema.plugin(uniqueValidator);
