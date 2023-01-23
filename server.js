const express = require('express')
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser')
const path = require('path')
const axios = require('axios')
const connectDB = require('./server/database/connection')
const controller = require('./server/controller/controller')
const app = express();

dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 8080

app.get('/', (req, res) => {
	axios.get('http://localhost:3000/api/users')
		.then(function(response) {
			res.render('index', {users: response.data})
		})
		.catch(err =>{
			res.send(err)
		})
})



app.get('/add-user', (req, res) => {
	res.render('add_user')
})

app.get('/full-user', (req, res) => {
	axios.get('http://localhost:3000/api/users', {params:{id:req.query.id}})
	.then(function(userdata){
		res.render("full_user", {users : userdata.data})
	})

})

//Log Morgan
app.use(morgan('tiny'))

//MongoDB Connection
connectDB()

// Request to body-parser
app.use(bodyparser.urlencoded('extendet: true'))

//Подключаем движок-шаблонизатор ejs
app.set("view engine", "ejs")

// Загрузка assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//API
app.post('/api/users', controller.create)
app.get('/api/users', controller.find)
app.put('/api/users/:id', controller.full_info)
app.delete('/api/users/:id', controller.delete)

app.listen(PORT, () => {console.log(`Server is running on http://localhost:${PORT}`)})