//TO DO
//add which is best to go with (CS cash, CS trade, buylist cash, buylist trade)


let card = {
	offerPrice: 0,
	offerPercent: 0, 
	buylistPrice: 0,
	buylistPercent: 0,
	buylistTrade: 0,
	shippingPrice: 0, 
	csTrade: 0,
	csCash: 0, 
	transactionRake: 0,
	cashoutRake: 0,
	valueLost: 0,
	listPrice: 0
};

let csRake = 0.99;
let cashoutRake = 0.90;

console.log(card);

function getCardDataAndCalc() {

	getData();
	calculate(card);	
	printData();

}

function calcShippingPrice() {

	card.shippingPrice = 0;
	let stamp = document.getElementById('stamp').checked;
	let ounce = document.getElementById('ounce').checked;
	let certified = document.getElementById('certified').checked;

	if (stamp) {
		card.shippingPrice = card.shippingPrice + 0.55;
	}

	if(ounce == true && stamp == false) {
		document.getElementById('ounce').checked;
		//fix so that checking ounce checks stamp as well.

	}

	if (ounce == true && stamp == true) {
		card.shippingPrice =card.shippingPrice + 0.15;
	}

	if (stamp == true && ounce == true && certified == true) {

		alert('You cannot select all 3. Select either Certified Mail only or a combination of Stamp and Additional Ounce');
		return;
	}

	if (certified) {
		card.shippingPrice = 4.10;
	}

	document.getElementById('printShippingPrice').innerHTML = card.shippingPrice.toFixed(2);
	document.getElementById('shippingPrice').value = card.shippingPrice.toFixed(2);

}

function getData() {
	card.offerPrice = document.getElementById('offerPrice').value;
	card.offerPercent = document.getElementById('offerPercent').value;
	card.shippingPrice = document.getElementById('shippingPrice').value;
	card.buylistPrice = document.getElementById('buylistPrice').value;
	card.buylistPercent = document.getElementById('buylistPercent').value;
}

function printData() {
	//top table
	document.getElementById('printOfferPrice').innerHTML = '$' + card.offerPrice;
	document.getElementById('printOfferPercent').innerHTML = card.offerPercent + '%';
	document.getElementById('printShippingPrice').innerHTML = '$' + card.shippingPrice;
	document.getElementById('printBuylistPrice').innerHTML = '$' + card.buylistPrice;
	document.getElementById('printBuylistPercent').innerHTML = card.buylistPercent + '%';

	//lower table
	document.getElementById('printBuylistPrice2').innerHTML = '$' + card.buylistPrice;
	document.getElementById('printCsTrade').innerHTML = '$' + card.csTrade;
	document.getElementById('printTransactionRake').innerHTML = '$' + card.transactionRake;
	document.getElementById('printCashoutRake').innerHTML = '$' + card.cashoutRake;
	document.getElementById('printCsCash').innerHTML = '$' + card.csCash;
	document.getElementById('printBuylistTrade').innerHTML = '$' + card.buylistTrade;

}

function calculate(card) {
	calcValue(card);

	if(card.buylistPrice >= 0) {
		calcBuylistDiff(card);
	}

	if(card.offerPercent > 0) {
		card.listPrice = card.offerPrice / (card.offerPercent/100);
		card.listPrice = card.listPrice.toFixed(2)
	}
}

function calcValue(card) {
	
	card.transactionRake = card.offerPrice - (card.offerPrice * csRake);
	card.transactionRake = card.transactionRake.toFixed(2);

	card.csTrade = (card.offerPrice * csRake) - card.shippingPrice;
	card.csTrade = card.csTrade.toFixed(2);

	card.cashoutRake = card.offerPrice - ((card.offerPrice * csRake) * cashoutRake);
	card.cashoutRake = card.cashoutRake.toFixed(2);

	card.csCash = ((card.offerPrice * csRake) * cashoutRake) - card.shippingPrice;
	card.csCash = card.csCash.toFixed(2);

	card.buylistTrade = (card.buylistPercent/100 + 1) * card.buylistPrice;

}

//not using this yet, but we will

function calcBuylistDiff(card) {
	if(card.buylistPrice > card.csTrade) {
		card.valueLost = card.buylistPrice - card.csTrade;
	} else {
		card.valueLost = card.csTrade -card.buylistPrice;
	}

	card.valueLost = card.valueLost.toFixed(2);
}



// pass in a value from card sphere - the offer price of the card
// pass in a value for highest buylist (with or without modifier)
// pass in an option for 10% cash-out, assumes minimum $100 in account
// value for shipping price
