const PetController = require("../controllers/pet.controller");

module.exports = (app) => {
    app.get("/", PetController.index);
    app.post("/api/pets", PetController.createPet);
    app.get("/api/pets", PetController.getAll);
    app.get("/api/pets/:id", PetController.getOne);
    app.delete("/api/pets/:id", PetController.deletePet);
    app.put("/api/pets/:id", PetController.updatePet);
    app.put("/api/like/:_id", PetController.likePet);
};
