import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from 'react-hot-toast';

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      console.log(result);
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm md:max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-white mb-6">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-gray-300 text-center">
            Don’t have an account?{" "}
            <span
              onClick={handleLoginRedirect}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Signup
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
