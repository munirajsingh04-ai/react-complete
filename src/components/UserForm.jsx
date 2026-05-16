import { useState, useEffect } from "react";

const UserForm = ({
  addUser,
  editingUser,
  setEditingUser,
  users,
  setUsers,
}) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (editingUser) {
      setFirstName(editingUser.firstName);
      setEmail(editingUser.email);
      setAge(editingUser.age);
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingUser) {
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id
          ? {
              ...user,
              firstName,
              email,
              age,
            }
          : user,
      );

      setUsers(updatedUsers);

      setEditingUser(null);
    } else {
      const newUser = {
        id: Date.now(),
        firstName,
        email,
        age,
      };

      addUser(newUser);
    }

    setFirstName("");
    setEmail("");
    setAge("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Enter Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <br />
      <br />

      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
