const request = require('request')
const credentials = require('./credentials.js')

const coordenadas = function(ciudad, callback){
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ciudad+'.json?access_token=' 
	+ credentials.apikey2
	request({ url: url, json: true }, function(error, response) {
		if (error){
			callback('Service unavailable', undefined)
		} else if (response.body.features == undefined){
			callback(response.body.message, undefined)
		} else if(response.body.features[0] == undefined){
			callback('No se encontro la ciudad', undefined)
		} else{
			//console.log(response.body) //para probar errores
			const info = {
				longitud : response.body.features[0].center[0],
				latitud : response.body.features[0].center[1],
			}
			callback(undefined, info)
		}
	})
}

const clima = function(latitud, longitud, callback){
	const url = 'https://api.darksky.net/forecast/' + credentials.apikey + '/' + latitud + ',' 
	+ longitud + '?lang=es&units=si'
	request({ url: url, json: true }, function(error, response) {
		if (error){
			callback('Service unavailable', undefined)
		} else if (response.body.code == 400 ){
			callback(response.body.error, undefined)
		} else if (response.body == 'Forbidden\n' ){
			callback('Invalid apikey', undefined)
		} else {
			//console.log(response.body) //para probar errores
			const info = {
				resumen : response.body.hourly.summary,
				temperatura : response.body.currently.temperature,
				probLluvia : response.body.currently.precipProbability
			}
			callback(undefined, info)
		}
	})
}

module.exports = {
	clima: clima,
	coordenadas : coordenadas
}


