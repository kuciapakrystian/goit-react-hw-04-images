import axios from 'axios';

export async function imgApi(query, page) {
  const API_URL = 'https://pixabay.com/api/';
  // параметри запиту на бекенд
  const options = {
    params: {
      key: '34991535-a7425182e30d9d17c0e128526',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: 12,
    },
  };

  const response = await axios.get(API_URL, options);
  return response;
}