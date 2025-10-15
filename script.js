// Função separada para buscar país
async function fetchRandomCountry() {
  const infoDiv = document.getElementById("country-info");
  const flagImg = document.getElementById("country-flag");

  infoDiv.innerHTML = "";
  flagImg.src = "";
  flagImg.alt = "";

  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags"
    );
    const countries = await response.json();

    const randomIndex = Math.floor(Math.random() * countries.length);
    const country = countries[randomIndex];

    flagImg.src = country.flags.svg;
    flagImg.alt = `Flag of ${country.name.common}`;

    infoDiv.innerHTML = `
      <h3>${country.name.common}</h3>
      <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    `;


  } catch (error) {
    infoDiv.innerHTML = "Oops! Something went wrong 😢";
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
}
document.getElementById("btn-clear").addEventListener("click", clearCard);

