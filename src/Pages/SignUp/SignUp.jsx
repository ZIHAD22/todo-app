import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import auth from "../../firebase.init";
import { toast } from "react-toastify";
import Loading from "../Shared/Loading";
import { async } from "@firebase/util";

const SignUp = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [createUserWithEmailAndPassword, user, loading, signUpError] =
    useCreateUserWithEmailAndPassword(auth, {
      sendEmailVerification: true,
    });

  const handleSignUp = async (data) => {
    if (data.userPassword === data.userConfirmPassword) {
      await createUserWithEmailAndPassword(data.userEmail, data.userPassword);
      reset();
    } else {
      toast.warn("Your Password And Confirm Password Dont Match");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (user) {
    navigate(from, { replace: true });
  }

  return (
    <div>
      <h1 className="text-3xl text-center font-bold">Welcome To Here</h1>
      <h5 className="text-xl text-center text-info my-4">Sign Up</h5>

      <div className="w-1/3 mx-auto">
        <form className="" onSubmit={handleSubmit(handleSignUp)}>
          <div className="mb-5">
            <input
              type="text"
              placeholder="Name"
              {...register("userName", { required: "required" })}
              className="input input-bordered input-info w-full  lg:max-w-lg"
            />
            {errors && (
              <p className="text-red-600">{errors.userName?.message}</p>
            )}
          </div>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Email"
              {...register("userEmail", { required: "required" })}
              className="input input-bordered input-info w-full lg:max-w-lg"
            />
            {errors && (
              <p className="text-red-600">{errors.userEmail?.message}</p>
            )}
          </div>
          <div className="mb-5">
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
          <div className="mb-5">
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("userConfirmPassword", { required: "required" })}
              className="input input-bordered input-info w-full lg:max-w-lg"
            />
            {errors && (
              <p className="text-red-600">
                {errors.userConfirmPassword?.message}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="">
              <div className="flex justify-center items-center">
                <input
                  type="checkbox"
                  {...register("agree", { required: "required" })}
                  className="checkbox checkbox-md"
                />
                {errors.agree?.message ? (
                  <span className="text-red-600">
                    Agree With All Terms And Condition
                  </span>
                ) : (
                  <span>Agree With All Terms And Condition</span>
                )}
              </div>
            </div>

            <div>
              <Link className="link link-primary" to="/signIn">
                Already Sign Up ?
              </Link>
            </div>
          </div>
          {signUpError && (
            <span className="text-red-600 mt-3 block">
              {signUpError.message}
            </span>
          )}
          <div className="">
            <button className="btn btn-info w-full my-5 text-white">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
