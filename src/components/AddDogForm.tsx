import { addDogBreed } from "@/actions/dogs";

const AddDogForm = () => {
  return (
    // a simple form to add a new dog breed to the database
    <form action={addDogBreed}>
      <label htmlFor="breed">Breed:</label>
      <input type="text" id="breed" name="breed" required />
      <button type="submit">Add Dog Breed</button>
    </form>
  );
};

export default AddDogForm;
