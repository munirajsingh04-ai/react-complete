import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import UserForm from "../components/UserForm";

const Users = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [gender, setGender] = useState("");

  const [ageFilter, setAgeFilter] = useState("");

  const [sortOrder, setSortOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [editingUser, setEditingUser] = useState(null);

  const usersPerPage = 5;

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/users?limit=50",
        );

        setUsers(response.data.users);

        setLoading(false);
      } catch (err) {
        console.log(err);

        setError("Something went wrong");

        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Add User
  const addUser = (newUser) => {
    setUsers([newUser, ...users]);
  };

  // Delete User
  const deleteUser = (id) => {
    const filtered = users.filter((user) => user.id !== id);

    setUsers(filtered);
  };

  // Search + Filters
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

    const matchesSearch =
      fullName.includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesGender = gender === "" || user.gender === gender;

    const matchesAge =
      ageFilter === "" ||
      (ageFilter === "above50" && user.age > 50) ||
      (ageFilter === "below50" && user.age < 50);

    return matchesSearch && matchesGender && matchesAge;
  });

  // Sorting
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOrder === "ageAsc") {
      return a.age - b.age;
    }

    if (sortOrder === "ageDesc") {
      return b.age - a.age;
    }

    if (sortOrder === "phoneAsc") {
      return a.phone.localeCompare(b.phone);
    }

    if (sortOrder === "phoneDesc") {
      return b.phone.localeCompare(a.phone);
    }

    return 0;
  });

  // Pagination
  const lastUserIndex = currentPage * usersPerPage;

  const firstUserIndex = lastUserIndex - usersPerPage;

  const currentUsers = sortedUsers.slice(firstUserIndex, lastUserIndex);

  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <h1>Users List</h1>

      {/* Add/Edit Form */}
      <UserForm
        addUser={addUser}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        users={users}
        setUsers={setUsers}
      />

      <br />

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      {/* Gender Filter */}
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">All Genders</option>

        <option value="male">Male</option>

        <option value="female">Female</option>
      </select>

      <br />
      <br />

      {/* Age Filter */}
      <select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
        <option value="">All Ages</option>

        <option value="above50">Above 50</option>

        <option value="below50">Below 50</option>
      </select>

      <br />
      <br />

      {/* Sorting */}
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="">Sort By</option>

        <option value="ageAsc">Age Ascending</option>

        <option value="ageDesc">Age Descending</option>

        <option value="phoneAsc">Phone Ascending</option>

        <option value="phoneDesc">Phone Descending</option>
      </select>

      <br />
      <br />

      {/* Users Table */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>

            <th>Email</th>

            <th>Age</th>

            <th>Gender</th>

            <th>Phone</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>
                {user.firstName} {user.lastName}
              </td>

              <td>{user.email}</td>

              <td
                style={{
                  color: user.age < 50 ? "red" : "green",
                }}
              >
                {user.age}
              </td>

              <td>{user.gender}</td>

              <td>{user.phone}</td>

              <td>
                <button onClick={() => setEditingUser(user)}>Edit</button>

                <button onClick={() => deleteUser(user.id)}>Delete</button>

                <Link to={`/users/${user.id}`}>
                  <button>View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      {/* Pagination */}
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "10px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
