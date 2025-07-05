"use client";

import { use } from "react";

import DogTableRow from "@/components/DogTableRow";
import type { Dog } from "@/types/dog";

type DogsTableProps = {
  dogs: Promise<Dog[] | null>;
};

const DogsTable = ({ dogs }: DogsTableProps) => {
  const allDogs = use(dogs);

  return (
    <table>
      <thead>
        <tr>
          <th>Breed</th>
          <th>Edit</th>
          <th>Delete</th>
          <th>ID</th>
        </tr>
      </thead>

      <tbody>
        {allDogs?.map((dog) => (
          <DogTableRow key={dog.id} dog={dog} />
        ))}
      </tbody>
    </table>
  );
};

export default DogsTable;
