console.log("connected");
var slider = document.getElementById("tweetsrange");
var output = document.getElementById("numoftwtsinput");
var searchtrend = document.getElementById("searchtrend");
var toptweetstab = document.getElementById("nav-toptweets");
output.innerHTML = slider.value;
slider.addEventListener(
  "input",
  () => {
    output.value = slider.value;
  },
  false
);
output.addEventListener("input", () => {
  slider.value = output.value;
});

function runAnalyzer() {
  fetch("/analyze?searchtrend=" + searchtrend.value + "&ntwts=" + slider.value)
    .then(response => response.json())
    .then(jsondata => {
      console.log(jsondata);
      console.log(jsondata[0].text);
      var tweets = "";
      for (var i = 0; i < 20; i++) {
        tweets += jsondata[i].text;
      }
      toptweetstab.textContent = tweets;
      return;
    });
  return false;
}

document.onreadystatechange = function() {
  var state = document.readyState;
  if (state == "complete") {
    setTimeout(function() {
      document.getElementById("interactive");
      document.getElementById("load").style.visibility = "hidden";
    }, 1500);
  }
};
