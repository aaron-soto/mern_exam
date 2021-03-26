import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";

const EditPet = (props) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/pets/" + props.id)
            .then((res) => {
                setName(res.data.name);
                setType(res.data.type);
                setDescription(res.data.description);
                setSkill1(res.data.skill1);
                setSkill2(res.data.skill2);
                setSkill3(res.data.skill3);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.id]);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const editedPet = {
            name,
            type,
            description,
            skill1,
            skill2,
            skill3,
        };

        axios
            .put("http://localhost:8000/api/pets/" + props.id, editedPet)
            .then((res) => {
                console.log(res);
                navigate("/");
            })
            .catch((err) => {
                setErrors(err.response.data.errors);
            });
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Pet Shelter</h1>
                <Link className="btn btn-link mx-1" to="/">
                    Back To Home
                </Link>
            </div>
            <h3>Know of a pet needing a home?</h3>
            <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <label>Pet Name</label>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        value={name}
                    />
                    <span className="text-danger">
                        {errors.name ? errors.name.message : ""}
                    </span>
                </div>

                <div className="form-group">
                    <label>Pet Type</label>
                    <input
                        type="text"
                        onChange={(e) => setType(e.target.value)}
                        className="form-control"
                        value={type}
                    />
                    <span className="text-danger">
                        {errors.type ? errors.type.message : ""}
                    </span>
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                        value={description}
                    />
                    <span className="text-danger">
                        {errors.description ? errors.description.message : ""}
                    </span>
                </div>

                <div className="form-group">
                    <label>Skill 1</label>
                    <input
                        type="text"
                        onChange={(e) => setSkill1(e.target.value)}
                        className="form-control"
                        value={skill1}
                    />
                </div>

                <div className="form-group">
                    <label>Skill 2</label>
                    <input
                        type="text"
                        onChange={(e) => setSkill2(e.target.value)}
                        className="form-control"
                        value={skill2}
                    />
                </div>

                <div className="form-group">
                    <label>Skill 3</label>
                    <input
                        type="text"
                        onChange={(e) => setSkill3(e.target.value)}
                        className="form-control"
                        value={skill3}
                    />
                </div>

                <input
                    className="btn btn-dark"
                    type="submit"
                    value="Update Pet"
                />
            </form>
        </div>
    );
};

export default EditPet;
