/*
 * Lab 05 - Quote web API (XMLHttpRequest)
 * 
 */


window.addEventListener("DOMContentLoaded", function () {

   document.querySelector("#fetchQuotesBtn").addEventListener("click", function () {

      // Get values from drop-downs
      const topicDropdown = document.querySelector("#topicSelection");
      const selectedTopic = topicDropdown.options[topicDropdown.selectedIndex].value;
      const countDropdown = document.querySelector("#countSelection");
      const selectedCount = countDropdown.options[countDropdown.selectedIndex].value;

      // Get and display quotes
      fetchQuotes(selectedTopic, selectedCount);

   });

});





// https://wp.zybooks.com/quotes.php?topic=love&count=3
function fetchQuotes(topic, count) {

   // Create XMLHttpRequest URL (topic and count in the query string)
   let req_url = `https://wp.zybooks.com/quotes.php?topic=${topic}&count=${count}`;
   let xhttp = new XMLHttpRequest();   // Create an XMLHttpRequest object
   xhttp.responseType = 'json';        // Set the response type to 'json'
   xhttp.addEventListener('load', responseReceivedHandler);
   // Send a request
   xhttp.open("GET", req_url, true); 
   xhttp.send();
}

// TODO: Add responseReceivedHandler() here
function responseReceivedHandler() {

   let data = this.response;

   let html = "";

   if(data.hasOwnProperty('error')) {
      html = data['error'];
   } else {
      data.forEach(function(value, index) {
         let quote = value['quote'];
         let author = value['source'];
         html += `<li>${quote} - ${author}</li>`;
      });
      html = `<ol>${html}</ol>`;
   }

   document.querySelector("#quotes").innerHTML = html;

}
