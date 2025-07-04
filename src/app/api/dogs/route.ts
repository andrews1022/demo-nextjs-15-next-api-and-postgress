import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

// fetch all dogs from the database
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

// add a new dog breed to the database
export const POST = async (request: Request) => {
  try {
    const { breed } = await request.json();
    if (!breed) {
      return NextResponse.json({ error: "Breed is required" }, { status: 400 });
    }
    const queryString = "INSERT INTO dogs (breed) VALUES ($1) RETURNING id, created_at, breed";
    const result = await pool.query(queryString, [breed]);
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error adding dog breed:", error);
    return NextResponse.json({ error: "Failed to add dog breed" }, { status: 500 });
  }
};
