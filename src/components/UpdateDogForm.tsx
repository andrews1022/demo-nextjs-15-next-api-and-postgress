// no need to add the 'use client' directive here
// this file is already a client component, so it will automatically be treated as one
// but we will still add it for clarity

"use client";

import type { FormEvent } from "react";

type UpdateDogFormProps = {
  dogId: string;
  handleOnInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmit: (event: FormEvent<HTMLFormElement>) => Promise<null | undefined>;
  inputValue: string;
};

const UpdateDogForm = ({
  dogId,
  handleOnInputChange,
  handleOnSubmit,
  inputValue,
}: UpdateDogFormProps) => {
  return (
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
        onChange={handleOnInputChange}
      />
      <label hidden htmlFor="id">
        ID:
      </label>
      <input hidden type="text" id="id" name="id" required value={dogId} readOnly />
      <button type="submit">Save</button>
    </form>
  );
};

export default UpdateDogForm;
