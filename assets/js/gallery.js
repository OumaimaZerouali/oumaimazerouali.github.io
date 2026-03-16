(function () {
  'use strict';

  var PER_PAGE = 5;
  var of = (window.GALLERY_I18N && window.GALLERY_I18N.of) || 'of';

  var pieces = Array.from(document.querySelectorAll('.gallery-piece'));
  var total = pieces.length;

  if (total <= PER_PAGE) return;

  var currentPage = 1;
  var totalPages = Math.ceil(total / PER_PAGE);

  var pagination = document.getElementById('gallery-pagination');
  var btnPrev = document.getElementById('gallery-prev');
  var btnNext = document.getElementById('gallery-next');
  var pageInfo = document.getElementById('gallery-page-info');

  pagination.hidden = false;

  function render() {
    var start = (currentPage - 1) * PER_PAGE;
    var end = start + PER_PAGE;

    pieces.forEach(function (piece, i) {
      piece.hidden = (i < start || i >= end);
    });

    pageInfo.textContent = currentPage + ' ' + of + ' ' + totalPages;
    btnPrev.disabled = currentPage === 1;
    btnNext.disabled = currentPage === totalPages;
  }

  btnPrev.addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage--;
      render();
      document.querySelector('.gallery-wall').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  btnNext.addEventListener('click', function () {
    if (currentPage < totalPages) {
      currentPage++;
      render();
      document.querySelector('.gallery-wall').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  render();
})();
