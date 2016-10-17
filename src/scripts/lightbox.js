/**
 * @class Lightbox
 * @classdesc Displays a photo from a grid in a modal window, with the
 * ability to move to the next and previous photos in the grid
 */
class Lightbox {

  /**
   * Creates a new Lightbox
   * @param  {Array} photosList JSON of photo data
   * @return {Lightbox}
   */
  constructor(photosList) {
    this._photosList = photosList;

    this._modal = document.querySelector('.modal');
    this._modalClose = document.querySelector('.modal__close');
    this._navPrev = this._modal.querySelector('.navigator--prev');
    this._navNext = this._modal.querySelector('.navigator--next');

    this._isVisible = false;

    this._initializeEventListeners();
  }

  /**
   * Initialize event listeners for this component
   * @return {undefined}
   */
  _initializeEventListeners() {
    window.addEventListener('click', (evt) => this._hideBackground(evt));
    window.addEventListener('keydown', (evt) => this._handleKeyDown(evt));

    this._modalClose.addEventListener('click', () => this._hideModal());
    this._navPrev.addEventListener('click', () => this._showPreviousPhoto());
    this._navNext.addEventListener('click', () => this._showNextPhoto());
  }

  /**
   * Hides the modal window
   * @return {undefined}
   */
  _hideModal() {
    const modalContent = this._modal.querySelector('.modal__content');
    const img = modalContent.querySelector('img');
    const imgTitle = modalContent.querySelector('.modal__title');

    modalContent.removeChild(img);
    modalContent.removeChild(imgTitle);

    this._modal.className = 'modal';
    this._isVisible = false;
  }

  /**
   * Hides the modal window from a background click
   * @param  {MouseEvent} evt Mouse event triggered by user click
   * @return {undefined}
   */
  _hideBackground(evt) {
    if (evt.target === this._modal) {
      this._hideModal();
    }
  }

  /**
   * Shows the next photo in the grid relative to the current photo
   * @return {undefined}
   */
  _showPreviousPhoto() {
    const modalContent = this._modal.querySelector('.modal__content');
    const img = modalContent.querySelector('img');
    const modalTitle = modalContent.querySelector('.modal__title');
    const currentIndex = parseInt(img.getAttribute('data-index'));
    const prevIndex = (currentIndex - 1) > 0 ? (currentIndex - 1) : 0;

    let prevImg = document.querySelector(`[data-index="${prevIndex}"]`);
    prevImg = prevImg.cloneNode(false);
    prevImg.className = '';

    modalTitle.innerHTML = prevImg.alt;

    modalContent.removeChild(img);
    modalContent.appendChild(prevImg);
  }

  /**
   * Shows the previous photo in the grid relative to the current photo
   * @return {undefined}
   */
  _showNextPhoto() {
    const modalContent = this._modal.querySelector('.modal__content');
    const img = modalContent.querySelector('img');
    const modalTitle = modalContent.querySelector('.modal__title');
    const currentIndex = parseInt(img.getAttribute('data-index'));
    const numPhotos = this._photosList.length;
    const nextIndex = (currentIndex + 1) < (numPhotos) ? (currentIndex + 1) : (numPhotos - 1);

    let nextImg = document.querySelector(`[data-index="${nextIndex}"]`);
    nextImg = nextImg.cloneNode(false);
    nextImg.className = '';

    modalTitle.innerHTML = nextImg.alt;

    modalContent.removeChild(img);
    modalContent.appendChild(nextImg);
  }

  /**
   * Handle key presses recognized by this component
   * @param  {KeyboardEvent} evt Keyboard event triggered by key press
   * @return {undefined}
   */
  _handleKeyDown(evt) {
    const e = evt || window.event;

    if (this._isVisible) {
      switch (e.keyCode) {
        case 27: // Escape
          this._hideModal();
          break;
        case 37: // Left
          this._showPreviousPhoto();
          break;
        case 39: // Right
          this._showNextPhoto();
          break;
        default:
          break;
      }
    }
  }

  /**
   * Show the modal window with the photo clicked on by the user
   * @param  {MouseEvent} evt Mouse event triggered by user click
   * @return {undefined}
   */
  showModal(evt) {
    const modalContent = this._modal.querySelector('.modal__content');

    let img = evt.target.cloneNode(false);
    img.className = '';

    let imgTitle = document.createElement('h1');
    imgTitle.innerHTML = img.alt;
    imgTitle.className = 'modal__title';

    modalContent.appendChild(imgTitle);
    modalContent.appendChild(img);

    this._modal.className += ' modal--visible';
    this._isVisible = true;
  }
}

export default Lightbox;
