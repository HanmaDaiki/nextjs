import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const prisma = new PrismaClient();
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return new Response(JSON.stringify({ message: "Invalid email or password" }), {
      status: 401,
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return new Response(JSON.stringify({ message: "Invalid email or password" }), {
      status: 401,
    });
  }
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET || "dev-secret",
    {
      expiresIn: "1h",
    }
  );
  
  const response = new Response(JSON.stringify({ message: "Login successful" }), {
    status: 200,
  });
  
  response.headers.set(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`
  );
  
  return response;
}