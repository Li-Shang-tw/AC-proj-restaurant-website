

//導入express,設定server related variable
const express = require('express')
const app = express()
const port = 3000


//導入handlebars

const exphbs = require('express-handlebars')


//導入外部json檔案

const restaurant_list = require('./restaurant.json')


//set template engine

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files

app.use(express.static('public'))

//setting router and corresponding response


//1.route to homepage

app.get('/', (req, res) => {
  res.render('index', { rst: restaurant_list.results })
})


//2.route to show page

app.get('/restaurants/:rst_id', (req, res) => {
  const showRst = restaurant_list.results.filter(rst => rst.id == req.params.rst_id)

  res.render('show', { rst: showRst[0] })
})


//3. router to  search

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const rstSearch = restaurant_list.results.filter(rst => {
    return rst.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { rst: rstSearch })
})
//listen to  and start server
app.listen(port, () => {
  console.log(`Express is running  on http://localhost:${port}`)

})

