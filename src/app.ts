let pokemon;
if (pokemon == undefined) {
    pokemon = "pikachu";
    api(pokemon);
} else {
    api(pokemon);
}
function api(pokemon: string) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(res => res.json())
        .then((data) => {
            let pic = document.querySelector("#pokeimg") as HTMLImageElement;
            pic.src = data.sprites.front_default;
            document.getElementById("name")!.innerText = data.name;
            let type = document.querySelector("#type") as HTMLElement;
            type.textContent = `${data.types[0].type.name} type pokemon`;
            // let moves = document.querySelector("#moves-list") as HTMLElement;
            // for (let i = 0; i < 6; i++) {
            //     let li = document.querySelectorAll("li")[i];
            //     li.innerText = data.moves[i * 8].move.name;
            // }
            let height = document.querySelector("#height") as HTMLElement;
            height.innerText = `Height: ${data.height}`;
            let weight = document.querySelector("#weight") as HTMLElement;
            weight.innerText = `Weight: ${data.weight}`;
            let sumbit = document.querySelector(".sumbit") as HTMLElement;
            sumbit.addEventListener("click", search)
            function search() {
                let pokeName = document.querySelector("input")!.value.toLowerCase();
                api(pokeName);
            };
        });
}