const section = document.getElementById("section");
const span = document.getElementById("page-number");
let page = 1;

const display = async (page) => {
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

    section.innerHTML = data.results
      .map((card) => {
        return `
      <div class="container">
        <div class="image-container" id="image_container">
          <img src='${card.image}' alt='An image of ${card.name}'/>
        </div>
        <div class="details">
        <table>
          <tr>
            <td>Name: </td>
            <td>${card.name}</td>
          </tr>
          <tr>
            <td>Status: </td>
            <td>${card.status}</td>
          </tr>
          <tr>
            <td>Species: </td>
            <td>${card.species}</td>
          </tr>
          <tr>
            <td>Gender: </td>
            <td>${card.gender}</td>
          </tr>
          <tr>
            <td>Origin: </td>
            <td>${card.origin.name}</td>
          </tr>
        </table>
        </div>
      </div>`;
      })
      .join("");
    span.innerText = page;
  } catch (error) {
    console.log("Error:", error);
  }
};

const nextBtn = () => {
  window.scrollTo({ top: 0 });
  page++;
  if (page > 42) page = 1;
  display(page);
};

const backBtn = () => {
  window.scrollTo({ top: 0 });
  page--;
  if (page < 1) page = 42;
  display(page);
};

display(page);
