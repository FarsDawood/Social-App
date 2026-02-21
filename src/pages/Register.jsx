import { Input, Button, Select, SelectItem, Alert, addToast } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../validation/registerSchema";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
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

  async function onSubmit(registerData) {
    setIsLoading(true);
    setErrMsg("");
    try {
      const { data } = await axios.post("https://route-posts.routemisr.com/users/signup", registerData);
      console.log(data);
      addToast({
        title: "Welcome aboard!",
        description: "Account created successfully.",
        variant: "flat",
        color: "default",
      });
      navigate("/login");
    } catch (error) {
      if (error.response) setErrMsg(error.response.data.message);
      else setErrMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-slate-900 text-center uppercase tracking-wider mb-2">Create Account</h2>

        <Input {...getInputProps("text", "Full Name", "Fares Mostafa", errors.name)} {...register("name")} />
        <Input {...getInputProps("text", "User Name", "e.g. fares20", errors.username)} {...register("username")} />
        <Input {...getInputProps("email", "Email Address", "example@mail.com", errors.email)} {...register("email")} />
        <div className="flex gap-x-4">
          <Input {...getInputProps("password", "Password", "••••••••", errors.password)} {...register("password")} />
          <Input {...getInputProps("password", "Confirm", "••••••••", errors.rePassword)} {...register("rePassword")} />
        </div>

        <div className="flex items-end gap-x-4">
          <div className="flex-1">
            <Input {...getInputProps("date", "Birth date", undefined, errors.dateOfBirth)} {...register("dateOfBirth")} />
          </div>
          <div className="flex-1">
            <Select {...getInputProps(undefined, "Gender", "Select gender", errors.gender)} {...register("gender")} className="max-w-xs">
              <SelectItem key="male" textValue="male">
                Male
              </SelectItem>
              <SelectItem key="female" textValue="female">
                Female
              </SelectItem>
            </Select>
          </div>
        </div>

        <Button
          isLoading={isLoading}
          type="submit"
          className="w-full bg-green-900 text-white font-bold shadow-lg hover:bg-black transition-colors py-6"
          size="lg"
        >
          CREATE ACCOUNT
        </Button>
        {errMsg && <Alert hideIcon color="danger" title={errMsg} classNames={{ base: "py-0 capitalize text-center " }} variant="faded" />}

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-900 font-bold cursor-pointer hover:underline underline-offset-4">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
