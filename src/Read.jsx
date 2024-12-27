import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "./Assets/readBackground.avif";

function Read({ selectUser }) {
  // SETTING BACKGROUND IMAGE
  const background = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100%",
  };

  if (!selectUser) return;
  <h2 style={{ textAlign: "center" }}>No User Selected</h2>;

  return (
    <div
      className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light"
      style={background} >
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded responsive-sm">
        <h1
          style={{
            textAlign: "center",
            backgroundColor: "lightblue",
            color: "white",
          }}
          className="rounded"
         >
          Details of User
        </h1>
        <div className="mb-2">
          <strong>Name: </strong> {selectUser.name}
        </div>
        <div className="mb-2">
          <strong>Email: </strong> {selectUser.email}
        </div>
        <div className="mb-2">
          <strong>Phone No: </strong> {selectUser.phone}
        </div>
        <div className="mb-2">
          <strong>Address: </strong> {selectUser.address?.city || "N/A"}
        </div>

        <Link
          to="/"
          className="btn btn-primary ms-3 mt-3 ps-4 pe-4"
          style={{ textAlign: "center" }}
         >
          Back
        </Link>
      </div>
    </div>
  );
}

export default Read;
