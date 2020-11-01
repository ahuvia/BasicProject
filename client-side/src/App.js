import "./App.css";
import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import CatManager from "./CatManager";

const myCatServerBaseURL = "http://localhost:3000";

const App = () => {
  //This state will be populated with the Axios HTTP response
  const [cats, setCats] = useState([]);

  const loadCats = useCallback(async () => {
    const response = await axios.get(`${myCatServerBaseURL}/cats`);
    const cats = response.data;
    console.log(cats);
    setCats(cats);
  }, []);

  //The cat are loaded initially
  useEffect(() => {
    loadCats();
  }, [loadCats]);

  const onCreateNewCat = useCallback(
    async (newCatName) => {
      console.log(newCatName);
      try {
        await axios.post(`${myCatServerBaseURL}/cats`, {
          name: newCatName.name,
          age: newCatName.age,
        });
        loadCats();
      } catch (error) {
        /**
         * If the response status code is 409 - Conflict, then we already have
         * a cat with this name.
         **/
        if (error.response.status === 409) {
          alert("Cat with same name exists!");
        } else {
          alert("Unknown error.");
        }
      }
    },
    [loadCats]
  );

  return (
    <main className="u-centered-content u-full-vw u-full-vh">
      <CatManager cats={cats} onCreateNewCat={onCreateNewCat} />
    </main>
  );
};

export default App;

// function App() {
//   const [dogs, setDogs] = useState([]);

//   const loadDogs = useCallback(async () => {
//     const response = await axios.get(`${server}/cats`);
//     const dogs = response.data;
//     setDogs(dogs);
//   }, []);

//   useEffect(() => {
//     loadDogs();
//   }, [loadDogs]);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//         <ul>
//           {dogs.map((dog) => (
//             <li key={dog.name}>{dog.name}</li>
//           ))}
//         </ul>
//       </header>
//     </div>
//   );
// }

// export default App;
