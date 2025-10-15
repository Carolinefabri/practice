// Language Selector Logic
const languageSelector = document.getElementById('languageSelector');
const languageBtn = document.getElementById('languageBtn');
const languageDropdown = document.getElementById('languageDropdown');
const currentFlag = document.getElementById('currentFlag');
const currentLang = document.getElementById('currentLang');
const languageOptions = document.querySelectorAll('.language-option');

// Toggle dropdown
languageBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  languageSelector.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
  languageSelector.classList.remove('active');
});

// Language selection
languageOptions.forEach(option => {
  option.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Remove active class from all options
    languageOptions.forEach(opt => opt.classList.remove('active'));
    
    // Add active class to selected option
    option.classList.add('active');
    
    // Update button display
    const lang = option.dataset.lang;
    const flag = option.dataset.flag;
    const name = option.dataset.name;
    
    currentFlag.textContent = flag;
    currentLang.textContent = name;
    
    // Close dropdown
    languageSelector.classList.remove('active');
    
    // Call your language change function
    changeLanguage(lang);
  });
});

// Traduções
const translations = {
  en: {
    title: 'Welcome to Random Destination',
    description: 'Tap the button to instantly unveil your next surprise travel destination!',
    btnReady: `Let's do it!`,
    btnRefresh: 'Refresh',
    cardTitle: 'Destination',
    loading: 'Loading...',
    error: 'Oops! Something went wrong 😢',
    capital: 'Capital',
    region: 'Region',
    population: 'Population',
    footer: '© 2025 Random Destination. All rights reserved. By Caroline Fabri'
  },
  pt: {
    title: 'Bem-vindo ao Destino Aleatório',
    description: 'Toque no botão para revelar instantaneamente seu próximo destino de viagem surpresa!',
    btnReady: 'Boraaa!!',
    btnRefresh: 'Atualizar',
    cardTitle: 'Destino',
    loading: 'Carregando...',
    error: 'Ops! Algo deu errado 😢',
    capital: 'Capital',
    region: 'Região',
    population: 'População',
    footer: '© 2025 Destino Aleatório. Todos os direitos reservados. Por Caroline Fabri'
  }
};

// Idioma atual
let currentLanguage = 'en';

// Your language change function
function changeLanguage(lang) {
  currentLanguage = lang;
  console.log('Language changed to:', lang);
  
  const t = translations[lang];
  
  // Atualizar textos da página
  document.querySelector('h1').textContent = t.title;
  document.querySelector('body > p').textContent = t.description;
  document.getElementById('btn-surprise').textContent = t.btnReady;
  document.getElementById('btn-clear').textContent = t.btnRefresh;
  document.querySelector('.card header h2').textContent = t.cardTitle;
  document.querySelector('footer p').textContent = t.footer;
  
  // Se houver dados carregados, recarregar com novo idioma
  const infoDiv = document.getElementById("country-info");
  if (infoDiv.innerHTML && !infoDiv.innerHTML.includes(t.loading) && !infoDiv.innerHTML.includes(t.error)) {
    // Manter os dados mas atualizar os labels
    updateCountryLabels();
  }
}

// Armazenar país atual
let currentCountry = null;

// Função para atualizar labels do país
function updateCountryLabels() {
  if (!currentCountry) return;
  
  const t = translations[currentLanguage];
  const infoDiv = document.getElementById("country-info");
  
  infoDiv.innerHTML = `
    <h3>${currentCountry.name.common}</h3>
    <p><strong>${t.capital}:</strong> ${currentCountry.capital ? currentCountry.capital[0] : "N/A"}</p>
    <p><strong>${t.region}:</strong> ${currentCountry.region}</p>
    <p><strong>${t.population}:</strong> ${currentCountry.population.toLocaleString()}</p>
  `;
}

// Função separada para buscar país
async function fetchRandomCountry() {
  const infoDiv = document.getElementById("country-info");
  const flagImg = document.getElementById("country-flag");
  const t = translations[currentLanguage];

  infoDiv.innerHTML = t.loading;
  flagImg.src = "";
  flagImg.alt = "";

  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags"
    );
    const countries = await response.json();

    const randomIndex = Math.floor(Math.random() * countries.length);
    currentCountry = countries[randomIndex];

    flagImg.src = currentCountry.flags.svg;
    flagImg.alt = `Flag of ${currentCountry.name.common}`;

    infoDiv.innerHTML = `
      <h3>${currentCountry.name.common}</h3>
      <p><strong>${t.capital}:</strong> ${currentCountry.capital ? currentCountry.capital[0] : "N/A"}</p>
      <p><strong>${t.region}:</strong> ${currentCountry.region}</p>
      <p><strong>${t.population}:</strong> ${currentCountry.population.toLocaleString()}</p>
    `;

  } catch (error) {
    infoDiv.innerHTML = t.error;
    console.error(error);
  }
}

// Ligar os botões fora de qualquer outro listener
document.getElementById("btn-surprise").addEventListener("click", fetchRandomCountry);

function clearCard() {
  const infoDiv = document.getElementById("country-info");
  const flagImg = document.getElementById("country-flag");

  infoDiv.innerHTML = "";
  flagImg.src = "";
  flagImg.alt = "";
  currentCountry = null;
}

document.getElementById("btn-clear").addEventListener("click", clearCard);