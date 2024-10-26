import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const prisma = new PrismaClient();
    const { email, password, name, surname } = await req.json();

    // Check if user with email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return Response.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    if (typeof hashPassword === "string") {
      await prisma.user.create({
        data: {
          email,
          password: hashPassword,
          name,
          surname,
          grade: 1,
        },
      });
      return Response.json(
        { message: "User created successfully" },
        { status: 201 }
      );
    }
  } catch (error) {
    return Response.json(
      { error: "Failed to create user " + error },
      { status: 500 }
    );
  }
}