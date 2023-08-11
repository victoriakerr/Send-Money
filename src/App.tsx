import React, { useState, useEffect } from 'react';
import CountryDropdown from './CountryDropdown';
import ProductDropdown from './ProductDropdown';

function App() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [remittanceCost, setRemittanceCost] = useState<number | null>(null);

  useEffect(() => {
    if (selectedCountry && selectedProduct) {
      async function calculateRemittanceCost() {
        try {
          const response = await fetch(
            `https://api-uct.mukuru.com/taurus/v1/products/price-check?pay_in_country=${selectedCountry.iso2}&pay_out_country=${selectedProduct.destinationCountry.iso2}&pay_in_currency=ZAR&pay_out_currency=ZAR&type=${selectedProduct.id}`
          );

          const data = await response.json();
          setRemittanceCost(data.pay_out_amount); // Replace with the actual property from the API response
        } catch (error) {
          console.error('Error calculating remittance cost:', error);
        }
      }

      calculateRemittanceCost();
    }
  }, [selectedCountry, selectedProduct]);

  return (
    <div className="App">
      <h1>Remittance Cost Calculator</h1>

      <CountryDropdown onSelectCountry={setSelectedCountry} />
      <ProductDropdown onSelectProduct={setSelectedProduct} />

      {remittanceCost !== null && (
        <div>
          <h2>Remittance Cost</h2>
          <p>{remittanceCost} ZAR</p>
        </div>
      )}
    </div>
  );
}

export default App;
