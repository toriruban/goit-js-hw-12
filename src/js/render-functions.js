'use strict';
export const createGalleryCardTemplate = image => {
    return `<div class="gallery-item">
                   <a href='${image.largeImageURL}'>
                   <img src='${image.webformatURL}' alt='${image.tags}'/>
                   </a>
                  <div class='comment-box'>
                    <p class='img-comment'><b class='img-comment-title'>Likes</b>: ${image.likes}</p>
                    <p class='img-comment'><b class='img-comment-title'>Views</b>: ${image.views}</p>
                    <p class='img-comment'><b class='img-comment-title'>Comments</b>: ${image.comments}</p>
                    <p class='img-comment'><b class='img-comment-title'>Downloads</b>: ${image.downloads}</p>
                  </div>
                </div>`
}