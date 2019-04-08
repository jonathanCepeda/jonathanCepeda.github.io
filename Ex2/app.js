const path = require('path')
const express = require('express')
const met = require('./met.js')

const app = express()

const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, 'public')

app.use(express.static(publicDir))


// no entendi la documentacion
app.get('/student', function(req, res) {
		res.send({
			id : "A01036193",
			fullname : "Jonathan Cepeda Briano",
			nickname : "Jony, Johnny o Jona",
			age : "24"
		})
})

app.get('/met', function(req, res){
	res.setHeader('Access-Control-Allow-Origin', '*')
	if( !req.query.search ) {
		return res.send({
			error: 'Tienes que dar una palabra clave para la busqueda'
		})
	}
	met.metodoMet(req.query.search, function(error, response) {
		if(error) {
			return res.send({
				error: error
			})
		} 
		const searchTerm = req.query.search
		met.metodoMet2(response.objectID, function(error, response) {
			if(error) {
				return res.send({
					error: error
				})
			} 
			return res.send({
				searchTerm :searchTerm,
				artist : response.artist,
				title : response.title,
				year : response.year,
				technique: response.technique,
				metURL : response.metURL
			})
		})
	})
})


app.get('*', function(req, res) {
	res.send({
		error: 'Esta ruta no existe'
	})
})


app.listen(port, function() {
	console.log('up and running')
})