import { Link, useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-[100vw] h-[100vh] place-items-center justify-center">
      <div className="flex w-[500px] min-h-[400px] flex-col gap-5 border-2 place-items-center justify-center border-white rounded-lg p-5">
        <h2 className="font-semibold text-5xl">Unauthorized Page</h2>
        <span>
          <a onClick={() => navigate(-1)} className="underline">
            Go back
          </a>
        </span>
      </div>
    </div>
  );
};

export default Unauthorized;
