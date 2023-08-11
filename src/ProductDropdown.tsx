import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  // Add other properties
}

function ProductDropdown({ onSelectProduct }: { onSelectProduct: (product: Product) => void }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://api-uct.mukuru.com/taurus/v1/resources/product-types');
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Select Product</h2>
      <select onChange={(e) => onSelectProduct(products.find(product => product.id === parseInt(e.target.value))!)}>
        <option value="">Select a product</option>
        {products.map(product => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProductDropdown;
