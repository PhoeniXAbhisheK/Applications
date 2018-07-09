const url = " http://free.currencyconverterapi.com/api/v5/currencies";
const list = document.getElementById("currencyFrom");

createElement(name, symbol, id){
   return `<option value="${id}">${symbol}, ${name}</option>`;
}

$.get(url, function(data) {
  console.log(data.results);
  for (currency in data.results) {
    if (data.results.hasOwnProperty(currency)) {
      // console.log(data.results[i].currencyName);
      list.innerHTML += createElement(
        data.results[i].currencyName,
        data.results[i].currencySymbol,
        data.results[i].id
      );
    }
  }
});
