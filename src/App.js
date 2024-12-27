import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Home";
import Read from "./Read";
import Create from "./create";

function App() {
  const [data, setData] = useState([]);
  const [selectUser, setSelectUser] = useState(null);

  //FETCHING SERVER API
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => response.json())
      .then((userData) => setData(userData));
  }, []);

  // TO HANDLE READ COMPONENT
  function handleReadUser(User) {
    setSelectUser(User);
  }

  return (
    <div className="App">
      {/* <Crud></Crud> */}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              data={data}
              setData={setData}
              handleReadUser={handleReadUser}
            />
          }
        ></Route>
        <Route
          path="/create"
          element={<Create data={data} setData={setData} />}
        ></Route>
        <Route
          path="/read/:id"
          element={<Read setData={setData} selectUser={selectUser} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
