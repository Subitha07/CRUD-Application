import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Form, Table } from "react-bootstrap";

function Home({ data, setData, handleReadUser }) {
  //STYLE FOR  APP HEADING
  const headerStyle = {
    backgroundColor: "violet",
    color: "white",
    padding: "10px",
  };

  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  //FOR FRONT EDIT BUTTON
  function handleEdit(User) {
    setCurrentUser(User);
    setShowModal(true);
  }

  //FOR MODAL UPDATE BUTTON AND PUT DATAS TO THE SERVER
  function handleUpdate() {
    if (currentUser) {
      fetch(`https://jsonplaceholder.typicode.com/users/${currentUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(currentUser),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("failed to update user");
          }
          return response.json();
        })
        .then((updateUser) => {
          setData((prevUser) =>
            prevUser.map((User) =>
              User.id === updateUser.id ? updateUser : User
            )
          );
          setShowModal(false);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }
  }
  //FORMODAL CLOSING BUTTON
  function closeButton() {
    setShowModal(false);
  }
  // FOR UPDATE INPUT EVENTS 
  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "city") {
      setCurrentUser((prev) => ({
        ...prev,
        address: { ...prev.address, city: value },
      }));
    } else {
      setCurrentUser((prev) => ({ ...prev, [name]: value }));
    }
  }
  //FOR FROND DELETE BUTTON
  function handleDelete(id) {
    const confirm = window.confirm("Would You Want to Delete ?");
    if (confirm) {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      }).then(() => setData(data.filter((predata) => predata.id !== id)));
    }
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center  vh-75">
      <h1
        style={{
          backgroundColor: "lightpink",
          color: "white",
          padding: "10px",
        }}
        className="rounded mt-4 ps-5 pe-5"
       >
        CRUD OPERATION
      </h1>

      <div className=" w-75   p-4">

        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-info ps-3 pe-3 mb-3">
            Add{" "}
          </Link>
        </div>

        <div className="table-container">
          <Table className="table  table-striped table-hover table-responsive-sm   table-sm">
            <thead style={{ textAlign: "center" }}>
              <tr>
                <th style={headerStyle}>ID</th>
                <th style={headerStyle}>Name</th>
                <th style={headerStyle}>Email</th>
                <th style={headerStyle}>Phone</th>
                <th style={headerStyle}>Address</th>
                <th style={headerStyle}>Action</th>
              </tr>
            </thead>

            <tbody
              style={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "start",
                verticalAlign: "middle",
              }}
             >

              {data.map((User, index) => {
                return (
                  <tr key={index}>
                    <td data-label="id">{index + 1}</td>
                    <td data-label="Name">{User.name}</td>
                    <td data-label="Email">{User.email}</td>
                    <td data-label="Phone">{User.phone}</td>
                    <td data-label="Address">{User.address?.city}</td>
                    <td>

                      <Link
                        to={`/read/${User.id}`}
                        className="btn btn-md btn-outline-success me-3"
                        onClick={() => handleReadUser(User)}
                      >
                        Read
                      </Link>

                      <button
                        className="btn btn-md btn-primary me-3 ps-3 pe-3"
                        onClick={() => handleEdit(User)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-md btn-outline-danger"
                        onClick={(e) => handleDelete(User.id)}
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>

          <Modal.Header closeButton>
            <Modal.Title>Edit User </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {currentUser && (
              <Form>

                <div className="mb-2">
                  <Form.Label htmlFor="name">Name:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    value={currentUser.name || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-2">
                  <Form.Label htmlFor="email">Email:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={currentUser.email || ""}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-2">
                  <Form.Label htmlFor="phone">Phone No:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Phone No"
                    name="phone"
                    value={currentUser.phone || ""}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-2">
                  <Form.Label htmlFor="address">Address:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    name="address"
                    value={currentUser.address?.city || ""}
                    onChange={(e) =>
                      setCurrentUser((prev) => ({
                        ...prev,
                        address: { ...prev.address, city: e.target.value },
                      }))
                    }
                    className="form-control"
                  />
                </div>

              </Form>
            )}
          </Modal.Body>

          <Modal.Footer>
            <button
              type="submit"
              className="btn btn-success mt-3"
              onClick={handleUpdate}
            >
              Update
            </button>

            <button
              className="btn  btn-primary ms-3 mt-3 ps-4 pe-4  "
              type="button"
              onClick={closeButton}
            >
              Back
            </button>
          </Modal.Footer>
          
        </Modal>
      </div>
    </div>
  );
}

export default Home;
