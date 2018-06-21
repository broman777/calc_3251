document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('calculate');
    checkPageButton.addEventListener('click', function() { 
  var calc = {
  	coef: parseFloat(document.getElementById("coef").value) || 1.15,
  	vol: parseInt(document.getElementById("vol").value) || 0,
  	price: parseFloat(document.getElementById("price").value) || 0,
  	type: parseInt(document.getElementById("type").value),
  	age: parseInt(document.getElementById("age").value) || 0,
  	country: parseInt(document.getElementById("country").value)
  };
  result = {
  	tax: 0,
  	excise: 0,
  	vat: 0,
  	total: calc.price
  };
  if (calc.type != 0) { // если бенз/дизель

    // рассчет акциза
	  if (calc.country == 1) result.tax = calc.price*0.073;
	  else if (calc.country == 2) result.tax = calc.price*0.1;

    // рассчет ндс
    if (calc.vol <= 2500) { // маленький объем
      if (calc.type == 2) result.excise = 2.441;
      else result.excise = 2.209;
    }
    else { // более 2500 куб. дм.
      if (calc.type == 2) result.excise = 4.985;
      else result.excise = 4.715;
    }
    if (calc.age <= 8 ) { // если авто свежее и вписывается в нормы
      if (calc.type == 2) { // если бенз
        if (calc.vol <= 1000) result.excise = 0.102;
        else if (calc.vol > 1000 && calc.vol <= 1500) result.excise = 0.063;
        else if (calc.vol > 1500 && calc.vol <= 2500) result.excise = 0.267;
        else if (calc.vol > 2500 && calc.vol <= 3000) result.excise = 0.276;
      }
      else { // если дизель
        if (calc.vol <= 1000) result.excise = 0.103;
        else if (calc.vol > 1000 && calc.vol <= 2500) result.excise = 0.327;
      }
    }
    result.vat = (calc.vol*result.excise+result.tax+calc.price)*0.2;
  }
  result.total = result.vat+result.excise*calc.vol+result.tax;
  console.log(calc, result);
  document.getElementById("result").innerText = Math.round(result.total+calc.price);
  document.getElementById("resultUsd").innerText = Math.round((result.total+calc.price)*calc.coef);
  document.getElementById("resPrice").innerText = Math.round(result.total);
  document.getElementById("resTax").innerText = Math.round(result.tax);
  document.getElementById("resExc").innerText = Math.round(result.excise*calc.vol);
  document.getElementById("resVat").innerText = Math.round(result.vat);
  }, false);
}, false);