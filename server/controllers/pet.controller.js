const { Pet } = require("../models/pet.model");
module.exports.index = (request, response) => {
    response.json({
        message: "Hello World",
    });
};

module.exports.createPet = (request, response) => {
    const { name, type, description, skill1, skill2, skill3 } = request.body;
    Pet.create({
        name,
        type,
        description,
        skill1,
        skill2,
        skill3,
    })
        .then((pet) => response.json(pet))
        .catch((err) => response.json(err));
};

module.exports.getAll = (request, response) => {
    Pet.find({})
        .sort("type")
        .then((pets) => response.json(pets))
        .catch((err) => response.json(err));
};

module.exports.getOne = (request, response) => {
    Pet.findOne({ _id: request.params.id })
        .then((pets) => {
            console.log(pets);
            response.json(pets);
        })
        .catch((err) => response.status(400).json(err));
};

module.exports.deletePet = (request, response) => {
    Pet.deleteOne({ _id: request.params.id })
        .then((deleteConfirmation) => response.json(deleteConfirmation))
        .catch((err) => response.json(err));
};

module.exports.updatePet = (request, response) => {
    Pet.findOneAndUpdate({ _id: request.params.id }, request.body, {
        runValidators: true,
    })
        .then((updatedPet) => response.json(updatedPet))
        .catch((err) => {
            const errorResponse = err.response.data.errors; // Get the errors from err.response.data
            const errorArr = []; // Define a temp error array to push the messages in
            for (const key of Object.keys(errorResponse)) {
                // Loop through all errors and get the messages
                errorArr.push(errorResponse[key].message);
            }
            // Set Errors
            setErrors(errorArr);
        });
};

module.exports.likePet = (request, response) => {
    Pet.findOneAndUpdate({ _id: request.params._id }, { $inc: { likes: 1 } })
        .then(() => response.json({ msg: "Black Belt???" }))
        .catch((err) => response.json(err));
};
