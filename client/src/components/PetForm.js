import React, { useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";

const PetForm = (props) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");
    const [errors, setErrors] = useState({});

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/pets", {
                name,
                type,
                description,
                skill1,
                skill2,
                skill3,
            })
            .then((res) => {
                if (res.data.errors) {
                    setErrors(res.data.errors);
                } else {
                    navigate("/");
                }
                console.log(res);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Pet Shelter</h1>
                <Link className="btn btn-link mx-1" to="/">
                    Back To Home
                </Link>
            </div>

            <h3>Know a pet needing a home?</h3>
            <form className=" mx-auto my-5" onSubmit={onSubmitHandler}>
                <h1>Add a pet</h1>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <span className="text-danger">
                                {errors.name ? errors.name.message : ""}
                            </span>
                        </div>
                        <div className="form-group">
                            <label>Type</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setType(e.target.value)}
                            />
                            <span className="text-danger">
                                {errors.type ? errors.type.message : ""}
                            </span>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <span className="text-danger">
                                {errors.description
                                    ? errors.description.message
                                    : ""}
                            </span>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label>Skill 1</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setSkill1(e.target.value)}
                            />
                            <span className="text-danger">
                                {errors.skill1 ? errors.skill1.message : ""}
                            </span>
                        </div>
                        <div className="form-group">
                            <label>Skill 2</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setSkill2(e.target.value)}
                            />
                            <span className="text-danger">
                                {errors.skill2 ? errors.skill2.message : ""}
                            </span>
                        </div>
                        <div className="form-group">
                            <label>Skill 3</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setSkill3(e.target.value)}
                            />
                            <span className="text-danger">
                                {errors.skill3 ? errors.skill3.message : ""}
                            </span>
                        </div>
                    </div>
                </div>

                <button className="btn btn-dark" type="submit">
                    Add pet
                </button>
            </form>
        </div>
    );
};

export default PetForm;
