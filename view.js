// script.js
const apiUrl = 'http://localhost:5000/api/properties';
let properties = [];

const cities = {
  'Hyderabad': ['Kondapur', 'Madhapur', 'Hitec-city'],
//   'Bangalore': ['Anagalapura', 'Devanahalli', 'Narayanapura'],
  'Kamareddy': ['Ashoknagar', 'Vidyanagar', 'Osmanpura'],
  'Chennai': ['MGR', 'Chikpet', 'Elore']
};

document.addEventListener('DOMContentLoaded', () => {
  fetchProperties();

  document.getElementById('city').addEventListener('change', function() {
    const selectedCity = this.value;
    const locationSelect = document.getElementById('location');
    locationSelect.innerHTML = '<option value="">Select</option>'; // Reset locations

    if (selectedCity && cities[selectedCity]) {
      cities[selectedCity].forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        locationSelect.appendChild(option);
      });
    }
  });

  document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchParams = {
      city: document.getElementById('city').value,
      location: document.getElementById('location').value,
      propertyType: document.getElementById('propertyType').value,
      rent: document.getElementById('rent').value
    };
    fetchProperties(searchParams);
  });
});

function fetchProperties(params = {}) {
  const query = new URLSearchParams(params).toString();
  fetch(`${apiUrl}?${query}`)
    .then(response => response.json())
    .then(data => {
      properties = data;
      displayProperties(properties);
    })
    .catch(error => {
      console.error('Error fetching properties:', error);
    });
}

function displayProperties(properties) {
  const propertiesContainer = document.getElementById('propertiesContainer');
  propertiesContainer.innerHTML = '';

  if (properties.length === 0) {
    document.getElementById('noProperties').style.display = 'block';
  } else {
    document.getElementById('noProperties').style.display = 'none';
    properties.forEach(property => {
      const propertyCard = document.createElement('div');
      propertyCard.className = 'card mb-3';
      propertyCard.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${property.propertyType.toUpperCase()} Property</h5>
          <p class="card-text"><strong>City:</strong> ${property.city}</p>
          <p class="card-text"><strong>Location:</strong> ${property.location}</p>
          <p class="card-text"><strong>Rent:</strong> ${property.rent}</p>
          <p class="card-text"><strong>Size:</strong> ${property.size}</p>
          <p class="card-text"><strong>Area:</strong> ${property.area}</p>
          <p class="card-text"><strong>Face:</strong> ${property.face}</p>
          <p class="card-text"><strong>Building Type:</strong> ${property.buildingType}</p>
          <p class="card-text"><strong>Advance:</strong> ${property.advance}</p>
          <p class="card-text"><strong>Years of Construction:</strong> ${property.yearsOfConstruction}</p>
          <p class="card-text"><strong>Inner Facilities:</strong> ${property.innerFacilities}</p>
          <p class="card-text"><strong>Nearby Facilities:</strong> ${property.nearbyFacilities}</p>
        </div>
      `;
      propertiesContainer.appendChild(propertyCard);
    });
  }
}
