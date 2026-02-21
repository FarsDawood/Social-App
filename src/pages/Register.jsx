import { Input, Button, RadioGroup, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../validation/registerSchema";

export default function Register() {
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

  function onSubmit(data) {
    console.log("✅ SUCCESS:", data);
  }
  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-slate-900 text-center uppercase tracking-wider mb-2">Create Account</h2>

        <Input {...getInputProps("text", "Full Name", "Enter your full name", errors.name)} {...register("name")} />

        <Input {...getInputProps("email", "Email Address", "example@mail.com", errors.email)} {...register("email")} />

        <div className="flex gap-4">
          <Input {...getInputProps("password", "Password", "••••••••", errors.password)} {...register("password")} />
          <Input {...getInputProps("password", "Confirm", "••••••••", errors.rePassword)} {...register("rePassword")} />
        </div>

        <Input {...getInputProps("date", "Birth date", undefined, errors.dateOfBirth)} {...register("dateOfBirth")} />
        <Select {...getInputProps(undefined, "Gender", "Select gender", errors.gender)} {...register("gender")} className="max-w-xs">
          <SelectItem key="male" textValue="male">
            Male
          </SelectItem>
          <SelectItem key="female" textValue="female">
            Female
          </SelectItem>
        </Select>

        <Button
          type="submit"
          className="w-full bg-green-900 text-white font-bold shadow-lg hover:bg-black transition-colors py-6"
          size="lg"
        >
          CREATE ACCOUNT
        </Button>

        <p className="text-center text-sm text-slate-600">
          Already have an account? <span className="text-green-900 font-bold cursor-pointer hover:underline underline-offset-4">Login</span>
        </p>
      </form>
    </div>
  );
}
