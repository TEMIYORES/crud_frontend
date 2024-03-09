import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import loader from "../lottie/loader.json";
import { toast } from "react-toastify";
const REGISTER_URL = "/register";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loader,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const Register = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState("");
  const [isValidName, setIsValidName] = useState(false);
  const [isUserFocus, setIsUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [isValidMatchPassword, setIsValidMatchPassword] = useState(false);
  const [isMatchPasswordFocus, setIsMatchPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (success === true) {
      navigate("/login");
    }
  }, [navigate, success]);

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setIsValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setIsValidPassword(result);
    if (password !== "" && matchPassword !== "") {
      const match = password === matchPassword;
      setIsValidMatchPassword(match);
    }
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [user, password, matchPassword]);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // if button with enabled with JS Hack
    const v1 = USER_REGEX.test(user);
    const v2 = PASSWORD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      // Sending data to server
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username: user, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setSuccess(true);
      toast.success(response.data.message);
      setLoading(false);
      //   Clear input fields
      setUser("");
      setPassword("");
      setMatchPassword("");
      navigate("/login", { replace: true, state: { reset: true } });
    } catch (err: unknown) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err?.response.status === 409) {
        setErrMsg(err.response.data.message);
      } else if (err?.response.status === 400) {
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
        <h2 className="font-bold text-size_30">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 text-size_18">
            <label
              htmlFor="username"
              className="font-semibold flex gap-2 items-center"
            >
              Username:
              <span className={isValidName ? "" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} color="green" />
              </span>
              <span className={isValidName || !user ? "hidden" : ""}>
                <FontAwesomeIcon icon={faTimes} color="red" />
              </span>
            </label>
            <input
              id="username"
              name="username"
              ref={userRef}
              required
              aria-invalid={isValidName ? "false" : "true"}
              aria-describedby="uidnote"
              autoComplete="off"
              type="text"
              className="border-2 border-primaryWhiteHex rounded-md p-2"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              onFocus={() => setIsUserFocus(true)}
              onBlur={() => setIsUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                isUserFocus && user && !isValidName
                  ? "relative bottom-[-10px] bg-primaryGreyHex text-primaryWhiteHex rounded-radius_10 p-space_10"
                  : "hidden"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 Characters.
              <br />
              Must begin with a letter. <br />
              Letters, numbers, underscores, hypens are allowed.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-size_18">
            <label
              htmlFor="password"
              className="font-semibold flex gap-2 items-center"
            >
              Password:
              <span className={isValidPassword ? "" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} color="green" />
              </span>
              <span className={isValidPassword || !password ? "hidden" : ""}>
                <FontAwesomeIcon icon={faTimes} color="red" />
              </span>
            </label>
            <input
              id="password"
              name="password"
              required
              aria-invalid={isValidPassword ? "false" : "true"}
              aria-describedby="passwordnote"
              type="password"
              className="border-2 border-primaryWhiteHex rounded-md p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocus(true)}
              onBlur={() => setIsPasswordFocus(false)}
            />
            <p
              id="passwordnote"
              className={
                isPasswordFocus && !isValidPassword
                  ? "relative bottom-[-10px] bg-primaryGreyHex text-primaryWhiteHex rounded-radius_10 p-space_10"
                  : "hidden"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
          </div>
          <div className="flex flex-col gap-2 text-size_18">
            <label
              htmlFor="match_password"
              className="font-semibold flex gap-2 items-center"
            >
              Confirm Password:
              <span
                className={
                  isValidMatchPassword && isValidPassword ? "" : "hidden"
                }
              >
                <FontAwesomeIcon icon={faCheck} color="green" />
              </span>
              <span
                className={
                  isValidMatchPassword || !matchPassword ? "hidden" : ""
                }
              >
                <FontAwesomeIcon icon={faTimes} color="red" />
              </span>
            </label>
            <input
              id="match_password"
              name="match_password"
              required
              aria-invalid={isValidMatchPassword ? "false" : "true"}
              aria-describedby="matchpasswordnote"
              type="password"
              className="border-2 border-primaryWhiteHex rounded-md p-2"
              value={matchPassword}
              onChange={(e) => setMatchPassword(e.target.value)}
              onFocus={() => setIsMatchPasswordFocus(true)}
              onBlur={() => setIsMatchPasswordFocus(false)}
            />
            <p
              id="matchpasswordnote"
              className={
                isMatchPasswordFocus && !isValidMatchPassword
                  ? "relative bottom-[-10px] bg-primaryGreyHex text-primaryWhiteHex rounded-radius_10 p-space_10"
                  : "hidden"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} /> Must match the first
              password input field.
            </p>
          </div>
          <button
            disabled={
              !isValidName || !isValidPassword || !isValidMatchPassword
                ? true
                : false
            }
            className="border-2 border-[#242424] bg-primaryBlackHex text-primaryWhiteHex rounded-md p-2 disabled:bg-primaryGreyHex disabled:text-primaryBlackHex"
          >
            {loading ? (
              <Lottie options={defaultOptions} height={50} width={50} />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div>
          Already registered?{" "}
          <Link to={"/login"} className="underline">
            Log In
          </Link>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default Register;
