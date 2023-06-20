function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const END_POINT = '/breeds';
  const API_Key =
    'api_key=live_kahhAvSvRRRRi9R0rqhbiEZ6Y65IsmKinK3VpsvDIKdijOYFZA9pkB12pZ1Yd0P2';
  const url = `${BASE_URL}${END_POINT}?${API_Key}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};

function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const END_POINT = '/images/search';
  const SELECT_BREED = '?breed_ids'
  const API_Key =
    'api_key=live_kahhAvSvRRRRi9R0rqhbiEZ6Y65IsmKinK3VpsvDIKdijOYFZA9pkB12pZ1Yd0P2';

  const url = `${BASE_URL}${END_POINT}${SELECT_BREED}=${breedId}&${API_Key}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  })
};


export { fetchBreeds, fetchCatByBreed };
