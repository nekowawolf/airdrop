const filterButton = document.getElementById('filterButton');
  const filterDropdown = document.getElementById('filterDropdown');

  filterButton.addEventListener('click', () => {
    filterDropdown.classList.toggle('hidden');
  });

  document.addEventListener('click', (event) => {
    if (!filterButton.contains(event.target) && !filterDropdown.contains(event.target)) {
      filterDropdown.classList.add('hidden');
    }
  });