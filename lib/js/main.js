//TO DO
//add which is best to go with (CS cash, CS trade, buylist cash, buylist trade)


let card = {
	offerPrice: 12.62,
	offerPercent: 85, 
	buylistPrice: 6.30,
	buylistPercent: 0,
	buylistTrade: 0,
	shippingPrice: .55, 
	csTrade: 0,
	csCash: 0, 
	valueLost: 0,
	listPrice: 0
};

let csRake = 0.99;
let csRakeDisplay = '1%';
let cashoutRake = 0.90;

console.log(card);

document.getElementById("csRakeDisplay").innerHTML = csRakeDisplay;

function getCardDataAndCalc() {

	getData();
	calculate(card);	
	printData();

}

function getData() {
	card.offerPrice = document.getElementById("offerPrice").value;
	card.offerPercent = document.getElementById("offerPercent").value;
	card.shippingPrice = document.getElementById("shippingPrice").value;
	card.buylistPrice = document.getElementById("buylistPrice").value;
	card.buylistPercent = document.getElementById("buylistPercent").value;
}

function printData() {
	//top table
	document.getElementById("printOfferPrice").innerHTML = '$' + card.offerPrice;
	document.getElementById("printOfferPercent").innerHTML = card.offerPercent + '%';
	document.getElementById("printShippingPrice").innerHTML = '$' + card.shippingPrice;
	document.getElementById("printBuylistPrice").innerHTML = '$' + card.buylistPrice;
	document.getElementById("printBuylistPercent").innerHTML = card.buylistPercent + '%';

	//lower table
	document.getElementById("printBuylistPrice2").innerHTML = '$' + card.buylistPrice;
	document.getElementById("printCsTrade").innerHTML = '$' + card.csTrade;
	document.getElementById("printCsCash").innerHTML = '$' + card.csCash;
	document.getElementById("printBuylistTrade").innerHTML = '$' + card.buylistTrade;
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
	card.csTrade = (card.offerPrice * csRake) - card.shippingPrice;
	card.csTrade = card.csTrade.toFixed(2);

	card.csCash = ((card.offerPrice * csRake) * cashoutRake) - card.shippingPrice;
	card.csCash = card.csCash.toFixed(2);

	card.buylistTrade = (card.buylistPercent/100 + 1) * card.buylistPrice;
}

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
