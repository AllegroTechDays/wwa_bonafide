'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const axios = require('axios')
const app = express()

const cors = require('cors');
app.use(cors());
app.options('*', cors());

const url = "https://api.rowerowapolska.pl/public/api/poi"

var step = 0
var response;

var allowedWords = ["zepsuty", "popsuty", "pomoc", "awaria", "ok", "dzieki", "cze", "dzięki", "stadion", "pałac", "Pałac", "Kultury", "palac"]

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
	res.send('Witaj świecie')
	step = 0
})

app.post("/question", (req, res) => {
	let rb = req.body;
	var resp = dialog(rb.q, res)
	res.status(200).json({
		ans: resp
	})
	
});

app.post("/message", (req, res) => {
	let rb = req.body;
	let userQuery = rb.message;
	let q = `location[longitude_from]=${rb.longitude_from}&location[longitude_to]=${rb.longitude_to}&location[latitude_to]=${rb.latitude_to}&location[latitude_from]=${rb.latitude_from}&page=${rb.page}&type=${rb.type}`
	request({
	    url: url+'?'+q,
	    method: 'GET'
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
		}
		console.log(body)
    })

	
  });

 function postToAllegroAPI(rb) {
	let q = `location[longitude_from]=${rb.longitude_from}&location[longitude_to]=${rb.longitude_to}&location[latitude_to]=${rb.latitude_to}&location[latitude_from]=${rb.latitude_from}&page=${rb.page}&type=${rb.type}`
	request({
	    url: url+'?'+q,
	    method: 'GET'
	}, function(error, response, body) {
		
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
		}
		var st = JSON.parse(response.body).results[0]
		console.log(st)
    })
 }

// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})

function dialog(msg) {
	if(checkMsg(msg) && step == 0) {
		step++
		return 'Potrzebujesz pomocy? Powiedz mi gdzie jesteś!'
	} 

   if(checkMsg(msg) && step == 1)	{
		step++
		postToAllegroAPI({
			"latitude_from" : 52.34164003345559,
			"latitude_to" : 52.617648755755944,
			"longitude_from" : 16.657728728241636,
			"longitude_to" : 17.932142790741636,
			"page" : 15,
			"type" : "bicycle_parking"
		})
		if(msg == palac)
		//return `${response[0]} + ${response[1]} `
		return 'https://www.google.com/maps/dir/PGE+Narodowy,+aleja+Poniatowskiego+1,+03-901+Warszawa/Serwis+rowerowy+PORT,+Solec,+Warszawa/@52.2325732,21.0316886,14z'
	}

    if(checkMsg(msg) && step == 2)	{
		step++
		return 'Fajnie było pomóc!'
	}
		
	else {
		return 'Nie znam tego polecenia, jeszcze się uczę!'

	}
}

function checkMsg(msg) {
	var flag = false;
	for(var i = 0; i < allowedWords.length; i++) {
		if(allowedWords[i] == msg) {
			flag = true;
		}
	}
		return flag;
	}

