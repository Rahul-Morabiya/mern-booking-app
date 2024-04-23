import { useForm } from "react-hook-form";
import "./Register.css";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const location=useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign In Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="sign-in-container">
      <form className="sign-in-form flex flex-col gap-7 " onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold text-white mb-3">Sign In</h2>

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
        <span className="flex items-center justify-between">
          <span className="text-sm text-white ">
            Not Registered?
            <span className="ml-1">
              <Link className="underline" to="/register" >
                Create an account here
              </Link>
            </span>
          </span>
          <button type="submit" className="submit-button w-[50%]">
            Login
          </button>
        </span>
      </form>
    </div>
  );
};

export default SignIn;
