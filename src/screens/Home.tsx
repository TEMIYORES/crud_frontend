import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Home = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("/links");
  };
  return (
    <div className="flex w-[100vw] h-[100vh] place-items-center justify-center">
      <div className="flex w-[500px] min-h-[400px] flex-col gap-5 border-2 border-white place-items-center justify-center rounded-lg p-5">
        <h3 className="text-3xl">YOU'RE ARE LOGGED IN!</h3>
        <ul className="flex flex-col gap-5">
          <li className="underline text-2xl">
            <Link to={"/admin"}>Go to Admin's Page</Link>
          </li>
          <li className="underline text-2xl">
            <Link to={"/editor"}>Go to Editor's Page</Link>
          </li>
          <li className="underline text-2xl">
            <Link to={"/lounge"}>Go to Lounge Page</Link>
          </li>
        </ul>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default Home;
