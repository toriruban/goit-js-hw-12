'use strict';

export const createGalleryCardTemplate = img => `
  <li class="gallery-item">
    <a href="${img.largeImageURL}">
      <img src="${img.webformatURL}" alt="${img.tags}" />
    </a>
    <div class="comment-box">
      <p class="img-comment"><b>Likes:</b> ${img.likes}</p>
      <p class="img-comment"><b>Views:</b> ${img.views}</p>
      <p class="img-comment"><b>Comments:</b> ${img.comments}</p>
      <p class="img-comment"><b>Downloads:</b> ${img.downloads}</p>
    </div>
  </li>`;

