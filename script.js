var currentCategory = 'All';
var highContrast = false;
var largeText = false;

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(function(s) {
    s.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
  closeAccessibility();
}

function toggleAccessibility() {
  var panel = document.getElementById('accessibilityPanel');
  var overlay = document.getElementById('overlay');
  var isOpen = panel.classList.contains('open');
  panel.classList.toggle('open', !isOpen);
  overlay.classList.toggle('open', !isOpen);
}

function closeAccessibility() {
  document.getElementById('accessibilityPanel').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
}

function toggleContrast() {
  highContrast = !highContrast;
  document.getElementById('app').classList.toggle('high-contrast', highContrast);
  document.getElementById('contrastDot').classList.toggle('active', highContrast);
}

function toggleLargeText() {
  largeText = !largeText;
  document.getElementById('app').classList.toggle('large-text', largeText);
  document.getElementById('largeTextDot').classList.toggle('active', largeText);
}

function filterStores() {
  var query = document.getElementById('searchInput').value.toLowerCase();
  var items = document.querySelectorAll('.store-item');
  var visibleCount = 0;
  items.forEach(function(item) {
    var name = item.querySelector('strong').textContent.toLowerCase();
    var cat  = item.getAttribute('data-category');
    var show = name.includes(query) && (currentCategory === 'All' || cat === currentCategory);
    item.style.display = show ? 'flex' : 'none';
    if (show) visibleCount++;
  });
  document.getElementById('noResults').style.display = visibleCount === 0 ? 'flex' : 'none';
}

function selectCategory(category, btn) {
  currentCategory = category;
  document.querySelectorAll('.cat-chip').forEach(function(c) { c.classList.remove('active'); });
  btn.classList.add('active');
  filterStores();
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  currentCategory = 'All';
  var chips = document.querySelectorAll('.cat-chip');
  chips.forEach(function(c) { c.classList.remove('active'); });
  chips[0].classList.add('active');
  filterStores();
}

function openMap(storeName) {
  document.getElementById('mapTitle').textContent = 'Route to ' + storeName;
  document.getElementById('destLabel').textContent = storeName;
  document.getElementById('destinationMarker').style.display = 'flex';
  document.getElementById('routeSvg').style.display = 'block';

  var steps = [
    'Walk straight ahead for 50 metres',
    'Turn left at the main junction',
    'Continue forward past the escalators',
    storeName + ' will be on your right'
  ];

  var html = '<div class="directions-header"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>Directions</div><ul class="step-list">';
  steps.forEach(function(step, i) {
    var last = i === steps.length - 1;
    html += '<li class="step-item"><div class="step-dot' + (last ? ' last' : '') + '"></div><p class="step-text' + (last ? ' last' : '') + '">' + step + '</p></li>';
  });
  html += '</ul>';

  document.getElementById('directionsContent').innerHTML = html;
  showScreen('mapScreen');
}
