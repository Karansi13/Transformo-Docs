export default function handler(req, res) {
    if (req.method === "POST") {
      res.setHeader(
        "Set-Cookie",
        "token=; HttpOnly; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
      );
  
      return res.status(200).json({ message: "Logged out successfully and token removed." });
    } else {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  }
  