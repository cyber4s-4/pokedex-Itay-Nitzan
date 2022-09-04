import { Logic } from "./Logic";
import { Pokemon } from "./Pokemon";
const logic = new Logic();
declare global {
  interface Window {
    isFavourite: boolean;
    sortBy: "A2Z" | "Z2A" | "h2l" | "l2h";
  }
}
window.isFavourite = false;
const body = document.getElementsByTagName("body")[0];
body.classList.add("stop-scrolling");
export class HandleUi {
  finishLoadingUI() {
    const loader = document.querySelector(".loader") as HTMLDivElement;
    const changeUiSection = document.querySelector(
      ".change-ui-section"
    ) as HTMLDivElement;
    const pokePreview = document.querySelector(
      ".poke-preview"
    ) as HTMLDivElement;
    loader.style.display = "none";
    changeUiSection.style.display = "flex";
    pokePreview.style.display = "flex";
    body.classList.remove("stop-scrolling");
    const sortOptions = Array.from(
      document.querySelectorAll<HTMLLIElement>(".sort-option")
    );
    sortOptions.forEach((sortOption) => {
      sortOption.addEventListener("click", async () => {
        this.removePokemonsFromDisplay();
        if (sortOption.id === "sortIdLowToHigh") {
          window.sortBy = "l2h";
          outFavoritesBtn.classList.remove("none");
          const response = await fetch("/pokemons?sort=l2h");
          const data = await response.json();
          this.createAndDisplayPokemons(data);
        } else if (sortOption.id === "sortIdHighToLow") {
          window.sortBy = "h2l";
          outFavoritesBtn.classList.remove("none");
          const response = await fetch("/pokemons?sort=h2l");
          const data = await response.json();
          this.createAndDisplayPokemons(data);
        } else if (sortOption.id === "sortAtoZ") {
          window.sortBy = "A2Z";
          outFavoritesBtn.classList.remove("none");
          const response = await fetch("/pokemons?sort=A2Z");
          const data = await response.json();
          this.createAndDisplayPokemons(data);
        } else if (sortOption.id === "sortZtoA") {
          window.sortBy = "Z2A";
          outFavoritesBtn.classList.remove("none");
          const response = await fetch("/pokemons?sort=Z2A");
          const data = await response.json();
          this.createAndDisplayPokemons(data);
        } else {
          return null;
        }
      });
    });

    const sortItems = Array.from(
      document.getElementsByClassName("sort-option")
    );
    const showSortingOptions = document.getElementById(
      "touch"
    ) as HTMLInputElement;
    const sortingListContainer = document.getElementsByClassName("slide")[0];
    sortItems.forEach((x) =>
      x.addEventListener("click", () => {
        showSortingOptions.dispatchEvent(new Event("click"));
      })
    );
    showSortingOptions.addEventListener("click", () => {
      sortingListContainer.classList.toggle("active");
    });

    const outFavoritesBtn = document.getElementById("outButton") as HTMLElement;
    const showFavorites = document.querySelector(
      "#showFavorites"
    ) as HTMLDivElement;
    showFavorites.addEventListener("click", async () => {
      try {
        window.isFavourite = true;
        const response = await fetch("/star/star");
        const data = await response.json();
        if (!data.length) {
          window.isFavourite = false;
          return false;
        } else {
          this.removePokemonsFromDisplay();
          this.createAndDisplayPokemons(data);
          outFavoritesBtn.classList.remove("none");
        }
      } catch (err) {
        window.isFavourite = false;
        console.log("Error in retrieving favorites from server.");
        throw err;
      }
    });
  }

