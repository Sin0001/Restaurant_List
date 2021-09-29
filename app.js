const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const restaurant = require('./models/restaurant')
const Restaurant = require('./models/restaurant')
const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

//瀏覽首頁
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

//search restaurant and render
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
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

//新增餐廳
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

//送出新增餐廳
app.post('/restaurants', (req, res) => {
  const name = req.body.name
  return Restaurant.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//瀏覽餐廳detail
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console(error))
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})