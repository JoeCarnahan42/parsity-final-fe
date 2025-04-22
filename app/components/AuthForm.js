"use client";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// TODO - Fix/Finish authentication (Review parsity module)

export const AuthForm = () => {
  const userSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const login = () => {
    // Log inputs
  };

  return (
    <>
      <form className="container">
        <div className="form-group">
          <label>Email</label>
          <input className="form-control" type="email" required />
          <label>Password</label>
          <input className="form-control" type="password" required />
          <button className="btn btn-primary" onClick={login}>
            Login
          </button>
        </div>
      </form>
    </>
  );
};
