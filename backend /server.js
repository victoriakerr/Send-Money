const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const API_BASE_URL = 'https://api-uct.mukuru.com/taurus/v1';

app.post('/calculate-remittance', async (req, res) => {
  try {
    const {
      pay_in_country,
      pay_out_country,
      pay_in_currency,
      pay_out_currency,
      pay_in_amount,
      type,
    } = req.body;

    const response = await axios.get(`${API_BASE_URL}/products/price-check`, {
      params: {
        pay_in_country,
        pay_out_country,
        pay_in_currency,
        pay_out_currency,
        pay_in_amount,
        type,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error calculating remittance:', error);
    res.status(500).json({ error: 'An error occurred while calculating remittance.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
