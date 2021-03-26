import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";

const PetDetails = (props) => {
    const [pet, setPet] = useState({});
    const [likes, setLikes] = useState(0);

    const getPet = () => {
        axios
            .get("http://localhost:8000/api/pets/" + props.id)
            .then((res) => {
                console.log(res);
                setPet(res.data);
            })
            .catch((err) => console.log("Error: ", err));
    };
    useEffect(() => {
        getPet();
    }, [props.id]);

    const { removeFromDom } = props;

    const deletePet = (_id) => {
        axios
            .delete("http://localhost:8000/api/pets/" + _id)
            .then((res) => {
                navigate("/");
            })
            .catch((err) => console.log(err));
    };

    const likePet = (_id) => {
        axios
            .put("http://localhost:8000/api/like/" + _id, {
                likes,
            })
            .then((res) => {
                console.log(res);
                getPet();
            })
            .catch((err) => console.log(err));
        document.getElementById("button").setAttribute("disabled", "disabled");
    };

    return (
        <div className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Pet Shelter</h1>
                <Link className="btn btn-link mx-1" to="/">
                    Back To Home
                </Link>
            </div>

            <div className="d-flex justify-content-between">
                <h2>Details about: {pet.name}</h2>
                <button
                    className="btn btn-dark"
                    onClick={(e) => {
                        deletePet(pet._id);
                    }}
                >
                    Adopt {pet.name}
                </button>
            </div>
            <div className="col border p-4 mt-4">
                <div className="row mb-4">
                    <h4 className="col-2">Pet Type:</h4>
                    <p className="col">{pet.type}</p>
                </div>
                <div className="row mb-4">
                    <h4 className="col-2">Description:</h4>
                    <p className="col">{pet.description}</p>
                </div>
                <div className="row mb-4">
                    <h4 className="col-2">Skills:</h4>
                    <div className="col">
                        <p>{pet.skill1}</p>
                        <p>{pet.skill2}</p>
                        <p>{pet.skill3}</p>
                    </div>
                </div>
                <div className="d-flex align-middle align-items-center">
                    <button
                        className="btn btn-danger"
                        onClick={(e) => {
                            likePet(pet._id);
                        }}
                        id="button"
                    >
                        Like this pet
                    </button>
                    <p className="mb-0 ml-4">Likes: {pet.likes}</p>
                </div>
            </div>
        </div>
    );
};

export default PetDetails;
