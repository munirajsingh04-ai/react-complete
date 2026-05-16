import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>

      <br />

      <Link to="/users">Users</Link>

      <br />

      <Link to="/posts">Posts</Link>

      <br />

      <Link to="/charts">Charts</Link>

      <br />

      <Link to="/settings">Settings</Link>
    </nav>
  );
};

export default Navbar;
