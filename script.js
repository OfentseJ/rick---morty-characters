const imageContainer = document.getElementById("image_container");
const nameP = document.getElementById("name");
const statusSpan = document.getElementById("status");
const speciesSpan = document.getElementById("species");
const typeSpan = document.getElementById("type");
const genderSpan = document.getElementById("gender");
const locationSpan = document.getElementById("location");

let index = 0;

const display = async (index) => {
  try {
    const data = await fetch(
      "https://rickandmortyapi.com/api/character/?count=40"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not retrieve data");
        }
        return res.json();
      })
      .catch((error) => console.error(error));
    const name = data.results[index].name;
    const status = data.results[index].status;
    const species = data.results[index].species;
    const type = data.results[index].type;
    const gender = data.results[index].gender;
    const location = data.results[index].location;
    const image = data.results[index].image;

    imageContainer.innerHTML = `<img src='${image}' alt='An image of ${name}'/>`;
    nameP.innerText = name;
    statusSpan.innerText = status;
    speciesSpan.innerText = species;
    typeSpan.innerText = type;
    genderSpan.innerText = gender;
    location.innerText = location;
  } catch (error) {
    console.log("Error:", error);
  }
};

const nextBtn = () => {
  index++;
  display(index);
};

const backBtn = () => {
  index--;
  display(index);
};

display(index);
