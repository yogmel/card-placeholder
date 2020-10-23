const form = document.querySelector('form');
const input = document.querySelector('#nomePkm');

const cardCaixa = document.querySelector("#cardCaixa");
const cardUrl = document.querySelector("#cardUrl");
const cardImg = document.querySelector("#cardImg");
const cardType = document.querySelector("#cardType");
const cardEpisodes = document.querySelector("#cardEpisodes");
const cardSynopsis = document.querySelector("#cardSynopsis");
const mensagemErro = document.querySelector("#mensagemErro");

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const requestUrl = `https://api.jikan.moe/v3/search/anime?q=${input.value}`;

  fetch(requestUrl)
    .then((response) => response.json())
    .then((responseData) => {
      mensagemErro.textContent = '';

      const data = responseData.results[0];
      const { url, title, image_url, type, episodes, synopsis } = data;

      console.log('episodes', data);

      cardCaixa.classList.add('active');

      cardUrl.setAttribute('href', url);
      cardUrl.innerHTML = title;
      cardImg.setAttribute('src', image_url);
      cardType.textContent = type;
      cardEpisodes.textContent = `| ${episodes} episodes`;
      cardSynopsis.innerHTML = synopsis;
    })
    .catch(() => {
      mensagemErro.textContent = "Anime não encontrado";
    })

});


