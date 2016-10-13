'use strict';

if (module.hot) {
  module.hot.accept();
}

import 'babel-polyfill';
import '../styles/index.scss';

const apiMethod = 'flickr.photosets.getPhotos';
const apiKey = 'd25bfd5e4f8bd67871b131d73825ca74'; // TODO: Conceal this
const photosetId = '72157645388455379';

const flickrUrl = `https://api.flickr.com/services/rest/?method=${apiMethod}&api_key=${apiKey}&photoset_id=${photosetId}&format=json`;

let photosList;
let currentPhotoIndex;

function showModal(e) {
  const modal = document.querySelector('.modal');

  let img = document.createElement('img');
  img.src = e.target.src;
  img.alt = e.target.alt;
  img.title = e.target.title;

  document.querySelector('.modal__content').appendChild(img);
  modal.className += ' modal--visible';
}

function hideModal(e) {
  const modal = document.querySelector('.modal');
  const modalContent = document.querySelector('.modal__content');
  const modalPhoto = modalContent.lastElementChild;

  modalContent.removeChild(modalPhoto);
  modal.className = 'modal';
}

function showPreviousPhoto(e) {
  console.log(photosList);
}

function showNextPhoto(e) {
  console.log(photosList);
}

function handleResponse(e) {
  const target = e.target;

  if (target.readyState == 4 && target.status == 200) {
    let jsonResponse;
    // let photosList;
    let responseText = target.responseText;

    // TODO: Use a regex instead
    // Convert text response into valid JSON
    responseText = responseText.replace('jsonFlickrApi(', '');
    responseText = responseText.substring(responseText, responseText.length - 1);

    // Parse the text response into JSON
    jsonResponse = JSON.parse(responseText);
    photosList = jsonResponse.photoset.photo;

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
      img.title = photo.title;
      img.className = 'thumbnails-list__thumbnail';
      img.onclick = showModal;

      listItem.appendChild(img);
      document.querySelector('.thumbnails-list').appendChild(listItem);
    }
  }
}

const span = document.querySelector('.modal__close');
span.onclick = hideModal;

const prevPhotoNav = document.querySelector('.navigator--prev');
prevPhotoNav.onclick = showPreviousPhoto;

const nextPhotoNav = document.querySelector('.navigator--next');
nextPhotoNav.onclick = showNextPhoto;

window.onclick = function(e) {
  const modal = document.querySelector('.modal');

  if (e.target === modal) {
    hideModal(e);
  }
};

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = handleResponse;
xhr.open('GET', flickrUrl, true);
xhr.send();
