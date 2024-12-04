import { verifyToken } from "@/utils/jwtUtils";

export default function authMiddleware(allowedRoles = []) {
  return async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized. Token not found." });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }

    if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
      return res.status(403).json({ message: "Forbidden. Access denied." });
    }

    req.user = decoded; // Attach decoded data to the request
    next(); // Proceed to the next middleware or route handler
  };
}
