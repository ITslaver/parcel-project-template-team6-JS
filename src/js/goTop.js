const goToTopOnPagination = event => {
  if (event.target.localName !== 'a') {
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
