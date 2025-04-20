'use strict';
import axios from "axios";

export const fetchPhotosByQuery = (query, currentPage) => {
    const axiosOptions = {
        params: {
            key: '48301172-ef8913a37f764f18c5dbf5629',
            q: query,
            image_type: 'photo', 
            orientation: 'horizontal',
            safesearch: true,
            page: currentPage,
            per_page: 15,
        },
    };

    return axios.get(`https://pixabay.com/api/`, axiosOptions);
};