'use strict';
'use underscore';

//     Underscore.js 1.9.1
//     http://underscorejs.org
//     (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
//list of bats
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
	'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
	'name': 'freemousse-bar',
	'pricePerHour': 50,
	'pricePerPerson': 20
}, {
	'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
	'name': 'solera',
	'pricePerHour': 100,
	'pricePerPerson': 40
}, {
	'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
	'name': 'la-poudriere',
	'pricePerHour': 250,
	'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [{
	'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
	'booker': 'esilv-bde',
	'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
	'time': 4,
	'persons': 8,
	'options': {
		'deductibleReduction': false
	},
	'price': 0,
	'commission': {
		'insurance': 0,
		'treasury': 0,
		'privateaser': 0
	}
}, {
	'id': '65203b0a-a864-4dea-81e2-e389515752a8',
	'booker': 'societe-generale',
	'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
	'time': 8,
	'persons': 30,
	'options': {
		'deductibleReduction': true
	},
	'price': 0,
	'commission': {
		'insurance': 0,
		'treasury': 0,
		'privateaser': 0
	}
}, {
	'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
	'booker': 'otacos',
	'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
	'time': 5,
	'persons': 80,
	'options': {
		'deductibleReduction': true
	},
	'price': 0,
	'commission': {
		'insurance': 0,
		'treasury': 0,
		'privateaser': 0
	}
}];

function priceOfEvent() {
	for (var i = 0; i < events.length; i++) {
		for (var j = 0; j < bars.length; j++) {
			if (bars[j].id == events[i].barId) {
				var timecomp = bars[j].pricePerHour * events[i].time
				var peoplecomp = bars[j].pricePerPerson * events[i].persons
				events[i].price = timecomp + peoplecomp
				if (events[i].deductibleReduction) {
					events[i].price += events[i].persons
				}
			}
		}
		if (events[i].persons >= 60) {
			events[i].price -= events[i].price * 0.5
		} else if (events[i].persons < 60 && events[i].persons >= 20) {
			events[i].price -= events[i].price * 0.3
		} else if (events[i].persons >= 10) {
			events[i].price -= events[i].price * 0.1
		}
	}
}

function payments() {
	for (var i = 0; i < events.length; i++) {
		var price = events[i].price
		var commission = (price - events[i].persons) * 0.3
		var insurance = commission * 0.5
		var treasury = events[i].persons
		var privateaser = commission - insurance - treasury
		events[i].commission.insurance = insurance
		events[i].commission.treasury = treasury
		events[i].commission.privateaser = privateaser
		if (events[i].deductibleReduction) {
			events[i].commission.privateaser += events[i].persons
		}
		for (var j = 0; j < actors.length; j++) {
			if (actors[j].eventId == events[i].id)
				for (var k = 0; k < actors[j].payment.length; k++) {
					switch (actors[j].payment[k].who) {

						case ('booker'):
							actors[j].payment[k].amount = price
							break

						case ('bar'):
							actors[j].payment[k].amount = price - commission
							break

						case ('insurance'):
							actors[j].payment[k].amount = insurance
							break

						case ('treasury'):
							actors[j].payment[k].amount = treasury
							break

						case ('privateaser'):
							actors[j].payment[k].amount = privateaser
							break
					}
				}
		}
	}
}
//list of actors for payment
//useful from step 5

const actors = [{
	'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
	'payment': [{
		'who': 'booker',
		'type': 'debit',
		'amount': 0
	}, {
		'who': 'bar',
		'type': 'credit',
		'amount': 0
	}, {
		'who': 'insurance',
		'type': 'credit',
		'amount': 0
	}, {
		'who': 'treasury',
		'type': 'credit',
		'amount': 0
	}, {
		'who': 'privateaser',
		'type': 'credit',
		'amount': 0
	}]


}, {
	'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
	'payment': [{
		'who': 'booker',
		'type': 'debit',
		'amount': 0
	}, {
		'who': 'bar',
		'type': 'credit',
		'amount': 0
	}, {
		'who': 'insurance',
		'type': 'credit',
		'amount': 0
	}, {
		'who': 'treasury',
		'type': 'credit',
		'amount': 0
	}, {
		'who': 'privateaser',
		'type': 'credit',
		'amount': 0
	}]
}, {
	'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
	'payment': [{
		'who': 'booker',
		'type': 'debit',
		'amount': 0
	}, {
		'who': 'bar',
		'type': 'credit',
		'amount': 0
	}, {
		'who': 'insurance',
		'type': 'credit',
		'amount': 0
	}, {
		'who': 'treasury',
		'type': 'credit',
		'amount': 0
	}, {
		'who': 'privateaser',
		'type': 'credit',
		'amount': 0
	}]
}];


priceOfEvent();
payments();
console.log(bars);
console.log(events);
console.log(actors);