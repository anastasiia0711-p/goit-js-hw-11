import axios from 'axios';

const API_KEY = '55695141-df1ad6569c10fb966400a1286';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(searchQuery) {
  const params = {
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}