"use server";

import { revalidatePath } from "next/cache";
import { pool } from "@/lib/db";

export const addDogBreed = async (formData: FormData) => {
  const breed = formData.get("breed");

  if (!breed) {
    throw new Error("Breed is required");
  }

  const queryString = "INSERT INTO dogs (breed) VALUES ($1) RETURNING id, created_at, breed";
  await pool.query(queryString, [breed]);

  revalidatePath("/dogs");
};
