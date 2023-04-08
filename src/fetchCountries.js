// const BASE_URL = 'https://restcountries.com/v2';

// async function fetchCountries(searchQuery) {
//   const response = await fetch(`${BASE_URL}/name/${searchQuery}`);
//   return await response.json();
// }

// export default fetchCountries;


const BASE_URL = 'https://restcountries.com/v3.1';
export default function fetchCountries(searchQuery) {
    return fetch(`${BASE_URL}/name/${searchQuery}?fields=name,capital,population,flags,languages`
    )
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
}







// export default function fetchCountries(name) {
// return fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
//   )
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   })
// }
