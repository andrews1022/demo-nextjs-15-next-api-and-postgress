"use client";

import { use } from "react";

import DogTableRow from "@/components/DogTableRow";
import type { Dog } from "@/types/dog";

const DogsTable = ({ dogs }: { dogs: Promise<Dog[]> }) => {
  const allDogs = use(dogs);

  return (
    <table>
      <thead>
        <tr>
          <th>Breed</th>
          <th>Edit</th>
          <th>Delete</th>
          <th>ID</th>
          <th>Created At</th>
        </tr>
      </thead>

      <tbody>
        {allDogs.map((dog) => (
          <DogTableRow key={dog.id} dog={dog} />
        ))}
      </tbody>
    </table>
  );
};

export default DogsTable;
