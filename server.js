// Bring in modules
const express = require('express');

// Initialize app
const app = express();

// Test route - DELETE ME LATER
app.get('/', (req, res) => {
	res.send('This is a test');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));