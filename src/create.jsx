import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import backgroundImage from './Assets/background.png';

function Create({ data, setData }) {
  //ADDING BACKGROUND IMAGE
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    height: '100vh', 
    width: '100%' 
  };
   //SET STATES TO FETCH USERS
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  //USE NAVIGATE TO BACK TO ANOTHER COMPONENTS
  const navigate = useNavigate();
  
  //FOR CONTROLLING ON SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      phone,
      address: { city: address },
    };

    //ADDING THE USERS DATA TO SERVER(API)
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())

      .then(
        (User) => {
          console.log(User);
          setData([...data, User]);
        },

        navigate("/")
      );
  };

  return (
    <div className=" my-component d-flex w-100 vh-100 justify-content-center align-items-center bg-light " style={backgroundStyle} >
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded responsive">
        
        <h1 style={{ textAlign: "center", backgroundColor: 'lightgreen', color: 'white' }} className="rounded ps-3 pe-3">Add a User</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}          
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="phone">Phone No:</label>
            <input
              type="text"
              placeholder="Enter Phone No"
              value={phone}
             
              className="form-control"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              placeholder="Enter Address"
              value={address}
              
              className="form-control"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-success mt-3">Submit</button>
          <Link to="/" className="btn btn-primary ms-3 mt-3 ps-4 pe-4">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Create;

