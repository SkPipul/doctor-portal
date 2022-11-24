import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useToken from "../../hooks/useToken";
import { AuthContext } from "../context/AuthProvider";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState("");
  const [createdUserEmail, setCreatedUserEmail] = useState('');
  const [token] = useToken(createdUserEmail)
  const navigate = useNavigate();

  if(token){
    navigate('/');
  }

  const handleSignUp = (data) => {
    console.log(data);
    setSignUpError("");

    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Wow! User created successfully", {
          position: "top-center"
        })
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email)
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err.message);
        setSignUpError(err.message);
      });

      const saveUser = (name, email) => {
        const user = {name, email};
        fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
          setCreatedUserEmail(email);
          console.log(data);
        });

      }

  };

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-6">
        <h2 className="text-6xl font-mono font-bold text-center">Sign Up</h2>

        <form onSubmit={handleSubmit(handleSignUp)}>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-500" role="alert">
              {errors.name?.message}
            </p>
          )}
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("email", { required: "Email Address is required" })}
            type="email"
            className="input input-bordered w-full"
          />
          {errors.email && (
            <p className="text-red-500" role="alert">
              {errors.email?.message}
            </p>
          )}
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            {...register(
              "password",
              { required: "Password is required" },
              {
                minLength: {
                  value: 6,
                  message: "Password should be 6 character or longer",
                },
              }
            )}
            type="password"
            className="input input-bordered w-full"
          />
          {errors.password && (
            <p className="text-red-500" role="alert">
              {errors.password?.message}
            </p>
          )}

          <input
            type="submit"
            value="Signup"
            className="btn btn-accent w-full mt-4"
          />
          <div>
            {signUpError && <p className="text-red-500">{signUpError}</p>}
          </div>
        </form>
        <p className="my-3">
          Already have an account?{" "}
          <Link className="text-secondary" to="/login">
            Please Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
