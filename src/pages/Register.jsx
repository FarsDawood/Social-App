import React, { useState } from "react";

export default function Register() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [rePassword, setrePassword] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [gender, setgender] = useState("male");
  function handleSubmit(e) {
    e.preventDefault();
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
      case "gender":
        setgender(value);
        break;
      default:
        break;
    }
  }
  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="max-w-md w-full bg-green-50 p-8 rounded-2xl shadow-2xl flex flex-col"
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center uppercase tracking-wider">
          Create Account
        </h2>

        {/* Inputs Group */}
        {[
          { id: "name", value: name, label: "Full Name", type: "text" },
          {
            id: "email",
            value: email,
            label: "Email Address",
            type: "email",
          },
          {
            id: "password",
            value: password,
            label: "Password",
            type: "password",
          },
          {
            id: "rePassword",
            value: rePassword,
            label: "Confirm Password",
            type: "password",
          },
        ].map((field) => (
          <div key={field.id} className="relative z-0 w-full mb-6 group">
            <input
              onChange={(e) => handleChange(e)}
              value={field.value}
              type={field.type}
              name={field.id}
              id={field.id}
              className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-slate-900 peer transition-colors duration-300"
              placeholder=" "
              required
            />
            <label
              htmlFor={field.id}
              className="absolute text-sm text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-slate-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              {field.label}
            </label>
          </div>
        ))}

        {/* Date Field */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="date"
            name="dateOfBirth"
            id="date"
            value={dateOfBirth}
            onChange={(e) => handleChange(e)}
            className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-slate-900 peer transition-colors duration-300"
            required
          />
          <label
            htmlFor="date"
            className="absolute text-sm text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-slate-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Birthday
          </label>
        </div>

        {/* Gender Selection - Optimized Ratio */}
        <div className="mb-8">
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-3">
            Gender
          </label>
          <div className="flex gap-10">
            <div className="flex items-center">
              <input
                id="male"
                type="radio"
                name="gender"
                value="male"
                onChange={(e) => handleChange(e)}
                checked={gender === "male"}
                className="w-4 h-4 text-green-900 border-slate-300 focus:ring-green-900 cursor-pointer"
              />
              <label
                htmlFor="male"
                className="ms-2 text-sm font-medium text-slate-700 cursor-pointer"
              >
                Male
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="female"
                type="radio"
                name="gender"
                value="female"
                onChange={(e) => handleChange(e)}
                checked={gender === "female"}
                className="w-4 h-4 text-green-900 border-slate-300 focus:ring-green-900 cursor-pointer"
              />
              <label
                htmlFor="female"
                className="ms-2 text-sm font-medium text-slate-700 cursor-pointer"
              >
                Female
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full text-white bg-green-900 hover:bg-black focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-lg text-sm px-5 py-4 text-center transition-all duration-300 shadow-md hover:shadow-xl"
        >
          CREATE ACCOUNT
        </button>

        <p className="text-center text-sm text-slate-600 mt-6">
          Already have an account?{" "}
          <span className="text-green-900 font-bold cursor-pointer hover:underline underline-offset-4">
            Login
          </span>
        </p>
      </form>
    </>
  );
}
