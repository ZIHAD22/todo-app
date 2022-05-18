import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading";
import axios from "../../utility/axios";

const SignIn = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [signInWithEmailAndPassword, user, loading, signInUserError] =
    useSignInWithEmailAndPassword(auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSignIn = async (data) => {
    const { userEmail, userPassword } = data;
    await signInWithEmailAndPassword(userEmail, userPassword);
    reset();
  };

  if (loading) {
    return <Loading />;
  }

  if (user) {
    const setJwt = async () => {
      const { email } = user.user;
      const { data: token } = await axios.post("getJwt", { email });
      localStorage.setItem("accessToken", token.accessToken);
      navigate(from, { replace: true });
    };
    setJwt();
  }

  return (
    <div>
      <h1 className="text-3xl text-center font-bold">Welcome To Back</h1>
      <h5 className="text-xl text-center text-info my-4">Sign In</h5>

      <div className="w-1/3 mx-auto">
        <form className="" onSubmit={handleSubmit(handleSignIn)}>
          <div className="my-5">
            <input
              type="email"
              placeholder="Email"
              {...register("userEmail", { required: "required" })}
              className="input input-bordered input-info w-full  lg:max-w-lg"
            />
            {errors && (
              <p className="text-red-600">{errors.userEmail?.message}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("userPassword", { required: "required" })}
              className="input input-bordered input-info w-full lg:max-w-lg"
            />
            {errors && (
              <p className="text-red-600">{errors.userPassword?.message}</p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <Link to="/signUp" className="link link-primary mt-3 block ">
              Dont Have Account Sign Up For Free
            </Link>
            <Link to="/resetPass" className="link link-primary mt-3 block ">
              Forget Password ?
            </Link>
          </div>
          {signInUserError && (
            <span className="text-red-600 mt-3 block">
              {signInUserError.message}
            </span>
          )}
          <div className="">
            <button className="btn btn-info w-full my-5 text-white">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
