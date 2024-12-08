import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import LandingPage from "../components/LandingPage";


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
    <div>
        <LandingPage />;
     </div>
   
  );
}
