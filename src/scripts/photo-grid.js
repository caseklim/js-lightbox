import Lightbox from './lightbox.js';

/**
 * @class PhotoGrid
 * @classdesc Creates markup for a grid display of photos
 */
class PhotoGrid {

  /**
   * Creates a new PhotoGrid
   * @param  {Array} photosList List of objects containing photo data
   * @return {PhotoGrid}
   */
  constructor(photosList) {
    this.thumbnailsList = document.querySelector('.thumbnails-list');

    for (let i = 0, len = photosList.length; i < len; i++) {
      const photo = photosList[i];
      const img = this.createImageThumbnail(photo, i);

      let listItem = document.createElement('li');
      listItem.className = 'thumbnails-list__item';

      listItem.appendChild(img);
      this.thumbnailsList.appendChild(listItem);
    }

    this.photoBox = new Lightbox(photosList);

    // Hide the loading indicator once DOM has been initialized
    document.querySelector('.loading').className += ' loading--hidden';
  }

  /**
   * Creates an HTMLImageElement out of the given photo data
   * @param  {Object} photo     Object containing photo data from Flickr
   * @param  {Number} index     The index of the image thumbnail
   * @return {HTMLImageElement} HTML element created from given photo data
   */
  createImageThumbnail(photo, index) {
    const photoId = photo.id;
    const photoSecret = photo.secret;
    const farmId = photo.farm;
    const serverId = photo.server;
    const photoUrl = `https://farm${farmId}.staticflickr.com/${serverId}/${photoId}_${photoSecret}.jpg`;

    let img = document.createElement('img');
    img.src = photoUrl;
    img.alt = photo.title;
    img.className = 'thumbnails-list__thumbnail';
    img.setAttribute('data-index', index);
    img.addEventListener('click', (evt) => this.photoBox.showModal(evt));

    return img;
  };
}

export default PhotoGrid;
