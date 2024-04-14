import { useForm } from "react-hook-form";
import "./Register.css";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {showToast} =useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess:async () => {
      showToast({message:"Registration Success!",type:"SUCCESS"});
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error:Error) => {
      showToast({message:error.message,type:"ERROR"});
    }
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={onSubmit}>
        <h2 className="register-title">Create an Account</h2>
        <div className="input-group">
          <label className="input-label">
            First Name
            <input
              className="input-field"
              {...register("firstName", { required: "This field is required" })}
            />
            {errors.firstName && (
              <span className="error-message">{errors.firstName.message}</span>
            )}
          </label>
          <label className="input-label">
            Last Name
            <input
              className="input-field"
              {...register("lastName", { required: "This field is required" })}
            />
            {errors.lastName && (
              <span className="error-message">{errors.lastName.message}</span>
            )}
          </label>
        </div>
        <label className="input-label">
          Email
          <input
            type="email"
            className="input-field"
            {...register("email", { required: "This field is required" })}
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </label>
        <label className="input-label">
          Password
          <input
            type="password"
            className="input-field"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        </label>
        <label className="input-label">
          Confirm Password
          <input
            type="password"
            className="input-field"
            {...register("confirmPassword", {
              validate: (val) => {
                if (!val) {
                  return "This field is required";
                } else if (watch("password") !== val) {
                  return "Your passwords do not match";
                }
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="error-message">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
        <button type="submit" className="submit-button">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
