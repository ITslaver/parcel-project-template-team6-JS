import Pagination from 'tui-pagination';

const pagination = new Pagination(document.getElementById('pagination'), {
  totalItems: 500,
  itemsPerPage: 10,
  visiblePages: 5,
  centerAlign: true,
});
