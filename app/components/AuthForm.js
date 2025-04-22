"use client";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const AuthForm = () => {
  const userSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  return (
    <>
      <form>
        <div className="form-group">
          <label>Email</label>
          <input className="form-control" type="email" required />
          <input className="form-control" type="password" required />
        </div>
      </form>
    </>
  );
};
