import { Link } from "react-router-dom";

const Links = () => {
  return (
    <div className="flex w-[100vw] h-[100vh] place-items-center justify-center">
      <div className="flex w-[500px] min-h-[400px] flex-col gap-5 border-2 border-white  rounded-lg p-5">
        <h3 className="text-4xl">Useful Links</h3>
        <h4 className="text-3xl">Public Links</h4>
        <ul className="flex flex-col gap-5">
          <li className="underline text-2xl">
            <Link to={"/login"}>Go to Login Page</Link>
          </li>
          <li className="underline text-2xl">
            <Link to={"/register"}>Go to Register Page</Link>
          </li>
        </ul>
        <h3 className="text-4xl">Private Links</h3>
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
      </div>
    </div>
  );
};

export default Links;
