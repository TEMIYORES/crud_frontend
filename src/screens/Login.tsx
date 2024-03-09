import axios from "../api/axios";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import loader from "../lottie/loader.json";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";
const LOGIN_URL = "/auth";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loader,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, resetUser, userAttributes] = useInput("username", "");
  const [isValidName, setIsValidName] = useState(false);

  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [check, toggleCheck] = useToggle("persist", false);
  useEffect(() => {
    userRef?.current?.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  useEffect(() => {
    // const result = USER_REGEX.test(user);
    if (user.trim() !== "" && !(user.length < 4)) {
      setIsValidName(true);
    } else {
      setIsValidName(false);
    }
  }, [user]);

  useEffect(() => {
    if (password.trim() !== "" && !(password.length < 6)) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  }, [password]);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Sending data to server
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      console.log(accessToken, roles);
      setAuth({ accessToken });
      toast.success("Login Successful");
      setLoading(false);
      resetUser("");
      setPassword("");
      console.log(from);
      navigate(from, { replace: true });
      //   Clear input fields
    } catch (err: unknown) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err?.response.status === 400) {
        setErrMsg(err.response.data.message);
      } else if (err?.response.status === 401) {
        setErrMsg(err.response.data.message);
      } else {
        setErrMsg("Registration Failed");
      }
      setLoading(false);
      errRef?.current?.focus();
    }
  };

  return (
    <section className="flex w-[100vw] h-[100vh] place-items-center justify-center">
      <div className="flex w-[500px] min-h-[400px] flex-col gap-5 border-2 border-white rounded-lg p-5">
        <p
          ref={errRef}
          aria-live="assertive"
          className={`${
            errMsg
              ? "bg-rose-500 p-space_10 rounded-radius_10 font-semibold"
              : "hidden"
          }`}
        >
          {errMsg}
        </p>
        <h2 className="font-bold text-size_30">Log In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 text-size_18">
            <label
              htmlFor="username"
              className="font-semibold flex gap-2 items-center"
            >
              Username:
            </label>
            <input
              id="username"
              name="username"
              ref={userRef}
              required
              autoComplete="off"
              type="text"
              className="border-2 border-primaryWhiteHex rounded-md p-2"
              {...userAttributes}
            />
          </div>
          <div className="flex flex-col gap-2 text-size_18">
            <label
              htmlFor="password"
              className="font-semibold flex gap-2 items-center"
            >
              Password:
            </label>
            <input
              id="password"
              name="password"
              required
              type="password"
              className="border-2 border-primaryWhiteHex rounded-md p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={!isValidName || !isValidPassword ? true : false}
            className="border-2 border-[#242424] bg-primaryBlackHex text-primaryWhiteHex rounded-md p-2 disabled:bg-primaryGreyHex disabled:text-primaryBlackHex"
          >
            {loading ? (
              <Lottie options={defaultOptions} height={50} width={50} />
            ) : (
              "Sign In"
            )}
          </button>
          <div>
            <input
              type="checkbox"
              id="persist"
              onChange={toggleCheck}
              checked={check}
            />
            <label htmlFor="persist"> Trust This Device?</label>
          </div>
        </form>
        <div>
          Need an Account?{" "}
          <Link to={"/"} className="underline">
            Register
          </Link>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default Login;
