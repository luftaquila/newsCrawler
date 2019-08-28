if(browserVersionCheck().version > 0 && browserVersionCheck().version < 12)
  alert('인터넷 익스플로러는 지원하지 않는 오래된 브라우저입니다.\n크롬, 파이어폭스, 오페라, 엣지 등 다른 브라우저를 사용하십시오.');
function browserVersionCheck() {
  var word;
  var agent = navigator.userAgent.toLowerCase();
  var info = {  name: "N/A" , version: -1  };
  if (navigator.appName == "Microsoft Internet Explorer") word = "msie ";
  else if (agent.search("trident") > -1) word = "trident/.*rv:";
  else if (agent.search("edge/") > -1) word = "edge/";
  else return info;
  var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" );
  if (reg.exec(agent) != null) {
    info.version = parseFloat(RegExp.$1 + RegExp.$2);
    info.name = (word == "edge/") ? "Edge" : "IE";
  }
  return info;
}
