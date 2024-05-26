const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 1025; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card" data-id="${pokeman.id}">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;

    // Add event listeners for each card
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            const id = card.getAttribute('data-id');
            const selectedPokemon = pokemon.find(p => p.id == id);
            showModal(selectedPokemon);
        });
    });
};

const showModal = (pokemon) => {
    const modal = document.getElementById("pokemonModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalImage = document.getElementById("modalImage");
    const modalType = document.getElementById("modalType");

    modalTitle.innerText = `${pokemon.id}. ${pokemon.name}`;
    modalImage.src = pokemon.image;
    modalType.innerText = `Type: ${pokemon.type}`;

    modal.style.display = "block";
};

// Close the modal when the close button is clicked
const modal = document.getElementById("pokemonModal");
const span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
};

// Close the modal when clicking outside of the modal content
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

fetchPokemon();
