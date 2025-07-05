"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";

import UpdateDogForm from "@/components/UpdateDogForm";
import { deleteDogBreed, updateDogBreed } from "@/actions/dogs";
import type { Dog } from "@/types/dog";

type DogTableRowProps = {
  dog: Dog;
};

const DogTableRow = ({ dog }: DogTableRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(dog.breed);

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
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

  const handleOnDeleteClick = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this dog breed?");

    // if user confirms, proceed with deletion
    if (confirmed) {
      try {
        await deleteDogBreed(id);
      } catch (error) {
        console.error("Error fetching dogs:", error);
        return null; // return null on any fetch error
      }
    }
  };

  return (
    <tr key={dog.id}>
      <td>
        {isEditing ? (
          <UpdateDogForm
            dogId={dog.id}
            handleOnInputChange={handleOnInputChange}
            handleOnSubmit={handleOnSubmit}
            inputValue={inputValue}
          />
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
    </tr>
  );
};

export default DogTableRow;
