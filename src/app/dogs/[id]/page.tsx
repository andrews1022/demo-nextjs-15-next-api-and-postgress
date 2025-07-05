import { notFound } from "next/navigation";
import { Suspense } from "react";

import { pool } from "@/lib/db";
import type { Dog } from "@/types/dog";

const getDog = async (id: string): Promise<Dog | null> => {
  try {
    const queryString = "SELECT id, created_at, breed FROM dogs WHERE id = $1";
    const result = await pool.query(queryString, [id]);

    if (result.rows.length === 0) {
      console.error(`No dog found with ID: ${id}`);
      return null; // Return null if no dog is found with the specified ID
    }

    // otherwise, return the first row (the dog with the specified ID)
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching dog with ID ${id}:`, error);
    return null; // Return null in case of an error
  }
};

type DogPageProps = {
  params: Promise<{ id: string }>;
};

const DogPage = async ({ params }: DogPageProps) => {
  // we await the params as suggested by Next.js documentation
  // https://nextjs.org/docs/app/getting-started/fetching-data#examples
  const { id } = await params;

  const dog = await getDog(id);

  if (!dog) {
    // Next.js `notFound()` function displays the not-found.tsx page
    // if you have one, or the default Next.js 404 page.
    notFound();
    // notFound() does not require you to use return notFound()
  }

  return (
    <Suspense fallback={<div>Loading dog details...</div>}>
      <div>
        <h2>Dog Details</h2>
        <p>
          Name (Breed): <strong>{dog.breed}</strong>
        </p>
        <p>ID: {dog.id}</p>
        <p>Created At: {new Date(dog.created_at).toLocaleString()}</p>
      </div>
    </Suspense>
  );
};

export default DogPage;
