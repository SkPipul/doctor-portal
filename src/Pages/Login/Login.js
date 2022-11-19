import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const handleLogin = data => console.log(data);
  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-6">
        <h2 className="text-6xl font-mono font-bold text-center">Login</h2>

        <form onSubmit={handleSubmit(handleLogin)}>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("email", { required: "Email Address is required" })}
            type="email"
            className="input input-bordered w-full"
          />
          {errors.email && <p className="text-red-500" role="alert">{errors.email?.message}</p>}
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            {...register("password", {minLength: {value: 6, message: 'Password should be 8 character or longer'}})}
            type="password"
            className="input input-bordered w-full"
          />
          {errors.password && <p className="text-red-500" role="alert">{errors.password?.message}</p>}
          <label className="label">
            <span className="label-text">Forgot Password?</span>
          </label>
          <input type="submit" value="Login" className="btn btn-accent w-full mt-2" />
        </form>
        <p className="my-3">New to Doctors Portal ? <Link className="text-secondary" to="/signup">Create new account</Link></p>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
      </div>
    </div>
  );
};

export default Login;