  removePokemonsFromDisplay() {
    const pokeContainer = document.querySelector(
      ".poke-container-body"
    ) as HTMLElement;
    pokeContainer.replaceChildren("");
  }
  createAndDisplayPokemons(pokemonArr: Pokemon[]) {
    for (const element of pokemonArr) {
      this.createPokemonCard(element);
    }
  }
  createPokemonCard = (pokemon: Pokemon) => {
    const colors = {
      fire: "#FDDFDF",
      grass: "#DEFDE0",
      electric: "#FCF7DE",
      water: "#15aaff",
      ground: "#A88C7D",
      rock: "#d5d5d4",
      fairy: "#fceaff",
      poison: "#98d7a5",
      bug: "#f8d5a3",
      dragon: "#97b3e6",
      psychic: "#eaeda1",
      flying: "#F5F5F5",
      fighting: "#E6E0D4",
      normal: "#F5F5F5",
      dark: "#4C5265",
      ghost: "#cc8899",
      ice: "#DEF3FD",
      steel: "#d5d5d4",
    };
    const main_types = Object.keys(colors);
    const pokeContainer = document.querySelector(
      ".poke-container-body"
    ) as HTMLElement;
    const pokemonCard = document.createElement("div");
    const id = pokemon.id.toString();
    pokemonCard.id = id;
    pokemonCard.classList.add("pokemon");
    const name =
      pokemon.name[0].toUpperCase() +
      pokemon.name.slice(1).replaceAll("-", " ").replaceAll("/", " ");
    const visualId = pokemon.id.toString().padStart(3, "0");
    const poke_types = pokemon.pokemonTypes;

    const type = main_types.find((type) => poke_types.indexOf(type) > -1);
    const color = colors[type as keyof typeof colors] || "";
    pokemonCard.style.backgroundColor = color;

    // Add star
    const star = document.createElement("img");
    star.className = "star";
    if (pokemon.isFavorite) star.classList.add("star-selected");
    star.src = "https://cdn-icons-png.flaticon.com/512/188/188931.png";
    star.alt = "Add To Favorites";
    pokemonCard.appendChild(star);
    star.addEventListener("click", (e) => {
      e.stopPropagation();
      star.classList.toggle("star-selected");
      logic.addFavorite(pokemon.name);
    });

    // Add img container
    const imgContainer = document.createElement("div");
    imgContainer.className = "img-container";
    pokemonCard.appendChild(imgContainer);

    // Add pokemon image
    const pokemonImage = document.createElement("img");
    pokemonImage.className = "pokemon-image";
    if (Array.isArray(pokemon.pictureSrc)) {
      if (pokemon.pictureSrc[0] !== null) {
        pokemonImage.src = pokemon.pictureSrc[0];
      } else {
        pokemonImage.src = pokemon.pictureSrc[1];
      }
    } else {
      pokemonImage.src = pokemon.pictureSrc;
    }
    pokemonImage.setAttribute(
      "onerror",
      "this.onerror=null;this.src='https://i.ibb.co/9HVyMwK/download-icon-pikachu-pokeball-pokemon-icon-1320184857556086253-512-removebg-preview.png';"
    );

    imgContainer.appendChild(pokemonImage);

    // Add info section within the pokemon card
    const pokemonInfo = document.createElement("div");
    pokemonInfo.className = "info";
    pokemonCard.appendChild(pokemonInfo);

    const visualIdText = document.createElement("span");
    visualIdText.className = "number";
    visualIdText.innerText = "#" + visualId;
    pokemonInfo.appendChild(visualIdText);

    const pokemonH3 = document.createElement("h3");
    pokemonH3.className = "name";
    pokemonH3.innerText = name;
    pokemonInfo.appendChild(pokemonH3);

    const pokemonTypeContainer = document.createElement("div");
    pokemonTypeContainer.className = "type";
    pokemonTypeContainer.innerText = "Type: ";
    pokemonInfo.appendChild(pokemonTypeContainer);

    const pokemonType = document.createElement("span") as HTMLHeadingElement;
    pokemonType.innerText = type ? type[0].toUpperCase() + type.slice(1) : "";
    pokemonTypeContainer.appendChild(pokemonType);

    // Add the pokemon card to the pokemon container
    pokeContainer.appendChild(pokemonCard);
    pokemonCard.addEventListener("click", () => {
      addPokemonToPreviewBox(pokemon);
      const pokePreview = document.querySelector(
        ".poke-preview"
      ) as HTMLElement;
      pokePreview.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  async showFavorites() {
    const favoritesArr = await logic.getFavoritesArr();
    for (const element of favoritesArr) {
      this.createPokemonCard(element);
    }
  }
}

export function addPokemonToPreviewBox(pokemon: Pokemon) {
  const nameEl = document.getElementById("name") as HTMLElement;
  nameEl.innerText =
    pokemon.name[0].toUpperCase() +
    pokemon.name.slice(1).replaceAll("-", " ").replaceAll("/", " ");
  const type = document.querySelector("#type") as HTMLElement;
  type.textContent = `${
    pokemon.pokemonTypes[0][0].toUpperCase() + pokemon.pokemonTypes[0].slice(1)
  } type pokemon`;
  const moves = document.querySelector("#moves-list") as HTMLElement;
  for (let i = 0; i < 6; i++) {
    const li = moves.querySelectorAll("li")[i];
    li.innerText = pokemon.moves[i];
  }
  const height = document.querySelector("#height") as HTMLElement;
  height.innerText = `Height: ${pokemon.height}`;
  const weight = document.querySelector("#weight") as HTMLElement;
  weight.innerText = `Weight: ${pokemon.weight}`;
  const pic = document.querySelector("#pokeimg") as HTMLImageElement;
  if (pokemon.pictureSrc.length > 1) {
    pic.src = pokemon.pictureSrc[0];
    if ((pic.src = pokemon.pictureSrc[0])) {
      pic.setAttribute(
        "onerror",
        `this.onerror=null;this.src=${pokemon.pictureSrc[1]}`
      );
    }
    if ((pic.src = pokemon.pictureSrc[1])) {
      pic.setAttribute(
        "onerror",
        "this.onerror=null;this.src='https://i.ibb.co/9HVyMwK/download-icon-pikachu-pokeball-pokemon-icon-1320184857556086253-512-removebg-preview.png';"
      );
    }
  } else {
    if (pokemon.spritesSources.frontDefault !== null) {
      pic.src = pokemon.spritesSources.frontDefault;
      addSpinAndShinyListeners(pokemon);
    } else {
      pic.src = pokemon.pictureSrc[0];
      pic.setAttribute(
        "onerror",
        "this.onerror=null;this.src='https://i.ibb.co/9HVyMwK/download-icon-pikachu-pokeball-pokemon-icon-1320184857556086253-512-removebg-preview.png';"
      );
    }
  }
}

function addSpinAndShinyListeners(pokemon: Pokemon) {
  const pic = document.querySelector("#pokeimg") as HTMLImageElement;
  const spinButton = document.getElementsByClassName("spin")[0];
  const shinyButton = document.getElementsByClassName("shiny")[0];
  const pokeImgRegularFront = pokemon.spritesSources.frontDefault;
  const pokeImgRegularBack = pokemon.spritesSources.backDefault;
  const pokeImgShinyFront = pokemon.spritesSources.frontShiny;
  const pokeImgShinyBack = pokemon.spritesSources.backShiny;
  spinButton.addEventListener("click", () => {
    if (pic.src === pokeImgRegularFront) {
      if (pokeImgRegularBack == null) {
        console.log("No back image");
        return;
      }
      pic.src = pokeImgRegularBack;
      return;
    }
    if (pic.src === pokeImgRegularBack) {
      pic.src = pokeImgRegularFront;
      return;
    }
    if (pic.src === pokeImgShinyFront) {
      if (pokeImgShinyBack == null) {
        console.log("No Shiny back image");
        return;
      }
      pic.src = pokeImgShinyBack;
      return;
    }
    if (pic.src === pokeImgShinyBack) {
      if (pokeImgShinyFront == null) {
        console.log("No Shiny front image");
        return;
      }
      pic.src = pokeImgShinyFront;
    }
  });
  shinyButton.addEventListener("click", () => {
    if (pic.src === pokeImgRegularFront) {
      if (pokeImgShinyFront == null) {
        console.log("No Shiny front image");
        return;
      }
      pic.src = pokeImgShinyFront;
      return;
    }
    if (pic.src === pokeImgRegularBack) {
      if (pokeImgShinyBack == null) {
        console.log("No Shiny back image");
        return;
      }
      pic.src = pokeImgShinyBack;
      return;
    }
    if (pic.src === pokeImgShinyFront) {
      pic.src = pokeImgRegularFront;
      return;
    }
    if (pic.src === pokeImgShinyBack) {
      if (pokeImgRegularBack == null) {
        console.log("No back image");
        return;
      }
      pic.src = pokeImgRegularBack;
    }
  });
}

export async function handleInputEntered() {
  const inputEl = document.querySelector(".search-input") as HTMLInputElement;
  // If value is a string
  if (isNaN(Number(inputEl.value))) {
    const searchResult = logic.getPokemonByName(inputEl.value);
    if (searchResult !== null) addPokemonToPreviewBox(await searchResult);
    // If value is a number
  } else {
    const searchResult = logic.getPokemonById(Number(inputEl.value));
    if (searchResult !== null) addPokemonToPreviewBox(await searchResult);
  }
}
