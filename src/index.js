// import fetchCountries from './fetchCountries';
// import Notiflix from 'notiflix';
// import { debounce } from 'lodash';
// import './css/styles.css';

// const DEBOUNCE_DELAY = 300;

// const ref = {
//   input: document.querySelector('#search-box'),
//   ul: document.querySelector('.country-list'),
//   div: document.querySelector('.country-info'),
// };

// ref.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

// function onInputSearch(evt) {
// const inputValue = evt.target.value.trim();
// if (inputValue === '') {
// return;
// }

//   fetchCountries(inputValue)
//     .then(countries => {
//       if (countries.length > 10) {
//         Notiflix.Notify.info(
//           `Too many matches found. Please enter a more specific name.`
//         );
//         clearMarkup();
        
//       } else if (countries.length <= 10 && countries.length >= 2) {
        
//         addMarkupList(countries, createCountriesListMarkup);
     
//       } else if (countries.length === 1) {
       
//         addMarkupInfo(countries, createCountryInfoMarkup);
        
//       } else if (countries.length < 1) {
//         return;
//       }
//     })
//     .catch(errorSearch);
// }

// function clearMarkup() {
//   ref.ul.innerHTML = '';
//   ref.div.innerHTML = '';
// }

// function addMarkupList(countries, callback) {
//   const markup = callback(countries);
//   ref.ul.innerHTML = markup;
//   ref.div.innerHTML = '';
// }

// function addMarkupInfo(countries, callback) {
//   const markup = callback(countries);
//   ref.ul.innerHTML = '';
//   ref.div.innerHTML = markup;


// }
// function createCountriesListMarkup(countries) {
//   return countries
//     .map(({ name, flags }) => {
   
//       return `
//        <li class="counrty-item">
//         <img class="flag" src = ${flags.svg} width = 50 >
//         <p class=country-name>${name.common}</p>
//        </li>`;
//     })
//     .join('');
// }
// function createCountryInfoMarkup(countries) {
//   return countries
//     .map(({ name, flags, capital, population, languages }) => {
//       return `
//       <div class=country-info__title>
//         <img src = ${flags.svg} width = 50>
//         <p class=country-info__name>${name.common}</p>
//       </div>
//       <p class=country-info__descr><b class=country-info__caption>Capital:</b>${capital}</p>
//       <p class=country-info__descr><b class=country-info__caption>Population:</b>${population}</p>
//       <p class=country-info__descr><b class=country-info__caption>Languages:</b>${Object.values(languages)}</p>`;
//     })
//     .join('');
// }

// function errorSearch(error) {
//   // console.log(error);
//   clearMarkup();
//   Notiflix.Notify.failure(`Oops, there is no country with that name`);
// }

import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';
import { debounce } from 'lodash';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const ref = {
  input: document.querySelector('#search-box'),
  ul: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};

ref.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

const errorSearch = document.querySelector('.error-search');

function onInputSearch(evt) {
  const inputValue = evt.target.value.trim();

  if (inputValue === '') {
    return;
  }

  fetchCountries(inputValue)
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info(
          `Too many matches found. Please enter a more specific name.`
        );
        clearMarkup();
      } else if (countries.length <= 10 && countries.length >= 2) {
        addMarkupList(countries, createCountriesListMarkup);
      } else if (countries.length === 1) {
        addMarkupInfo(countries, createCountryInfoMarkup);
      } else if (countries.length < 1) {
        return;
      }
    })
    .catch(error => { console.log(error) });
}

function clearMarkup() {
  ref.ul.innerHTML = '';
  ref.div.innerHTML = '';
}

function addMarkupList(countries, callback) {
  const markup = callback(countries);
  ref.ul.innerHTML = markup;
  ref.div.innerHTML = '';
}

function addMarkupInfo(countries, callback) {
  const markup = callback(countries);
  ref.ul.innerHTML = '';
  ref.div.innerHTML = markup;
}

function createCountriesListMarkup(countries) {
  return countries
    .map(({ name, flags }) => {
      return `
       <li class="country-item">
        <img class="flag" src=${flags.svg} width=50>
         <p class=country-name>${name}</p>
       </li>`;
    })
    .join('');
}

function createCountryInfoMarkup(countries) {
  return countries
    .map(({ name, flags, capital, population, languages }) => {
      return `
      <div class=country-info__title>
        <img src = ${flags.svg} width = 50>
         <p class=country-info__name>${name}</p>
      </div>
      <p class=country-info__descr><b class=country-info__caption>Capital:</b>${capital}</p>
      <p class=country-info__descr><b class=country-info__caption>Population:</b>${population}</p>
      <p class=country-info__descr><b class=country-info__caption>Languages:</b>${Object.values(languages).map(lang => lang.name).join(', ')}</p>
      `;
    })
    .join('');
}


