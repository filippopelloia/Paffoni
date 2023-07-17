
// ============ DROPDOWN MENU

var dropdown = document.getElementById("navbarDropdown");

var dropdownMenu = document.getElementById("navbarDropdown").nextElementSibling;

var timeoutId;

dropdown.addEventListener("mouseenter", function () {
  dropdownMenu.classList.add("show");

  clearTimeout(timeoutId);
});

dropdown.addEventListener("mouseleave", function () {
  timeoutId = setTimeout(function () {
    dropdownMenu.classList.remove("show");
  }, 1000);
});

dropdownMenu.addEventListener("mouseenter", function () {
  clearTimeout(timeoutId);
});

dropdownMenu.addEventListener("mouseleave", function () {
  timeoutId = setTimeout(function () {
    dropdownMenu.classList.remove("show");
  }, 1000);
});




// ============= SCROLL MENU

var navbar = document.querySelector(".navbar");
var navbarBrand = document.querySelector(".logo");
var search = document.querySelector(".fa-search");
var languages = document.querySelectorAll(".language");
var menuItems = document.querySelectorAll(".nav-link");

document.addEventListener("scroll", function () {
  var scrollPosition = window.scrollY || document.documentElement.scrollTop;

  if (scrollPosition > 0) {

    navbar.classList.add('scroll-menu');
    navbarBrand.classList.add('navbar-brand-black');
    search.classList.add('search-black');

    languages.forEach((languageItem) => {
      languageItem.classList.add('nav-link-black');
    });

    menuItems.forEach((menuItem) => {
      menuItem.classList.add('nav-link-black');
    });

  } else {

    navbar.classList.remove('scroll-menu');
    navbarBrand.classList.remove('navbar-brand-black');
    search.classList.remove('search-black');

    languages.forEach((languageItem) => {
      languageItem.classList.remove('nav-link-black');
    });

    menuItems.forEach((menuItem) => {
      menuItem.classList.remove('nav-link-black');
    });

  }
});






// ============ MOSTRO DATI DINAMICAMENTE

fetch('dataProduct.json')
  .then(response => response.json())
  .then(data => {
    const resultsContainer = document.querySelector('.product-collection .d-flex');

    data.forEach(item => {
      const resultElement = document.createElement('div');
      resultElement.classList.add('result', 'col-lg-3', 'col-6');

      const html = `
        <div class="data-container mx-2">
          <div class="image-container d-flex justify-content-center align-items-center mt-5">
            <img class="image-result" src="${item.image}" alt="${item.name}">
          </div>
          <div class="result-name text-center mt-3">${item.name}</div>
          <p class="result-description text-center px-sm-3 px-1">${item.description}</p>
        </div>
      `;

      resultElement.innerHTML = html;
      resultsContainer.appendChild(resultElement);
    });
  })
  .catch(error => {
    console.error('Errore durante il recupero dei dati JSON:', error);
  });





// ============ FILTRO I CODICI TRAMITE INPUT

fetch('dataProduct.json')
  .then(response => response.json())
  .then(data => {
    const resultsContainer = document.querySelector('.product-collection .d-flex');  //CONTENITORE
    const searchForm = document.getElementById('form-search');                       //SEARCH FORM
    const nameFilterInput = document.getElementById('name-filter');                  //TESTO INPUT

    searchForm.addEventListener('submit', function(event) {                //innesco evento con button
      event.preventDefault(); 

      const searchTerm = nameFilterInput.value.trim().toLowerCase();

      const filteredData = data.filter(item => {
        const itemName = item.name.toLowerCase();
        return itemName.includes(searchTerm);
      });


      resultsContainer.innerHTML = '';




      //============ MOSTRO DATI FILTRATI con INPUT

      filteredData.forEach(item => {
        const resultElement = document.createElement('div');
        resultElement.classList.add('result', 'col-lg-3');

        const html = `
          <div class="data-container mx-2">
            <div class="image-container d-flex justify-content-center align-items-center mt-5">
              <img class="image-result" src="${item.image}" alt="${item.name}">
            </div>
            <div class="result-name text-center mt-3">${item.name}</div>
            <p class="result-description text-center px-3">${item.description}</p>
          </div>
        `;

        resultElement.innerHTML = html;
        resultsContainer.appendChild(resultElement);
      });
    });
  })
  .catch(error => {
    console.error('Errore durante il recupero dei dati JSON:', error);
  });





// ============ CHECKBOX

fetch('dataProduct.json')
  .then(response => response.json())
  .then(data => {
    const resultsContainer = document.querySelector('.product-collection .d-flex');
    const checkboxes = document.querySelectorAll('.form-check-input');
    const oggetti = data;

    function filterItems() {
      const selezionati = Array.from(checkboxes).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);

      const oggettiFiltrati = oggetti.filter(oggetto => {
        const { description, category, finiture } = oggetto;
        const descriptionLower = description.toLowerCase();

        return (
          selezionati.length === 0 ||  selezionati.some((valore) => descriptionLower.includes(valore)) || selezionati.some(valore => category.includes(valore)) || selezionati.some(valore => finiture.includes(valore))
        );
      });

      resultsContainer.innerHTML = '';
      oggettiFiltrati.forEach((item) => {
        const resultElement = document.createElement('div');
        resultElement.classList.add('result', 'col-lg-3');

        const html = `
          <div class="data-container mx-2">
            <div class="image-container d-flex justify-content-center align-items-center mt-5">
              <img class="image-result" src="${item.image}" alt="${item.name}">
            </div>
            <div class="result-name text-center mt-3">${item.name}</div>
            <p class="result-description text-center px-3">${item.description}</p>
          </div>
        `;

        resultElement.innerHTML = html;
        resultsContainer.appendChild(resultElement);
      });
    }

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', filterItems);
    });
  })
  .catch(error => {
    console.error('Si è verificato un errore durante il caricamento del file JSON:', error);
  });
