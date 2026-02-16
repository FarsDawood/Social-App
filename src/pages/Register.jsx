import { Input, Button, RadioGroup, Radio } from "@heroui/react";
import { useForm } from "react-hook-form";

export default function Register() {
  const { register, handleSubmit } = useForm();


  function onSubmit(data) {
    console.log("Form Data Submitted:", data);
  }

  

  function getInputProps(_name, _type, _label, _placeholder) {
    return {
      name: _name,
      label: _label,
      type: _type,
      placeholder: _placeholder,
      labelPlacement: "outside",
      variant: "bordered",
      required: true,
      ...register(_name)
    };
  }

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-slate-900 text-center uppercase tracking-wider mb-2">
          Create Account
        </h2>

        <Input
          {...getInputProps(
            "name",
            "text",
            "Full Name",
            "Enter your full name",
          )}
          
        />

        <Input
          {...getInputProps(
            "email",
            "email",
            "Email Address",
            "example@mail.com",
          )}
          
        />

        <div className="flex gap-4">
          <Input
            {...getInputProps("password", "password", "Password", "••••••••")}
            
          />
          <Input
            {...getInputProps("rePassword", "password", "Confirm", "••••••••")}
            
          />
        </div>

        <Input
          {...getInputProps("dateOfBirth", "date", "Birth date", "")}
          
        />
        <RadioGroup
          label="Gender"
          orientation="horizontal"
          {...register("gender")}
        >
          <Radio
            value="male"
            classNames={{
              wrapper: "group-data-[selected=true]:border-[#032e15]",
              control: "bg-[#032e15]",
            }}
          >
            Male
          </Radio>
          <Radio
            value="female"
            classNames={{
              wrapper: "group-data-[selected=true]:border-[#032e15]",
              control: "bg-[#032e15]",
            }}
          >
            Female
          </Radio>
        </RadioGroup>

        <Button
          type="submit"
          className="w-full bg-green-900 text-white font-bold shadow-lg hover:bg-black transition-colors py-6"
          size="lg"
        >
          CREATE ACCOUNT
        </Button>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <span className="text-green-900 font-bold cursor-pointer hover:underline underline-offset-4">
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
