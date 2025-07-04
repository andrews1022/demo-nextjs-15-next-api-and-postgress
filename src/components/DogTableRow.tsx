"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";

import { updateDogBreed } from "@/lib/actions";
import type { Dog } from "@/types/dog";

type DogTableRowProps = {
  dog: Dog;
};

const DogTableRow = ({ dog }: DogTableRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(dog.breed);

  const handleOnDeleteClick = (id: string) => {
    console.log("delete button clicked!", id);
  };

  // optimistic update handler
  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsEditing(false); // optimistically exit edit mode

    // optionally, store previous value to revert on error
    const prevValue = dog.breed;
    dog.breed = inputValue; // optimistically update

    try {
      await updateDogBreed(new FormData(event.currentTarget));
    } catch (err) {
      // revert on error
      dog.breed = prevValue;
      setInputValue(prevValue);

      console.error("Error fetching dogs:", err);
      return null; // return null on any fetch error
    }
  };

  return (
    <tr key={dog.id}>
      <td>
        {isEditing ? (
          <form onSubmit={handleOnSubmit}>
            <label hidden htmlFor="breed">
              Breed:
            </label>
            <input
              type="text"
              id="breed"
              name="breed"
              required
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <label hidden htmlFor="id">
              ID:
            </label>
            <input hidden type="text" id="id" name="id" required value={dog.id} readOnly />
            <button type="submit">Save</button>
          </form>
        ) : (
          <Link href={`/dogs/${dog.id}`}>{inputValue}</Link>
        )}
      </td>

      <td>
        {!isEditing ? (
          <button onClick={() => setIsEditing((prev) => !prev)} type="button">
            Edit
          </button>
        ) : null}
      </td>
      <td>
        <button disabled={isEditing} onClick={() => handleOnDeleteClick(dog.id)} type="button">
          Delete
        </button>
      </td>

      <td>{dog.id}</td>
      <td>{new Date(dog.created_at).toLocaleString()}</td>
    </tr>
  );
};

export default DogTableRow;
