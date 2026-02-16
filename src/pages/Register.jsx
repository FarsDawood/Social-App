import React, { useState } from "react";
import { Input, Button, RadioGroup, Radio } from "@heroui/react";

export default function Register() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [rePassword, setrePassword] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [gender, setgender] = useState("male");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    console.log({ name, email, password, rePassword, dateOfBirth, gender });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setname(value);
        break;
      case "email":
        setemail(value);
        break;
      case "password":
        setpassword(value);
        break;
      case "rePassword":
        setrePassword(value);
        break;
      case "dateOfBirth":
        setdateOfBirth(value);
        break;
      default:
        break;
    }
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
    };
  }

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
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
          value={name}
          onChange={handleChange}
        />

        <Input
          {...getInputProps(
            "email",
            "email",
            "Email Address",
            "example@mail.com",
          )}
          value={email}
          onChange={handleChange}
        />

        <div className="flex gap-4">
          <Input
            {...getInputProps("password", "password", "Password", "••••••••")}
            value={password}
            onChange={handleChange}
          />
          <Input
            {...getInputProps("rePassword", "password", "Confirm", "••••••••")}
            value={rePassword}
            onChange={handleChange}
          />
        </div>

        <Input
          {...getInputProps("dateOfBirth", "date", "Birth date", "")}
          value={dateOfBirth}
          onChange={handleChange}
        />
        <RadioGroup
          label="Gender"
          orientation="horizontal"
          value={gender}
          onValueChange={setgender}
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
