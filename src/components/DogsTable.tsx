"use client";

import Link from "next/link";
// import { useState } from "react";

import type { Dog } from "@/types/dog";

type DogsTableProps = {
  dogs: Dog[];
};

const DogsTable = ({ dogs }: DogsTableProps) => {
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
        {dogs.map((dog) => (
          <tr key={dog.id}>
            <td>
              <Link href={`/dogs/${dog.id}`}>{dog.breed}</Link>
            </td>
            <td>{dog.id}</td>
            <td>{new Date(dog.created_at).toLocaleString()}</td>
            <td>
              <button type="button">Edit</button>
            </td>
            <td>
              <button type="button">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DogsTable;
