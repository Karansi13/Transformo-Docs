import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

export default function Home() {
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        setUserRole(data.role);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUserRole(null);
    router.push("/");
    toast.success("Logged out successfully.");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!userRole ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
          <button
            onClick={() =>
              router.push(userRole === "Admin" ? "/admin" : "/user")
            }
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-4"
          >
            Go to Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
