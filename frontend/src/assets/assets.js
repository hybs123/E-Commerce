import logo from './sara-organics.jpg';
import Bottle1 from './Bottle-1.jpg';
import Bottle2 from './Bottle-2.jpg';
import Bottle3 from './Bottle-3.jpg';
import Bottle4 from './Bottle-4.jpg';
import search_icon from './search_icon.png';
import About from './About.jpeg';
import razor from './razor.png'


export const assets = {
    logo,
    Bottle1,
    Bottle2,
    Bottle3,
    Bottle4,
    search_icon,
    About,
    razor
    
};

// Function to fetch products dynamically from the backend server
export async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3001/getProducts'); // Replace with your actual API URL
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}
