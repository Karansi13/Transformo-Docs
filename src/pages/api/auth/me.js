// import authMiddleware from "@/middleware/auth";

// async function handler(req, res) {
//   if (req.method === "GET") {
//     return res.status(200).json({ user: req.user });
//   } else {
//     res.setHeader("Allow", ["GET"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// export default function (req, res) {
//   return authMiddleware()(req, res, handler);
// }

// import { verifyToken } from "@/utils/jwtUtils";

// export default function handler(req, res) {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     const user = verifyToken(token);
//     console.log(user)
//     return res.status(200).json({ user, message: "user verified"});
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// }


import { verifyToken } from "@/utils/jwtUtils";

export default function handler(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = verifyToken(token);
  
  if (!user) {
    return res.status(403).json({ message: "Invalid token" });
  }
  
  return res.status(200).json({ user, message: "user verified"});

  // res.status(200).json(user);
}
