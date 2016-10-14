'use strict';

if (module.hot) {
  module.hot.accept();
}

import 'babel-polyfill';
import '../styles/index.scss';

import Lightbox from './lightbox.js';

const apiMethod = 'flickr.photosets.getPhotos';
const apiKey = 'd25bfd5e4f8bd67871b131d73825ca74'; // TODO: Conceal this
const photosetId = '72157645388455379';

const flickrUrl = `https://api.flickr.com/services/rest/?method=${apiMethod}&api_key=${apiKey}&photoset_id=${photosetId}&format=json`;

let theLightbox;

/**
 * Handle the response from the Flickr API request
 * @param  {Event} e Event indicating the request state chaged
 * @return {undefined}
 */
function handleResponse(evt) {
  const target = evt.target;

  if (target.readyState === 4 && target.status === 200) {
    let jsonResponse;
    let photosList;
    let responseText = target.responseText;

    // TODO: Use a regex instead
    // Convert the text response into valid JSON
    responseText = responseText.replace('jsonFlickrApi(', '');
    responseText = responseText.substring(responseText, responseText.length - 1);

    // Parse the text response into JSON
    jsonResponse = JSON.parse(responseText);
    photosList = jsonResponse.photoset.photo;

    theLightbox = new Lightbox(photosList);

    for (let i = 0, len = photosList.length; i < len; i++) {
      const photo = photosList[i];

      // Construct the URL for the current photo
      const photoId = photo.id;
      const photoSecret = photo.secret;
      const farmId = photo.farm;
      const serverId = photo.server;
      const photoUrl = `https://farm${farmId}.staticflickr.com/${serverId}/${photoId}_${photoSecret}.jpg`;

      let listItem = document.createElement('li');
      listItem.className = 'thumbnails-list__item';

      let img = document.createElement('img');
      img.src = photoUrl;
      img.alt = photo.title;
      img.className = 'thumbnails-list__thumbnail';
      img.setAttribute('data-index', i);
      img.addEventListener('click', (evt) => theLightbox.showModal(evt));

      listItem.appendChild(img);
      document.querySelector('.thumbnails-list').appendChild(listItem);
    }

    // Hide the loading indicator once all thumbnails have been created
    document.querySelector('.loading').className += ' loading--hidden';
  }
}

let xhr = new XMLHttpRequest();
xhr.addEventListener('readystatechange', (evt) => handleResponse(evt));
xhr.open('GET', flickrUrl, true);
xhr.send();
