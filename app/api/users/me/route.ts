import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest & Response) {
  const prisma = new PrismaClient();

  try {
    const payload = request.headers.get('user-id');

    const user = await prisma.user.findFirst({
      where: {
        id: Number(payload),
      },
      select: {
        email: true,
        name: true,
        surname: true,
        grade: true,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error " + error }), {
      status: 500,
    });
  }
}

export async function PATCH(request: NextRequest & Request) {
    const prisma = new PrismaClient();
    const { email, name, surname, grade } = await request.json();

    try {
      const payload = request.headers.get('user-id');
  
      const user = await prisma.user.update({
        where: {
          id: Number(payload),
        },
        data: {
          email,
          name,
          surname,
          grade
        },
      });
  
      if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), {
          status: 404,
        });
      }
  
      return new Response(JSON.stringify(user), {
        status: 200,
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Internal Server Error " + error}), {
        status: 500,
      });
    }
  }