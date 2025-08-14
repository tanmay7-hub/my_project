
  document.querySelectorAll('.dropdown-menu .dropdown-item').forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('filterBy').value = this.getAttribute('data-value');
      document.getElementById('filterDropdown').textContent = this.textContent;
    });
  });
