"use client";

const DogDisplay = () => {
  const handleOnClick = async () => {
    // console.log("clicked!");

    // Fetch data from the API
    const resp = await fetch("/api/dogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await resp.json();
    console.log("data", data);
  };

  return (
    <div>
      <button onClick={handleOnClick} type="button">
        Click Me
      </button>
    </div>
  );
};

export default DogDisplay;
