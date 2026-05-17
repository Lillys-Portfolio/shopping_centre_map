function showScreen(screenId) {

  const screens = document.querySelectorAll('.screen');

  screens.forEach(screen => {
    screen.classList.remove('active');
  });

  document.getElementById(screenId)
    .classList.add('active');
}

function searchStores() {

  const input =
    document.getElementById('searchInput')
    .value
    .toLowerCase();

  const stores =
    document.querySelectorAll('.store');

  stores.forEach(store => {

    const text =
      store.textContent.toLowerCase();

    store.style.display =
      text.includes(input)
      ? 'block'
      : 'none';
  });
}

function openMap(storeName) {

  document.getElementById('selectedStore')
    .innerText = storeName + ' Location';

  showScreen('mapScreen');
}

function toggleAccessibility() {

  const panel =
    document.getElementById('accessibilityPanel');

  panel.style.display =
    panel.style.display === 'block'
    ? 'none'
    : 'block';
}

function toggleLargeText() {
  document.body.classList.toggle('large-text');
}

function toggleContrast() {

  document.getElementById('app')
    .classList.toggle('high-contrast');
}