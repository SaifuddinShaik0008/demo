import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Practice = () => {
    const [data, setData] = useState([]); // Initialize as an empty array
    const [filteredPrice, setFilteredPrice] = useState(''); // State for filtering price
    const [sortOrder, setSortOrder] = useState('desc'); // State for sorting order (asc or desc)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products');
                setData(response.data.products); // Assuming 'products' is the key in the response.
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this runs once when the component mounts.

    // Sorting: Sort data by price based on sortOrder
    const sortedData = [...data].sort((a, b) => {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

    // Filtering: Filter out products with price less than or equal to the filteredPrice
    const filteredData = sortedData.filter(item => {
        return filteredPrice ? item.price >= filteredPrice : true;
    });

    return (
        <div>
            <h1>Products List</h1>
            
           
            <div className='filter'>
                <div>
                    <label>Filter by Price: </label>
                    <input
                        type="number"
                        value={filteredPrice}
                        onChange={(e) => setFilteredPrice(e.target.value)}
                        placeholder="choose your price.."
                    />
                </div>

                <div>
                    <label>Sort by Price: </label>
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
            
            {/* Render filtered and sorted products */}
            <div className='head'>
                {filteredData.map(item => (
                    <div key={item.id} className='main'>
                        {/* Check if the image exists, otherwise fallback to a default image */}
                        <img 
                            src={item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/150'} 
                            className='img' 
                            alt={item.title || 'Product image'} 
                        />
                        <p>Price: ${item.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Practice;
