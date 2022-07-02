import { createAndDisplayPokemons } from "./handleUI";

let pokemon;
if (pokemon == undefined) {
    pokemon = "pikachu";
    api(pokemon);
} else {
    api(pokemon);
}
export function api(pokemon: string) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((res) => res.json())
        .then((data) => {
            const pic = document.querySelector('#pokeimg') as HTMLImageElement;
            pic.src = data.sprites.front_default;
            function spinShiny() {
                const spinButton = document.getElementsByClassName('spin')[0];
                const shinyButton = document.getElementsByClassName('shiny')[0];
                let pokeImgRegularFront = data.sprites.front_default;
                let pokeImgRegularBack = data.sprites.back_default;
                let pokeImgShinyFront = data.sprites.front_shiny;
                let pokeImgShinyBack = data.sprites.back_shiny;
                spinButton.addEventListener('click', () => {
                    console.log('spin', pic.src);

                    if (pic.src = pokeImgRegularFront) {
                        pic.src = pokeImgRegularBack
                        return;
                    }
                    if (pic.src = pokeImgRegularBack) {
                        console.log('Back to regular front');

                        pic.src = pokeImgRegularFront
                        return;
                    }
                    if (pic.src = pokeImgShinyFront) {
                        pic.src = pokeImgShinyBack
                        return;
                    }
                    if (pic.src = pokeImgShinyBack) {
                        pic.src = pokeImgShinyFront
                        return;
                    }
                })
                shinyButton.addEventListener('click', () => {
                    console.log('shine/unshine');

                    if (pic.src = pokeImgRegularFront) {
                        pic.src = pokeImgShinyFront
                        return;
                    }
                    if (pic.src = pokeImgRegularBack) {
                        pic.src = pokeImgShinyBack
                        return;
                    }
                    if (pic.src = pokeImgShinyFront) {
                        pic.src = pokeImgRegularFront
                        return;
                    }
                    if (pic.src = pokeImgShinyBack) {
                        pic.src = pokeImgRegularBack
                        return;
                    }
                });
            }
            spinShiny();
            (document.getElementById('name') as HTMLElement).innerText = data.name;
            const type = document.querySelector('#type') as HTMLElement;
            type.textContent = `${data.types[0].type.name} type pokemon`;
            let moves = document.getElementsByClassName("moves-container")[0] as HTMLElement;
            for (let i = 0; i < 6; i++) {
                let li = moves.getElementsByClassName("move")[i];
                li.innerHTML = data.moves[i * 8].move.name;
            }
            const height = document.querySelector('#height') as HTMLElement;
            height.innerText = `Height: ${data.height}`;
            const weight = document.querySelector('#weight') as HTMLElement;
            weight.innerText = `Weight: ${data.weight}`;
            let form = document.querySelector("form");
            form!.addEventListener("submit", search);
        });
}

function search(e: any) {
    e.preventDefault();
    const pokeName = (document.querySelector('input') as HTMLInputElement).value.toLowerCase();
    api(pokeName);
}


createAndDisplayPokemons();
