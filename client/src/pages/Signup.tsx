import { useForm } from "react-hook-form";
import AuthLayout from "../layout/AuthLayout";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const submitHandler = async (data: FormData) => {
    console.log(data);
  };

  return (
    <AuthLayout>
      <div className="px-4 md:px-0 font-light">
        <div className="max-w-xl mx-auto bg-white mt-32 rounded flex flex-col items-center py-10 px-4 shadow-md">
          <div className=" uppercase text-primary bg-red">
            <Link
              to={"/"}
              className="text-2xl font-extrabold font-sans leading-none"
            >
              Regalo
            </Link>
            <p className="tracking-[3.7px] text-xs">Gift Shop</p>
          </div>

          <h1 className="text-2xl  mt-10">Sign up</h1>

          <form
            onSubmit={handleSubmit(submitHandler)}
            className="mt-6 500 w-full "
          >
            <div className="w-full  md:w-2/3 md:mx-auto block mb-4">
              <input
                {...register("email", { required: "Email is requied" })}
                className="focus:ring-0 focus:border-primary rounded w-full border-gray-200 placeholder:text-gray-400 transition-all"
                type="email"
                placeholder="Email"
              />
              <p className="text-sm text-red-500 mt-1">
                {errors.email?.message}
              </p>
            </div>

            <div className="w-full  md:w-2/3 md:mx-auto block mb-4">
              <input
                {...register("password", { required: "Password is requied" })}
                className="focus:ring-0 focus:border-primary rounded w-full border-gray-200 placeholder:text-gray-400 transition-all"
                type="password"
                placeholder="Password"
              />
              <p className="text-sm text-red-500 mt-1">
                {errors.password?.message}
              </p>
            </div>

            <div className="w-full  md:w-2/3 md:mx-auto block mb-4">
              <input
                {...register("passwordConfirm", {
                  required: "Confirm password is requied",
                })}
                className="focus:ring-0 focus:border-primary rounded w-full border-gray-200 placeholder:text-gray-400 transition-all"
                type="password"
                placeholder="Confirm Password"
              />
              <p className="text-sm text-red-500 mt-1">
                {errors.passwordConfirm?.message}
              </p>
            </div>

            <button className="w-full bg-primary hover:bg-primary-tint transition-all md:w-2/3 md:mx-auto block text-white py-2 rounded ">
              Sign up
            </button>

            <div className="flex gap-1 w-full md:w-2/3 md:mx-auto mt-8 justify-center">
              <p className="">Already have an account?</p>
              <Link to="/signin" className="text-primary">
                Sign in
              </Link>
            </div>

            <div className="w-full md:w-2/3 md:mx-auto mt-8 flex items-center gap-4">
              <div className="w-full h-[0.9px] bg-gray-300"></div>
              <p className="">Or</p>
              <div className="w-full h-[0.9px] bg-gray-300"></div>
            </div>

            <button className="w-full border md:w-2/3 md:mx-auto py-2 rounded mt-8 flex items-center gap-3 justify-center hover:bg-primary-tint transition-all hover:text-white ">
              <FcGoogle className="text-xl" />
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
