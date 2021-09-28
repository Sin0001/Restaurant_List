const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantData = require('./restaurant.json').results
mongoose.connect('mongodb://localhost/restaurant-list')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  restaurantData.forEach(item => {
    Restaurant.create({
      name: item.name,
      name_en: item.name_en,
      category: item.category,
      image: item.image,
      localtion: item.localtion,
      phone: item.phone,
      google_map: item.google_map,
      rating: item.rating,
      description: item.description
    })
  });
  console.log('Done. Ctrl + c to exit.')
})