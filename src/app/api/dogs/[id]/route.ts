import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

// fetch a single dog by its ID from the database
export const GET = async (request: Request, context: Context) => {
  try {
    const { id } = await context.params;

    const queryString = "SELECT id, created_at, breed FROM dogs WHERE id = $1";
    const result = await pool.query(queryString, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Dog not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching dog by ID:", error);
    return NextResponse.json({ error: "Failed to fetch dog" }, { status: 500 });
  }
};
