import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    console.log(result.message);
  };

  const handleLoginRedirect = () => {
    router.push("/login"); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit} className="w-80 text-black">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-white">
            Name
          </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email
          </label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          required
            className="w-full p-2 border rounded"
        />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Password
          </label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full p-2 border rounded"
        />
        </div>
        <p className="mt-4 text-white">
        Already have an account?{" "}
        <span
          onClick={handleLoginRedirect}
          className="text-blue-300 cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
        <button type="submit"  className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Sign Up</button>
      </form>
    </div>
  );
}
