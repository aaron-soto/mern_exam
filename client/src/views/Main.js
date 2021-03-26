import React, { useState } from "react";
import { Router } from "@reach/router";

import PetList from "../components/PetList";
import PetForm from "../components/PetForm";
import PetDetails from "../components/PetDetails";
import EditPet from "../components/EditPet";

const Main = () => {
    const [pets, setPets] = useState([]);

    const removeFromDom = (_id) => {
        setPets(pets.filter((pet) => pet._id !== _id));
    };

    return (
        <div className="container">
            <Router>
                <PetForm path="/pets/new" />
                <PetList path="/" removeFromDom={removeFromDom} />
                <PetDetails path="/pets/:id" />
                <EditPet path="/edit/:id" />
            </Router>
        </div>
    );
};

export default Main;
