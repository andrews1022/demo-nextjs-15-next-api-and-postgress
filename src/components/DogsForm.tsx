const DogsForm = () => {
  return (
    // a simple form to add a new dog to the database
    // it will have just one input for the breed
    <form action="/api/dogs" method="POST">
      <label htmlFor="breed">Breed:</label>
      <input type="text" id="breed" name="breed" required />
      <button type="submit">Add Dog</button>
    </form>
  );
};

export default DogsForm;
