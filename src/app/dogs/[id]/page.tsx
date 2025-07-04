import { notFound } from "next/navigation";

import type { Dog } from "@/types/dog";

const getDog = async (id: string): Promise<Dog | null> => {
  try {
    // we need the full absolute URL here since this file runs on the server
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/dogs/${id}`, {
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

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error fetching dog with ID ${id}:`, error);
    return null; // Return null on any fetch error
  }
};

type DogPageProps = {
  params: Promise<{ id: string }>;
};

const DogPage = async ({ params }: DogPageProps) => {
  // we await the params
  const { id } = await params;

  const dog = await getDog(id);

  if (!dog) {
    // Next.js `notFound()` function displays the not-found.tsx page
    // if you have one, or the default Next.js 404 page.
    notFound();
  }

  return (
    <div>
      <h2>Dog Details</h2>
      <p>
        Name (Breed): <strong>{dog.breed}</strong>
      </p>
      <p>ID: {dog.id}</p>
      <p>Created At: {new Date(dog.created_at).toLocaleString()}</p>
    </div>
  );
};

export default DogPage;
