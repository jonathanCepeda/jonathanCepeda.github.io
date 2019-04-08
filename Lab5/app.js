const darksky = require('./darksky.js')

const ciudad = 'Monterrey'
const longitud = -100.309
const latitud = 25.6714

darksky.coordenadas(ciudad, function(error, response){
	if (error){
		console.log(error)
	} else {
		//console.log(response)
		darksky.clima(response.latitud, response.longitud, function(error, response){
			if (error){
				console.log(error)
			} else {
				//console.log(response)
				console.log('Clima en ' + ciudad + ':\n' + response.resumen + ' La temperatura actual es de ' +
					response.temperatura + '°C, con ' + response.probLluvia + '% de probabilidad de lluvia')
			}
		})
	}
})

		