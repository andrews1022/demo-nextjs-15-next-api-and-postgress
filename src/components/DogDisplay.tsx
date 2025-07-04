"use client"; // This directive makes it a Client Component

import { useState } from "react";

type Dog = {
  id: string;
  created_at: string;
  breed: string;
};

export default function DogsPage() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDogs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/dogs"); // Call your API route
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Dog[] = await response.json();
      setDogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Our Dogs</h1>
      <button onClick={fetchDogs} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Dogs"}
      </button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {dogs.length > 0 && (
        <ul>
          {dogs.map((dog) => (
            <li key={dog.id}>{dog.breed}</li>
          ))}
        </ul>
      )}

      {dogs.length === 0 && !loading && !error && <p>Click the button to fetch dog breeds.</p>}
    </div>
  );
}
