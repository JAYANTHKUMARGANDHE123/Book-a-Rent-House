class PropertyService {
    constructor() {
        this.apiUrl = 'http://localhost:5000/api/properties';
    }

    // Add a new property
    async addProperty(property) {
        try {
            const response = await fetch(this.apiUrl, {
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
    async getProperty(id) {
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
    async updateProperty(id, property) {
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
    async deleteProperty(id) {
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
    async getProperties(params = {}) {
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
}

// Export the PropertyService class for use in other files
export default PropertyService;