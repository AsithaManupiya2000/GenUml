import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/nav/navbar/Navbar";
import "./UserInput.css";
import axios from "axios";
import DiagramMarkdownContext from "../../context/DiagramMarkdownContext";
import Loading from "../../components/alert/Loading";
import AlertMsg from "../../components/alert/AlertMsg";

const UserInput = () => {
    const [formData, setFormData] = useState({});
    const [showLoading, setShowLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [errorMsg, setErrorMsg] = useState();
    const navigate = useNavigate();
    const { setResponseData } = useContext(DiagramMarkdownContext); // Context

    // add textarea value to state
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    // handle generate diagram btn click
    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData["userinput-textarea"]) {
            sendDataToServer(formData);
        } else {
            setErrorMsg("No senarios entered..");
            setShowAlert(true);
        }
    };

    // sending data to server
    function sendDataToServer(data) {
        setShowLoading(true);
        const data1 = new FormData();
        data1.append("userinput-textarea", data["userinput-textarea"]);
        console.log(data1);
        axios
            .post("http://localhost/GenUML/generateDiagram.php", data1)
            .then((response) => {
                console.log("res " + response.data);
                setResponseData(response.data.link);
                setShowLoading(false);
                navigate("/download");
            })
            .catch((error) => {
                console.log(error);
                setShowLoading(false);
                setErrorMsg("error occured.. Pls try again later..");
                setShowAlert(true);
            });
    }

    return (
        <div>
            <Navbar />
            {showAlert && <AlertMsg type="warning" text={errorMsg} setShowAlert={setShowAlert} />}
            <div>
                <div className="userInput-container">
                    <h2 className="mb-4">GenUML</h2>

                    <div className="form-outline">
                        <textarea
                            name="userinput-textarea"
                            onChange={handleChange}
                            className="form-control border border-5 rounded"
                            id="textarea"
                            rows="6"
                            placeholder="Enter your senario.."
                        ></textarea>
                    </div>
                    {showLoading && <Loading msg="Generating Diagram" />}

                    <div className="d-flex justify-content-around mt-4">
                        <button type="button" className="btn btn-success">
                            <i className="fa fa-file-arrow-up ms-1"></i> import file
                        </button>
                        <button type="button" className="btn btn-danger" onClick={handleSubmit}>
                            Generate Diagram
                            <i className="fas fa-long-arrow-alt-right ms-1"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInput;
