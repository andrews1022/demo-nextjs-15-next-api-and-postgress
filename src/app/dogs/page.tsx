import { notFound } from "next/navigation";
import { Suspense } from "react";

import AddDogForm from "@/components/AddDogForm";
import DogsTable from "@/components/DogsTable";

const getAllDogs = async () => {
  try {
    // we need the full absolute URL here since this file runs on the server
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/dogs`, {
      cache: "no-store",
    });

    // If the response is not OK (e.g., 404, 500), throw an error
    // This will be caught by the outer try-catch
    if (!response.ok) {
      // You might want to check response.status specifically for 404 here
      // and return null if it's a 404 to trigger notFound() later

      // For now, throwing an error covers all non-OK responses
      if (response.status === 404) {
        return null; // specifically return null for 404 to trigger notFound()
      }

      throw new Error(`Failed to fetch dog data: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching dogs:", error);
    return null; // Return null on any fetch error
  }
};

const DogsPage = () => {
  // NOTE: don't await the data fetching function
  const dogs = getAllDogs();

  if (!dogs) {
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
