import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const queryString = "SELECT id, created_at, breed FROM dogs ORDER BY created_at DESC";
    const result = await pool.query(queryString);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching dogs:", error);
    return NextResponse.json({ error: "Failed to fetch dogs" }, { status: 500 });
  }
};
