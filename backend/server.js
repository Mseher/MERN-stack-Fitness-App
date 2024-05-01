const express = require('express');
const mongoose = require('mongoose');
const venueData = require('./venueModel'); // Adjust the path accordingly
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 3000;
const database_url = 'mongodb://127.0.0.1:27017/bookMyTrial';

app.use('/src', express.static('C:Users/MALIK SAEED/Desktop/FitnessApp/frontend/dashboard/src'));

app.use(cors());

mongoose.connect(database_url);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Define a route to fetch all venues
app.get('/venues', async (req, res) => {
  try {
    const allData = await venueData.find();
    res.status(200).json(allData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET SINGLE VENUE
app.get('/venues/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const singleVenue = await venueData.findById(id);
    res.status(200).json(singleVenue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch data for a specific attribute (example: classDuration)
app.get('/venues/classDuration/:value', async (req, res) => {
    const { value } = req.params;
  
    try {
      const venuesWithClassDuration = await venueData.find({ 'classDuration': value });
      res.status(200).json(venuesWithClassDuration);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Fetch data for classInfo
  app.get('/venues/classInfo/:value', async (req, res) => {
    const { value } = req.params;
  
    try {
      const venuesWithClassInfo = await venueData.find({ 'classInfo': value });
      res.status(200).json(venuesWithClassInfo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Fetch data for classMapURL
  app.get('/venues/classMapURL/:value', async (req, res) => {
    const { value } = req.params;
  
    try {
      const venuesWithClassMapURL = await venueData.find({ 'classMapURL': value });
      res.status(200).json(venuesWithClassMapURL);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/venues/img_path/:value', async (req, res) => {
    const { value } = req.params;
  
    try {
      const venuesimg_path = await venueData.find({ 'img_path': value });
      res.status(200).json(venuesimg_path);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Fetch data for className
  app.get('/venues/className/:value', async (req, res) => {
    const { value } = req.params;
  
    try {
      const venuesWithClassName = await venueData.find({ 'className': value });
      res.status(200).json(venuesWithClassName);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Fetch data for classTrialURL
  app.get('/venues/classTrialURL/:value', async (req, res) => {
    const { value } = req.params;
  
    try {
      const venuesWithclassTrialURL = await venueData.find({ 'classTrialURL': value });
      res.status(200).json(venuesWithclassTrialURL);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET venues by dance
app.get('/venues/dance/:value', async (req, res) => {
    const { value } = req.params;
  
    try {
      const venuesWithDance = await venueData.find({ 'dance': value });
      res.status(200).json(venuesWithDance);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // GET venues by fitness
  app.get('/venues/fitness/:value', async (req, res) => {
    const { value } = req.params;
  
    try {
      const venuesWithFitness = await venueData.find({ 'fitness': value });
      res.status(200).json(venuesWithFitness);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // GET venues by other
  app.get('/venues/other/:value', async (req, res) => {
    const { value } = req.params;
  
    try {
      const venuesWithOther = await venueData.find({ 'other': value });
      res.status(200).json(venuesWithOther);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // GET venues by latitude
  app.get('/venues/latitude/:value', async (req, res) => {
    const { value } = req.params;
  
    try {
      const venuesWithLatitude = await venueData.find({ latitude: Number(value) });
      res.status(200).json(venuesWithLatitude);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // GET venues by longitude
  app.get('/venues/longitude/:value', async (req, res) => {
    const { value } = req.params;
  
    try {
      const venuesWithLongitude = await venueData.find({ longitude: Number(value) });
      res.status(200).json(venuesWithLongitude);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // GET venues by city
  app.get('/venues/city/:value', async (req, res) => {
    const { value } = req.params;
  
    try {
      const venuesWithCity = await venueData.find({ city: value });
      res.status(200).json(venuesWithCity);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // GET venues by county
  app.get('/venues/county/:value', async (req, res) => {
    const { value } = req.params;
  
    try {
      const venuesWithCounty = await venueData.find({ county: value });
      res.status(200).json(venuesWithCounty);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // GET venues by state
  app.get('/venues/state/:value', async (req, res) => {
    const { value } = req.params;
  
    try {
      const venuesWithState = await venueData.find({ state: value });
      res.status(200).json(venuesWithState);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  


// Define a simple route to test if the server is working
app.get('/', (req, res) => {
  res.send('Hello, this is your fitness app backend!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
