import { Link } from "react-router-dom";
import Users from "../components/Users";

const Admin = () => {
  return (
    <section>
      <h1>Admin Page</h1>
      <p>You must have been assigned an admin role.</p>
      <h2>Here is the list of current Users</h2>
      <Users />
      <Link to={"/"}>Home</Link>
    </section>
  );
};

export default Admin;
