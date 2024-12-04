import authMiddleware from "@/middleware/auth";

async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ message: "Welcome to the admin route!", user: req.user });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default function (req, res) {
  return authMiddleware(["Admin"])(req, res, handler);
}
