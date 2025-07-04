"use client"; // This directive makes it a Client Component

import Link from "next/link";
import { useState } from "react";

import type { Dog } from "@/types/dog";

export default function DogsPage() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllDogs = async () => {
    setLoading(true);
    setError(null);

    try {
      // we don't need the full absolute URL here since this is a client component
      // the browser knows the base url and automatically prepends it
      const response = await fetch("/api/dogs"); // call the dogs api route

      if (!response.ok) {
        throw new Error("Failed to fetch dogs");
      }

      const data: Dog[] = await response.json();
      setDogs(data);
    } catch (err) {
      // @ts-expect-error idc
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchAllDogs} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Dogs"}
      </button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {dogs.length > 0 && (
        <ul>
          {dogs.map((dog) => (
            <li key={dog.id}>
              <Link href={`/dogs/${dog.id}`}>{dog.breed}</Link>
            </li>
          ))}
        </ul>
      )}

      {dogs.length === 0 && !loading && !error && <p>Click the button to fetch dog breeds.</p>}
    </div>
  );
}
