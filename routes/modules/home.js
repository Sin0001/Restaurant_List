const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

//search餐廳
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const keywordArr = keyword.toLowerCase().split(' ')
  Restaurant.find()
    .lean()
    .then(restaurants => {
      let filteredRestaurant = []
      for (restaurant of restaurants) {
        const name = restaurant.name.toLowerCase()
        const category = restaurant.category.toLowerCase()
        if (keywordArr.find((word) =>
          name.includes(word) || category.includes(word)
        )) {
          filteredRestaurant.push(restaurant)
        }
      }
      res.render('index', { restaurants: filteredRestaurant, keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router