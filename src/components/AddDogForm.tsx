import { addDogBreed } from "@/lib/actions";

const AddDogForm = () => {
  return (
    // a simple form to add a new dog to the database
    <form action={addDogBreed}>
      <label htmlFor="breed">Breed:</label>
      <input type="text" id="breed" name="breed" required />
      <button type="submit">Add Dog</button>
    </form>
  );
};

export default AddDogForm;
