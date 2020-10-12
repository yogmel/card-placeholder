const form = document.querySelector('form');
const input = document.querySelector('#nomePkm');

const pokedexCaixa = document.querySelector("#pokedexCaixa");
const pokedexImg = document.querySelector("#pokedexImg");
const pokedexTitle = document.querySelector("#pokedexTitle");
const pokedexSubtitle = document.querySelector("#pokedexSubtitle");
const mensagemErro = document.querySelector("#mensagemErro");

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const requestUrl = `https://pokeapi.co/api/v2/pokemon/${input.value}`;

  fetch(requestUrl)
    .then((response) => response.json())
    .then((responseData) => {
      mensagemErro.textContent = '';

      const { id, name, types } = responseData;

      const elementTypes = types.map((typeInfo) => typeInfo.type.name);

      fillPokemonCard({
        imgUrl: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
        title: name,
        subtitle:  elementTypes.join(' | '),
        type: elementTypes[0]
      });

      pokedexCaixa.classList.add(elementTypes[0]);
    })
    .catch(() => {
      mensagemErro.textContent = "Pokemon não encontrado";
      fillPokemonCard({});
    })

});

const fillPokemonCard = ({ imgUrl = '', title = '', subtitle = '' }, type = '') => {
  pokedexImg.setAttribute('src', imgUrl);
  pokedexTitle.textContent = title;
  pokedexSubtitle.textContent = subtitle;
  pokedexCaixa.className = type && `card ${type}`;
}

