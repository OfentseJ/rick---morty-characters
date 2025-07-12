const container = document.getElementById("container");

let index = 0;
let page = 1;

const display = async (index, page) => {
  try {
    const data = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not retrieve data");
        }
        return res.json();
      })
      .catch((error) => console.error(error));

    const { name, status, species, gender, origin, image } =
      data.results[index];

    container.innerHTML = `
      <div class="image-container" id="image_container">
        <img src='${image}' alt='An image of ${name}'/>
      </div>
      <div class="details">
      <table>
        <tr>
          <td>Name:</td>
          <td>${name}</td>
        </tr>
        <tr>
          <td>Status:</td>
          <td>${status}</td>
        </tr>
        <tr>
          <td>Species:</td>
          <td>${species}</td>
        </tr>
        <tr>
          <td>Gender:</td>
          <td>${gender}</td>
        </tr>
        <tr>
          <td>Origin:s</td>
          <td>${origin.name}</td>
        </tr>
      </table>
      </div>
      <div class="btns">
        <button onclick="backBtn()">back</button>
        <button onclick="nextBtn()">next</button>
      </div>`;
  } catch (error) {
    console.log("Error:", error);
  }
};

const nextBtn = () => {
  index++;
  if (index > 19) {
    index = 0;
    page++;
  }
  display(index, page);
};

const backBtn = () => {
  index--;
  console.log(index);
  if (index < 0) {
    index = 19;
    page--;
    if (page < 1) {
      page = 1;
      index = 0;
    }
  }
  display(index, page);
};

display(index, page);
