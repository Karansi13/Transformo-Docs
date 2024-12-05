import { useState } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import { toast } from 'react-hot-toast';

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result)
      if (response.ok) {
        console.log("Login successful:", result.message);
        toast.success('Login successful!');

        if (result.user.role === "Admin") {
          router.push("/admin");
        } else if (result.user.role === "User") {
          router.push("/user");
        } else {
          setError("Invalid role. Please contact support.");
        }
      } else {
        setError(result.message); 
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Something went wrong. Please try again.");
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleLoginRedirect = () => {
    router.push("/signup");
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="w-80 text-black">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <p className="mt-4 text-white">
        Don't have an account?{" "}
        <span
          onClick={handleLoginRedirect}
          className="text-blue-300 cursor-pointer hover:underline"
        >
          Signup
        </span>
      </p>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
    </>
  );
}
