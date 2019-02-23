


var api_key = "kyeC0RGkPmBMIGQlCdAz9NwNSILww3Aj";
var searchTerm = "";
var startYear = "1000";
var endYear = "2020";
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&api-key=" + api_key;
var articleno = 1; //take from dropdown box later


function generaterArticle(input) {
    for (var i = 0; i < articleno; i++) {     //appending article info to div
        var newDiv = $("<div>")
        newDiv.css({"border":"1px solid #C0C0C0"})
        newDiv.addClass("p-3")
        newDiv.append("<p>"+i+1+" "+input.response.docs[i].headline.main+"</p>");
        newDiv.append("<p>"+input.response.docs[i].byline.original+"</p>")
        newDiv.append("<p>"+input.response.docs[i].section_name)+"</p>";
        newDiv.append("<p>"+input.response.docs[i].pub_date+"</p>");
        newDiv.append("<a href= '"+ input.response.docs[i].web_url+"' target='blank'>"+input.response.docs[i].web_url+"</a>");
        $("#articleDisplay").append(newDiv)
    }
}

function reset(){
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&api-key=" + api_key;
}


$("#runSearch").on("click", function () {    
    console.log($("#exampleFormControlSelect1 option:selected").html());
    articleno = $("#exampleFormControlSelect1 option:selected").html();
    searchTerm = $("#search").val();
    reset();
    if( $("#start").val()!=""){
        startYear = $("#start").val()
        queryURL += "&begin_date="+startYear+"0101";
    }else if($("#end").val()!=""){
        endYear = $("#end").val()
        queryURL += "&end_date="+endYear+"1231";
    }
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        generaterArticle(response);
    });
});

$("#clearSearch").on("click", function () {
    $("#articleDisplay").empty();
});




