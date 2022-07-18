const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

mongoose.connect('mongodb://localhost:27017/selfieDB');

const geolocateSchema = {
  lat: Number,
  lon: Number,
  timestamp: Number,
  mood: String
}

const Geolocate = mongoose.model('Geolocate', geolocateSchema);

app.get('/api', (req, res) => {
  Geolocate.find((err, foundData) => {
    if (!err) {
      res.json(foundData);
    } else res.send(err);
  });
});

app.post('/api', (req, res) => {
  console.log(req.body);
  const timestamp = Date.now();
  const newGeolocate = new Geolocate({
    lat: req.body.lat,
    lon: req.body.lon,
    timestamp: timestamp,
    mood: req.body.mood
  });
  newGeolocate.save(err => {
    if (!err) {
      res.json({
        status: 'Success',
        latitude: req.body.lat,
        longitude: req.body.lon,
        timestamp: timestamp,
        mood: req.body.mood
      });
    } else res.send(err);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
