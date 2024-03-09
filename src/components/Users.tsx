import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
const Users = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  console.log("auth", JSON.stringify(auth));
  useEffect(() => {
    let isMounted = true;
    // const controller = new AbortController();
    // , {
    //   signal: controller.signal,
    // }
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users");
        console.log(response.data);
        const userNames = response?.data?.map(
          (user: { username: string }) => user.username
        );

        isMounted && setUsers(userNames);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      // controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, id) => {
            return <li key={id}>{user}</li>;
          })}
        </ul>
      ) : (
        <p>No User available</p>
      )}
    </article>
  );
};

export default Users;
