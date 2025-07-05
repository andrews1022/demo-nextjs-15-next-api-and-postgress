import { notFound } from "next/navigation";
import { Suspense } from "react";

import AddDogForm from "@/components/AddDogForm";
import DogsTable from "@/components/DogsTable";
import { pool } from "@/lib/db";
import type { Dog } from "@/types/dog";

const getAllDogs = async (): Promise<Dog[] | null> => {
  try {
    const queryString = "SELECT id, created_at, breed FROM dogs ORDER BY created_at DESC";
    const result = await pool.query(queryString);

    if (result.rows.length === 0) {
      console.error("No dogs found in the database.");
      return null; // Return null if no dogs are found
    }
    return result.rows;
  } catch (error) {
    console.error("Error fetching dogs:", error);
    return null; // Return null if no dogs are found
  }
};

const DogsPage = () => {
  // NOTE: don't await the data fetching function
  const dogs = getAllDogs();

  if (!dogs) {
    // if no dogs are found, trigger the notFound() function
    // this will render the 404 page
    notFound();
  }

  return (
    <div>
      <h2>All Dogs</h2>

      <AddDogForm />

      <br />

      <Suspense fallback={<div>Loading dogs...</div>}>
        <DogsTable dogs={dogs} />
      </Suspense>
    </div>
  );
};

export default DogsPage;
