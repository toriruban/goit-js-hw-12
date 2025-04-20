'use strict';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"; 

import { fetchPhotosByQuery } from './js/pixabay-api';
import { createGalleryCardTemplate } from './js/render-functions';

const searchForm = document.querySelector('.user-search');
const inputSearchImages = document.querySelector('#input-search');
const resultsDiv = document.querySelector('#results');
const loader = document.querySelector('#loader-js');
const loadMore = document.querySelector('.js-load-more-btn');

let page = 1;
let searchedQuery = '';
let totalPage = 0;
let lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250 });

const onSearchFormSubmit = async event => {
        event.preventDefault();

        searchedQuery = inputSearchImages.value.trim();
    
        if (!searchedQuery) {
            loadMore.classList.add('is-hidden');
            iziToast.error({
                title: 'Error',
                message: 'The search field cannot be empty. Please try again!',
                position: 'topRight'
            });
            return;
        }

    resultsDiv.innerHTML = '';
    inputSearchImages.value = '';
    loader.classList.remove('hidden');

    page = 1;
    loadMore.classList.add('is-hidden');

    try {
        const { data } = await fetchPhotosByQuery(searchedQuery, page);
    
            if (data.hits.length === 0) {
                iziToast.warning({
                    title: 'No results',
                    message: 'No images found for your query!',
                    position: 'topRight',
                });
                return;
            }
    
        resultsDiv.innerHTML = data.hits.map(createGalleryCardTemplate).join('');
        lightbox.refresh();
    
        window.scrollTo({ top: resultsDiv.offsetTop, behavior: 'smooth' });
        
        totalPage = Math.ceil(data.totalHits / 15);
    
            if (totalPage > 1) {
                loadMore.classList.remove('is-hidden');
                loadMore.removeEventListener('click', onLoadMoreBtnClick);
                loadMore.addEventListener('click', onLoadMoreBtnClick);
            } else {
                loadMore.classList.add('is-hidden');
            }
        } catch (error) {
                iziToast.error({
                    title: 'Error',
                    message: 'An error occurred. Please try again!',
                    position: 'topRight'
                });
            console.error(error);
        } finally {
            loader.classList.add('hidden');
            searchForm.reset();
        }
};  

const onLoadMoreBtnClick = async event => {
    page++;

    try {
        const { data } = await fetchPhotosByQuery(searchedQuery, page);

        const galleryTemplate = data.hits.map(createGalleryCardTemplate).join('');
        resultsDiv.insertAdjacentHTML('beforeend', galleryTemplate);
        lightbox.refresh();

        const firstCard = document.querySelector('.gallery-item');
        if (firstCard) {
            const cardHeight = firstCard.getBoundingClientRect().height;
            window.scrollBy({
                top: cardHeight * 2,
                behavior: 'smooth'
            });
        }

        if (page >= totalPage) {
            loadMore.classList.add('is-hidden');
            iziToast.warning({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'bottomCenter',
            });
            loadMore.removeEventListener('click', onLoadMoreBtnClick);
        }
    } catch (error) {
        console.error(error);
        iziToast.error({
            title: 'Error',
            message: 'Failed to load more images!',
            position: 'topRight'
        });
    } 
};
searchForm.addEventListener('submit', onSearchFormSubmit);