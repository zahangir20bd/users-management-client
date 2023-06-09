import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users").then((res) =>
      res.json().then((data) => setUsers(data))
    );
  }, []);

  const addUserHandler = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;

    const user = { name, email };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/JSON",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        console.log(user);
        const newUsers = [...users, data];
        setUsers(newUsers);
        form.reset();
      });
  };

  return (
    <>
      <h1>Users Management</h1>
      <h3>Total number of users= {users.length}</h3>
      <form onSubmit={addUserHandler}>
        <input type="text" name="name" id="" placeholder="Name" /> <br />
        <input type="email" name="email" id="" placeholder="email" /> <br />
        <input type="submit" name="submit" value="Add User" />
      </form>
      {users.map((user) => (
        <p key={user.id}>
          ID-{user.id}: Name: {user.name}, Email: {user.email}
        </p>
      ))}
    </>
  );
}

export default App;
