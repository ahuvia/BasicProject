import React, { useCallback, useState } from "react";
import "./CatManager.css";

export default ({ cats = [], onCreateNewCat }) => {
  const [newCatName, setNewCatName] = useState("");
  const [age, setAge] = useState("");

  const onNewCatNameChange = useCallback((event) => {
    console.log(event.target.value);
    setNewCatName(event.target.value);
  }, []);

  const onNewCatAgeChange = useCallback((event) => {
    console.log(event.target.value);
    setAge(event.target.value);
  }, []);

  const onAddCat = useCallback(
    (event) => {
      event.preventDefault();
      console.log("name", newCatName);
      console.log("age", age);
      onCreateNewCat({ name: newCatName, age: age });
      setNewCatName("");
      setAge("");
    },
    [onCreateNewCat, newCatName, age]
  );

  return (
    <div className="container">
      <section className="cat-create-form">
        <form>
          <input
            type="text"
            placeholder="Cat name..."
            value={newCatName}
            onChange={onNewCatNameChange}
          />
          <input
            type="text"
            placeholder="age"
            value={age}
            onChange={onNewCatAgeChange}
          />
          <button type="submit" onClick={onAddCat}>
            Create
          </button>
        </form>
      </section>
      <div className="divider" />
      <section className="cat-list-section">
        <p>My cat:</p>
        <ul>
          {cats.map((cat) => (
            <li key={cat.name}>
              {cat.name}
              <div>age: {cat.age}</div>
              <div>breed: {cat.breed}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
