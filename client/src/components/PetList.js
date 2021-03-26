import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@reach/router";

const PetList = (props) => {
    const [updatedList, setUpdatedList] = useState(false);
    const [pets, setPets] = useState([]);

    const { removeFromDom } = props;

    const deletePet = (_id) => {
        axios
            .delete("http://localhost:8000/api/pets/" + _id)
            .then((res) => {
                removeFromDom(_id);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/pets")
            .then((res) => {
                setPets(res.data);
                setUpdatedList(!updatedList);
            })
            .catch((err) => console.log(err));
    }, [updatedList]);

    return (
        <div className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Pet Shelter</h1>
                <Link className="btn btn-link mx-1" to="/pets/new">
                    Add a new Pet
                </Link>
            </div>

            <h3>These pets are looking for a good home</h3>
            <table className="table table-striped mt-4 mx-auto">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions Available</th>
                    </tr>
                    {pets.map((pet, i) => (
                        <tr key={i} className="align-middle">
                            <td>
                                <p className="lead m-0">{pet.name}</p>
                            </td>
                            <td>
                                <p className="lead m-0">{pet.type}</p>
                            </td>
                            <td>
                                <Link
                                    className="btn btn-link m-0"
                                    to={"/pets/" + pet._id}
                                >
                                    Details
                                </Link>
                                |
                                <Link
                                    className="btn btn-link m-0"
                                    to={"/edit/" + pet._id}
                                >
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PetList;
