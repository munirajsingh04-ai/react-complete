import { useEffect, useState } from "react";

import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

const Charts = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get("https://dummyjson.com/users?limit=50");

    setUsers(response.data.users);
  };

  // Blood Group Count
  const bloodGroupData = [];

  users.forEach((user) => {
    const existing = bloodGroupData.find(
      (item) => item.group === user.bloodGroup,
    );

    if (existing) {
      existing.count += 1;
    } else {
      bloodGroupData.push({
        group: user.bloodGroup,
        count: 1,
      });
    }
  });

  // Age Groups
  const ageData = [
    {
      age: "0-20",
      count: users.filter((u) => u.age <= 20).length,
    },

    {
      age: "21-40",
      count: users.filter((u) => u.age > 20 && u.age <= 40).length,
    },

    {
      age: "41-60",
      count: users.filter((u) => u.age > 40 && u.age <= 60).length,
    },

    {
      age: "60+",
      count: users.filter((u) => u.age > 60).length,
    },
  ];

  return (
    <div>
      <h1>Charts Page</h1>

      <h2>Blood Groups</h2>

      <BarChart width={500} height={300} data={bloodGroupData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="group" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="count" fill="blue" />
      </BarChart>

      <h2>Age Groups</h2>

      <LineChart width={500} height={300} data={ageData}>
        <XAxis dataKey="age" />

        <YAxis />

        <Tooltip />

        <Line type="monotone" dataKey="count" stroke="green" />
      </LineChart>
    </div>
  );
};

export default Charts;
