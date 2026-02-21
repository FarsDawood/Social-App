import { Input, Button, Select, SelectItem, Alert, addToast } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../validation/loginSchema";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), mode: "onBlur" });

  function getInputProps(_type, _label, _placeholder, _field) {
    return {
      label: _label,
      type: _type,
      placeholder: _placeholder,
      labelPlacement: "outside",
      variant: "bordered",
      isInvalid: !!_field,
      errorMessage: _field?.message,
    };
  }

  async function onSubmit(loginData) {
    setIsLoading(true);
    setErrMsg("");
    try {
      const { data } = await axios.post("https://route-posts.routemisr.com/users/signin", loginData);
      console.log(data);
      addToast({
        title: "Welcome aboard!",
        description: "Signed in successfully.",
        variant: "flat",
        color: "default",
      });
      navigate("/");
    } catch (error) {
      if (error.response) setErrMsg(error.response.data.message);
      else setErrMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-slate-900 text-center uppercase tracking-wider mb-2">Welcome Back</h2>

        <Input {...getInputProps("email", "Email Address", "example@mail.com", errors.email)} {...register("email")} />

        <Input {...getInputProps("password", "Password", "••••••••", errors.password)} {...register("password")} />

        <Button
          isLoading={isLoading}
          type="submit"
          className="w-full bg-green-900 text-white font-bold shadow-lg hover:bg-black transition-colors py-6"
          size="lg"
        >
          Log In
        </Button>
        {errMsg && <Alert hideIcon color="danger" title={errMsg} classNames={{ base: "py-0 capitalize text-center " }} variant="faded" />}

        <p className="text-center text-sm text-slate-600">
          I haven't an account?{" "}
          <Link to="/register" className="text-green-900 font-bold cursor-pointer hover:underline underline-offset-4">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
