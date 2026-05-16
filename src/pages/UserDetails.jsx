import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

const UserDetails = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/users/${id}`);

      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>User Details</h1>

      <table border="1" cellPadding="10">
        <tbody>
          <tr>
            <td>First Name</td>
            <td>{user.firstName}</td>
          </tr>

          <tr>
            <td>Last Name</td>
            <td>{user.lastName}</td>
          </tr>

          <tr>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>

          <tr>
            <td>Phone</td>
            <td>{user.phone}</td>
          </tr>

          <tr>
            <td>Age</td>
            <td>{user.age}</td>
          </tr>

          <tr>
            <td>Gender</td>
            <td>{user.gender}</td>
          </tr>

          <tr>
            <td>Birth Date</td>
            <td>{user.birthDate}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
