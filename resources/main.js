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
  $('.search').click(function() { $('#search-input').focus(); });
});

function search(query) {
  news = [];
  $('#resultBox').html('');
  $.ajax({
    url:'https://script.google.com/macros/s/AKfycbw3ppeWlO0ZRUEyxptRmM5QQb_-nvLtLZDQ-C13bKXFwwKKl9M/exec?url=' + encodeURIComponent('https://news.google.com/rss/search?q=' + query + '&hl=ko&gl=KR&ceid=KR:ko') + '&callback=?',
    type: "GET",
    dataType: 'json',
    cache: false,
    success: function (response) {
      response = $.parseXML(response.result);
      var i = 0;
      $(response).find("item").each(function () {
        var el = $(this);
        news[i] = [];
        news[i][0] = el.find("title").text();
        news[i][1] = el.find("link").text();
        i++;
      });
      for(var i in news) {
        if(!(i % 10)) $('#resultBox').append('<div class="page" id="pg_' + (i / 10) + '" ' + (i / 10 ? 'style="display: none;"' : '') + '></div>');
        $('#pg_' + Math.floor(i / 10)).append( (Number(i) + 1) + '.&nbsp;&nbsp;<a href="' + news[i][1] + '">' + news[i][0] + '</a><br><span style="line-height: 50%"><br></span>');
      }
      $('#resultBox').append('<div id="pageControl"><br></div>');
      for(var i = 0; i < (news.length / 10); i++) $('#pageControl').append('<span class="paging" id="paging_' + (i + 1) + '">[' + (i + 1) + ']</span>&nbsp;&nbsp;&nbsp;');
      $('.paging').click(function() {
        console.log($(this).attr('id').replace(/[^0-9]/g, ''));
        $('.page').css('display', 'none');
        $('#pg_' + (Number($(this).attr('id').replace(/[^0-9]/g, '')) - 1)).css('display', 'block');
      });
    }
  });
}
