/**
 * @class Lightbox
 * @classdesc Displays a photo from a grid in a modal window, with the
 * ability to move to the next and previous photos in the grid.
 */
class Lightbox {

  /**
   * Creates a new Lightbox
   * @param  {Array} photosList JSON of photo data
   * @return {Lightbox}
   */
  constructor(photosList) {
    this.photosList = photosList;

    this.modal = document.querySelector('.modal');
    this.modalClose = document.querySelector('.modal__close');
    this.navPrev = this.modal.querySelector('.navigator--prev');
    this.navNext = this.modal.querySelector('.navigator--next');

    this.isVisible = false;

    this.initializeEventListeners();
  }

  /**
   * Initialize event listeners for this component
   * @return {undefined}
   */
  initializeEventListeners() {
    window.addEventListener('click', (evt) => this.hideBackground(evt));
    window.addEventListener('keydown', (evt) => this.handleKeyDown(evt));

    this.modalClose.addEventListener('click', () => this.hideModal());
    this.navPrev.addEventListener('click', () => this.showPreviousPhoto());
    this.navNext.addEventListener('click', () => this.showNextPhoto());
  }

  /**
   * Show the modal window with the photo clicked on by the user
   * @param  {MouseEvent} evt Mouse event triggered by user click
   * @return {undefined}
   */
  showModal(evt) {
    const modalContent = this.modal.querySelector('.modal__content');

    let img = evt.target.cloneNode(false);
    img.className = '';

    let imgTitle = document.createElement('h1');
    imgTitle.innerHTML = img.alt;
    imgTitle.className = 'modal__title';

    modalContent.appendChild(imgTitle);
    modalContent.appendChild(img);

    this.modal.className += ' modal--visible';
    this.isVisible = true;
  }

  /**
   * Hides the modal window
   * @return {undefined}
   */
  hideModal() {
    const modalContent = this.modal.querySelector('.modal__content');
    const img = modalContent.querySelector('img');
    const imgTitle = modalContent.querySelector('.modal__title');

    modalContent.removeChild(img);
    modalContent.removeChild(imgTitle);

    this.modal.className = 'modal';
    this.isVisible = false;
  }

  /**
   * Hides the modal window from a background click
   * @param  {MouseEvent} evt Mouse event triggered by user click
   * @return {undefined}
   */
  hideBackground(evt) {
    if (evt.target === this.modal) {
      this.hideModal();
    }
  }

  /**
   * Shows the next photo in the grid relative to the current photo
   * @return {undefined}
   */
  showPreviousPhoto() {
    const modalContent = this.modal.querySelector('.modal__content');
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
  showNextPhoto() {
    const modalContent = this.modal.querySelector('.modal__content');
    const img = modalContent.querySelector('img');
    const modalTitle = modalContent.querySelector('.modal__title');
    const currentIndex = parseInt(img.getAttribute('data-index'));
    const numPhotos = this.photosList.length;
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
  handleKeyDown(evt) {
    const e = evt || window.event;

    if (this.isVisible) {
      switch (e.keyCode) {
        case 27: // Escape
          this.hideModal();
          break;
        case 37: // Left
          this.showPreviousPhoto();
          break;
        case 39: // Right
          this.showNextPhoto();
          break;
        default:
          break;
      }
    }
  }
}

export default Lightbox;
