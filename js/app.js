var searchQuery = "";
var searchHTML = '<form id="form1" action="">';
searchHTML += '<input id="text-input" placeholder="Search" type="search" class="search">';
// searchHTML += '<input type="submit" value="Submit">';
searchHTML += '</form>';

var magHTML = '<i id="mag" class="fa fa-search" aria-hidden="true"></i>'

function contentBuilder(data) {
  var html = "<div id='content-box'>";
  for (i=0; i < data.query.search.length; i++) {
    html += "<div class='search-result'><h2 class='title'>" + data.query.search[i].title + "</h2>"; 
    html += "<p class='snippet'>" + data.query.search[i].snippet + "</p></div>";
  }
  html += "</div>"
  return html;
}

// turn magnifying glass into search field
$('#mag').on('click', function(){
  $('#directions').html("");
	$(this).parent().html(searchHTML);
  
  // get search text value for request to Wiki
  $('#form1').submit(function(event){
    event.preventDefault();
    searchQuery = $("#text-input").val();
    console.log(searchQuery);
    $.ajax({
      url: "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=" + encodeURIComponent(searchQuery),
      success: function(results){
        // display results using function
        $('#results').html(contentBuilder(results));
        
        // attach link to each result
        $('.search-result').each(function(index){
          $(this).on("click vclick", function(event){
            window.open("https://en.wikipedia.org/wiki/" + encodeURIComponent(results.query.search[index].title));
          });
        }); // end 'each' method
      }, // end success callback
      error: function(error) {
        console.log(error);
      }
    }) // end AJAX
  });
});
 


                 




