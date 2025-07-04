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

export const updateDogBreed = async (formData: FormData) => {
  const id = formData.get("id");
  const breed = formData.get("breed");

  if (!id || !breed) {
    throw new Error("ID and Breed are required");
  }

  const queryString = "UPDATE dogs SET breed = $1 WHERE id = $2 RETURNING id, created_at, breed";
  await pool.query(queryString, [breed, id]);
};
