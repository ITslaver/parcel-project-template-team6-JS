const goToTopOnPagination = event => {
  if (event.target.localName !== 'a' && event.target.localName !== 'span') {
    return;
  } else {
    document.body.scrollIntoView({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
};

const paginationBtn = document.querySelector('.tui-pagination');

paginationBtn.addEventListener('click', goToTopOnPagination);
