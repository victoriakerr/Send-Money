import React, { useState, useEffect } from 'react';

interface Country {
  id: number;
  name: string;
  iso2: string;
  displayOrder: number;
  // Add other properties
}

function CountryDropdown({ onSelectCountry }: { onSelectCountry: (country: Country) => void }) {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch('https://api-uct.mukuru.com/taurus/v1/resources/countries');
        const data: Country[] = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    }

    fetchCountries();
  }, []);

  return (
    <div>
      <h2>Select Sending Country</h2>
      <select onChange={(e) => onSelectCountry(countries.find(country => country.iso2 === e.target.value)!)}>
        <option value="">Select a country</option>
        {countries.map(country => (
          <option key={country.id} value={country.iso2}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountryDropdown;
