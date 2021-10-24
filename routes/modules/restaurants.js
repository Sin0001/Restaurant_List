const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//新增餐廳
router.get('/new', (req, res) => {
  res.render('new')
})

//送出新增餐廳
router.post('/', (req, res) => {
  const { name, name_en, category, location, phone, google_map, rating, description } = req.body
  // 如果使用者沒有存入圖片，就存預設圖片網址
  const image = req.body.image || "https://discountflooringsupplies.com.au/wp-content/uploads/blank-img.jpg"
  const userId = req.user._id
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//瀏覽餐廳detail
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  return Restaurant.findOne({id, userId})
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console(error))
})

//編輯的頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  return Restaurant.findOne({ id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console(error))
})

//送出編輯渲染回首頁
//這裡好像怪怪的要研究一下
router.put('/:id', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  const userId = req.user._id
  const id = req.params.id
  return Restaurant.findOneAndUpdate({ id, userId }, { $set: req.body })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  return Restaurant.findOne({id , userId})
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router