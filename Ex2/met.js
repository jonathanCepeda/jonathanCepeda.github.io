const request = require('request')

const metodoMet = function(busqueda,callback){
	const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + busqueda
	request({ url: url, json: true }, function(error, response) {
		if (error){
			callback('Service unavailable', undefined)
		} else{
			const info = {
				total : 1,
				objectID : 1
			}
			callback(undefined, info)
		}
	})
}

const metodoMet2 = function(objeto,callback){
	const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/objectID' + objeto
	request({ url: url, json: true }, function(error, response) {
		if (error){
			callback('Service unavailable', undefined)
		} else{
			const info = {
				artist: response.body.artistDisplayName,
				title: response.body.title,
				year: response.body.objectEndDate,
				technique: response.body.medium,
				metUrl: response.body.objectURL
			}
			callback(undefined, info)
		}
	})
}

module.exports = {
	metodoMet: metodoMet,
	metodoMet2: metodoMet2
}