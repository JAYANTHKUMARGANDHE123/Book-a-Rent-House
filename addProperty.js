// import PropertyService from "./property.service.js";

// const propertyService = new PropertyService();

apiUrl = 'http://localhost:5000/api/properties';


// City data
const cities = {
    'Hyderabad': ['Kondapur', 'Madhapur', 'Hitec-city'],
    // 'Bangalore': ['Anagalapura', 'Devanahalli', 'Narayanapura'],
    'Kamareddy': ['Ashoknagar', 'Vidyanagar', 'Osmanpura'],
    'Chennai': ['MGR', 'Chikpet', 'Elore']
};

// DOM Elements
const propertyForm = document.getElementById('propertyForm');
const propertyTypeSelect = document.getElementById('propertyType');
const resCitySelect = document.getElementById('resCity');
const resLocationSelect = document.getElementById('resLocation');
const comCitySelect = document.getElementById('comCity');
const comLocationSelect = document.getElementById('comLocation');

// Populate city dropdowns
const populateCities = () => {
    const cityKeys = Object.keys(cities);
    cityKeys.forEach(city => {
        const option1 = document.createElement('option');
        option1.value = city;
        option1.textContent = city;
        resCitySelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = city;
        option2.textContent = city;
        comCitySelect.appendChild(option2);
    });
};

// Handle city change for residential
resCitySelect.addEventListener('change', function() {
    const selectedCity = this.value;
    resLocationSelect.innerHTML = '<option value="">Select</option>'; // Reset locations
    if (selectedCity) {
        cities[selectedCity].forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            resLocationSelect.appendChild(option);
        });
    }
});

// Handle property type change
propertyTypeSelect.addEventListener('change', function() {
    const selectedType = this.value;
    if (selectedType === 'residential') {
        document.getElementById('residentialSection').style.display = 'block';
        document.getElementById('commercialSection').style.display = 'none';
    } else if (selectedType === 'commercial') {
        document.getElementById('commercialSection').style.display = 'block';
        document.getElementById('residentialSection').style.display = 'none';
    } else {
        document.getElementById('residentialSection').style.display = 'none';
        document.getElementById('commercialSection').style.display = 'none';
    }
});

// Handle form submission
propertyForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const formData = prepareSaveProperty();
    // if (formData) {
    //     // Simulate a service call
    //     console.log('Property added:', formData);
    //     propertyForm.reset(); // Reset the form
    //     resLocationSelect.innerHTML = '<option value="">Select</option>'; // Reset locations
    //     comLocationSelect.innerHTML = '<option value="">Select</option>'; // Reset locations
    // } 
    if (formData) {
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(response => response.text())
        .then(data => {
          console.log('Property added:', data);
          propertyForm.reset(); // Reset the form
          resLocationSelect.innerHTML = '<option value="">Select</option>'; // Reset locations
          comLocationSelect.innerHTML = '<option value="">Select</option>'; // Reset locations
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    else {
        alert('Please fill all required fields');
    }
});

// Prepare property data for submission
function prepareSaveProperty() {
    const propertyType = propertyTypeSelect.value;
    if (!propertyType) return null; // Validate property type

    const data = {
        propertyType: propertyType,
        city: propertyType === 'residential' ? resCitySelect.value : comCitySelect.value,
        location: propertyType === 'residential' ? resLocationSelect.value : comLocationSelect.value,
        rent: propertyType === 'residential' ? document.getElementById('resRent').value : document.getElementById('comRent').value,
        size: propertyType === 'residential' ? resSize.value : comSize.value,
        area: propertyType === 'residential' ? resArea.value : comArea.value,
        face: propertyType === 'residential' ? resFace.value : comFace.value,
        buildingType: propertyType === 'residential' ? resBuildingType.value : comBuildingType.value,
        floor: propertyType === 'residential' ? resFloor.value :comFloor.value,
        yearsOfConstruction: propertyType === 'residential' ? resYearsOfConstruction.value : comYearsOfConstruction.value,
        advance: propertyType === 'residential' ? resAdvance .value: comAdvance.value,
        photos: propertyType === 'residential' ? resPhotos.value : comPhotos.value,
        innerFacilities: propertyType === 'residential' ? resInnerFacilities.value : comInnerFacilities.value,
        nearbyFacilities: propertyType === 'residential' ? resNearbyFacilities.value : comNearbyFacilities.value

        // Add other fields similarly...
    };

    return data
};

// Initialize the form
populateCities();


// Example of adding a property
async function submitProperty(property) {
    try {
        const addedProperty = await addProperty(property);
        console.log('Property added:', addedProperty);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Example of getting a property by ID
async function fetchProperty(id) {
    try {
        const property = getProperty(id);
        console.log('Fetched property:', property);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Example of updating a property
async function updateProperty(id, updatedData) {
    try {
        const updatedProperty = await updateProperty(id, updatedData);
        console.log('Updated property:', updatedProperty);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Example of deleting a property
async function deleteProperty(id) {
    try {
        const response = await deleteProperty(id);
        console.log('Deleted property:', response);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Example of getting properties with parameters
async function fetchProperties(params) {
    try {
        const properties = await getProperties(params);
        console.log('Fetched properties:', properties);
    } catch (error) {
        console.error('Error:', error);
    }
}


 // Add a new property
async function addProperty(property) {
    try {
        const response = await fetch(this.apiUrl,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(property)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding property:', error);
        throw error;
    }
}

// Get a property by ID
async function getProperty(id) {
    try {
        const response = await fetch(`${this.apiUrl}/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching property:', error);
        throw error;
    }
}

// Update a property by ID
async function updateProperty(id, property) {
    try {
        const response = await fetch(`${this.apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(property)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating property:', error);
        throw error;
    }
}

// Delete a property by ID
async function deleteProperty(id) {
    try {
        const response = await fetch(`${this.apiUrl}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting property:', error);
        throw error;
    }
}

// Get properties with optional query parameters
async function getProperties(params = {}) {
    try {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${this.apiUrl}?${queryString}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching properties:', error);
        throw error;
    }
}