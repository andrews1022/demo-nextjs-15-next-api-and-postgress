"use server";

import { revalidatePath } from "next/cache";

export const addDogBreed = async (formData: FormData) => {
  const breed = formData.get("breed");

  // const breed = formData.get('breed') as string;
  if (!breed) {
    throw new Error("Breed is required");
  }

  // we need the full absolute URL here since this file runs on the server
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/dogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ breed }),
  });

  // If the response is not OK (e.g., 404, 500), throw an error
  if (!response.ok) {
    throw new Error(`Failed to add dog breed: ${response.status} ${response.statusText}`);
  }

  // revalidate the Next.js cache and show the updated data by calling revalidatePath within the server function
  revalidatePath("/dogs");
};
