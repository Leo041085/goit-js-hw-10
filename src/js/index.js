import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

refs.loader.hidden = false;
refs.error.hidden = true;
refs.catInfo.setAttribute('hidden', '')

fetchBreeds().then((results) => {
  refs.loader.hidden = true;
  refs.select.removeAttribute('hidden');
  refs.select.insertAdjacentHTML('beforeend', createMarkUpSelect(results))
}).catch(error => {
  refs.select.setAttribute('hidden', '');
  refs.error.hidden = false;
  console.log('error');
})

function createMarkUpSelect(arr) {
  return arr.map(el => {
    return `<option value = "${el.id}">${el.name}</option>`;
  });
};

refs.select.addEventListener('change', handlerSelect);

function handlerSelect(e) {
  refs.catInfo.setAttribute('hidden', '');
  const catBreed = e.target.value;
  refs.loader.hidden = false;
  refs.select.setAttribute('hidden', '');

  fetchCatByBreed(catBreed).then((results) => {
    refs.select.removeAttribute('hidden');
    refs.loader.hidden = true;
    createMarkUp(results);
    refs.catInfo.removeAttribute('hidden');
    refs.catInfo.innerHTML = createMarkUp(results);
  }).catch(error => {
    refs.select.setAttribute('hidden', '');
    refs.error.hidden = false;
  })
};

function createMarkUp(array) {
  return array.map(({ url, breeds }) => {
    const { name, description, temperament } = breeds[0];
    return `
    <img src="${url}" alt="${name}" width = "400">
      <h2>${name}</h2>
      <p>Description: ${description}</p>
      <p>Temperament: ${temperament}</p>
    `;
  })
};


