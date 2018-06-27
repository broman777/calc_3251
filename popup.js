document.addEventListener('DOMContentLoaded', function() {
    var calculateButton = document.getElementById('calculate'),
        usd = document.getElementById('usd');
    usd.addEventListener('change', function(e) {
      var price = document.getElementById("price"),
          coef = parseFloat(document.getElementById("coef").value),
          val = (e.target.checked) ? parseInt(price.value) * coef : parseInt(price.value) / coef;
      price.value = parseInt(val);
    });
    calculateButton.addEventListener('click', function() { 
    var calc = {
    	coef: parseFloat(document.getElementById("coef").value),
    	vol: parseInt(document.getElementById("vol").value) || 0,
    	price: parseFloat(document.getElementById("price").value) || 0,
    	type: parseInt(document.getElementById("type").value),
    	age: parseInt(document.getElementById("age").value) || 0,
    	country: parseInt(document.getElementById("country").value)
    };
    if (usd.checked) calc.price = calc.price / calc.coef;
    
    var result = {
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

  result.text = '<li><b>Итого: ';
  if (!usd.checked) result.text += Math.round(result.total+calc.price)+'€';
  else result.text += Math.round((result.total+calc.price)*calc.coef)+'$';
  result.text += '</b></li>';

  if (result.total) {
    result.text += '<li>Таможенные платежи: '+Math.round(result.total)+' €</li>';
    if (result.tax) result.text += '<li>Ввозная пошлина: '+Math.round(result.tax)+' €</li>';
    result.text += '<li>Акциз: '+Math.round(result.excise*calc.vol)+' €</li>';
    result.text += '<li>НДС: '+Math.round(result.vat)+' €</li>';
  }
  document.getElementById("results").innerHTML = result.text;
  }, false);
}, false);