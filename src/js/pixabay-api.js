'use strict';
import axios from 'axios';

export const fetchPhotosByQuery = (query, currentPage = 1) => {
  return axios.get('https://pixabay.com/api/', {
    params: {
      key: '49835598-9f74b1000f2ba2b610eab7f75',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: currentPage,
      per_page: 15,
    },
  });
};
