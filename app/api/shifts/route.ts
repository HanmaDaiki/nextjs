import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  const prisma = new PrismaClient();
  const c = await cookies();
  const token = c.get("token")?.value;
  const payload = jwt.decode(token || "", { complete: true })?.payload as {
    id: number;
  };

  return new Response("Hello, Next.js!");
}

export async function POST(request: Request) {
  return new Response("Hello, Next.js!");
}

export async function UPDATE(request: Request) {
  return new Response("Hello, Next.js!");
}

export async function PATCH(request: Request) {
  return new Response("Hello, Next.js!");
}
