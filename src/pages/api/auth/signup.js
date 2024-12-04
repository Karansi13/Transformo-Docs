// import dbConnect from "@/utils/dbConnect";
// import User from "@/models/User";
// import bcrypt from "bcrypt";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { name, email, password, role } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     try {
//       await dbConnect();
//       const existingUser = await User.findOne({ email });

//       if (existingUser) {
//         return res.status(400).json({ message: "User already exists." });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);

//       const user = await User.create({
//         name,
//         email,
//         password: hashedPassword,
//         role: role || "User",
//       });

//       return res.status(201).json({ message: "User created successfully.", user });
//     } catch (error) {
//       return res.status(500).json({ message: "Server error.", error: error.message });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Connect to the database
    await dbConnect();
    console.log("Connected to MongoDB");

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed");

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "User",
    });

    await user.save();
    console.log("User saved:", user);

    return res.status(201).json({ message: "User created successfully.", user });
  } catch (error) {
    console.error("Error in signup:", error); // Log the error
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
