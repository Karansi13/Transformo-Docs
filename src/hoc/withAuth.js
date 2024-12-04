import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (WrappedComponent, allowedRoles = []) => {
  return function ProtectedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const response = await fetch("/api/auth/me", { method: "GET" });
        if (response.status !== 200) {
          router.push("/login");
          return;
        }

        const user = await response.json();
        if (allowedRoles.length && !allowedRoles.includes(user.role)) {
          router.push("/");
        }
      };

      checkAuth();
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
