const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const expand = () => {
  searchBtn.classList.toggle("close");
  input.classList.toggle("square");
};
searchBtn.addEventListener("click", expand);

$(function() {
  if(Cookies.get('keyword')) $('#search-input').val(Cookies.get('keyword'));
  $('#search-input').keypress(function(e) { if(e.which == 13) search($('#search-input').val()); });
});

function search(query) {
  $.ajax({
  contentType: "application/x-www-form-urlencoded;charset=euc-kr",
  url:'https://script.google.com/macros/s/AKfycbz3L8IsK35IT2FUNMR8V4KfU2tsNpVWJxwGdOt3Nngz1ANhUac/exec?url=' + encodeURIComponent('https://www.google.com/search?q=' + query + '&tbm=nws') + '&callback=?',
  type: "GET",
  dataType: 'json',
  cache: false,
  success: function (response) {
    console.log(response);
    var html = new DOMParser().parseFromString(response.result, "text/html").getElementsByTagName('g');
    console.log(html);
    /*
    for(var i = 0; i < html.length; i++) {
      data[i] = Object.values(html[i].getElementsByTagName('td'));
    }
    data.splice(0, 2);
    for(var i = 0; i < data.length; i++) {
      data[i] = [data[i][0].textContent, data[i][5].textContent, data[i][12].textContent];
      str += '<option value=' + data[i][0] + '>' + data[i][0] + '</option>';
    }
    */
  }
});
}
