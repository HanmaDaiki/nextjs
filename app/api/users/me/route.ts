import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  const prisma = new PrismaClient();

  try {
    const c = await cookies();
    const token = c.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const payload = jwt.decode(token || "", { complete: true })?.payload as {
      id: number;
    };

    if (typeof payload.id !== "number") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: payload.id,
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
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function PATCH(req: Request) {
    const prisma = new PrismaClient();
    const { email, name, surname, grade } = await req.json();

    try {
      const c = await cookies();
      const token = c.get("token")?.value;
  
      if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
        });
      }
  
      const payload = jwt.decode(token || "", { complete: true })?.payload as {
        id: number;
      };
  
      if (typeof payload.id !== "number") {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
        });
      }
  
      const user = await prisma.user.update({
        where: {
          id: payload.id,
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
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
      });
    }
  }