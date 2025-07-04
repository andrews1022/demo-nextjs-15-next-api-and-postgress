"use client";

import Link from "next/link";
import { use } from "react";

import type { Dog } from "@/types/dog";

const DogsTable = ({ dogs }: { dogs: Promise<Dog[]> }) => {
  const allDogs = use(dogs);

  const handleOnEditClick = (id: string) => {
    console.log("edit button clicked!", id);
  };

  const handleOnDeleteClick = (id: string) => {
    console.log("delete button clicked!", id);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Breed</th>
          <th>ID</th>
          <th>Created At</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {allDogs.map((dog) => (
          <tr key={dog.id}>
            <td>
              <Link href={`/dogs/${dog.id}`}>{dog.breed}</Link>
            </td>
            <td>{dog.id}</td>
            <td>{new Date(dog.created_at).toLocaleString()}</td>
            <td>
              <button onClick={() => handleOnEditClick(dog.id)} type="button">
                Edit
              </button>
            </td>
            <td>
              <button onClick={() => handleOnDeleteClick(dog.id)} type="button">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DogsTable;
