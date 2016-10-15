'use strict';

if (module.hot) {
  module.hot.accept();
}

import 'babel-polyfill';
import '../styles/index.scss';

import FlickrApi from './flickr-api.js';
import PhotoGrid from './photo-grid.js';

const searchMatches = window.location.search.match(/\?photosetId=(\d+)/);

let photosetId = '72157669701568203';

// Use default photoset ID unless one is provided through query params
if (searchMatches) {
  photosetId = searchMatches[1];
}

const flickrApi = new FlickrApi(photosetId);

flickrApi.makeRequest().then((photosList) => {
  const photoGrid = new PhotoGrid(photosList);
}).catch((error) => {
  const errorContainer = document.querySelector('.error');
  const errorReason = document.querySelector('.error__reason');

  let errorMessage;

  if (error instanceof Error) {
    errorMessage = error.toString();
  } else {
    errorMessage = JSON.stringify(error);
  }

  errorReason.innerHTML = errorMessage;
  errorContainer.className = 'error';
});
