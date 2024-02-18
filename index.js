console.log("script loaded!")

async function sendPrompt2()
{
    to_send = document.getElementById("userPrompt").value;
    let response = await fetch("http://127.0.0.1:5000/", {
        method: "POST",
        body: JSON.stringify({
          "data": to_send,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })

    let result = await response.json()
    
    document.getElementById("userPrompt").value = "";
    console.log(to_send);
    //console.log(response)
    //console.log(result)
    console.log(result)
    showInformation(result)
    //getGif(result)
}

function showInformation(result)
{
    keywords = result.keywords
    named_entities = result.named_entities
    sentiment = result["sentiment"]
    console.log(sentiment)
    switch(sentiment)
    {
        case 1:
            sentiment = "happy"
            break;
        case 0:
            sentiment = "neutral"
            break;
        case -1:
            sentiment = "sad"
            break;
    }
    getGif(sentiment, keywords, named_entities);
    
    html_out = "<p>Sentiment: </p><ul><li> " + sentiment + "</li></ul><p>Keywords:</p><ul>";
    for(let i = 0; i < keywords.length; i++)
    {
        html_out += '<li>' + keywords[i] + "</li>"
    }
    html_out += "</ul><p>Named Entities:</p><ul>"
    for(let i = 0; i < named_entities.length; i ++)
    {
        html_out += '<li>' + named_entities[i] + '</li>'
    }
    html_out += '</ul>';

    document.getElementById("caption").innerHTML = result["caption"];
    document.getElementById("sentiment").innerHTML = html_out;
}

function getGif(sentiment, keywords, named_entities)
{
    search_term = "cat-"+sentiment+"-";
    
    for(let i = 0; i < keywords.length; i++)
    {
        search_term += "-" + keywords[i]
    }
    for(let i = 0; i < named_entities.length; i++)
    {
        search_term += "-" + named_entities[i]
    }
    
    grab_data(search_term);
}

function httpGetAsync(theUrl, callback)
{
    // create the request object
    var xmlHttp = new XMLHttpRequest();

    // set the state change callback to capture when the response comes in
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }

    // open as a GET call, pass in the url and set async = True
    xmlHttp.open("GET", theUrl, true);

    // call send with no params as they were passed in on the url string
    xmlHttp.send(null);

    return;
}

// callback for the top 8 GIFs of search
function tenorCallback_search(responsetext)
{
    // Parse the JSON response
    var response_objects = JSON.parse(responsetext);

    top_10_gifs = response_objects["results"];

    // load the GIFs -- for our example we will load the first GIFs preview size (nanogif) and share size (gif)

    document.getElementById("gif_box").src = top_10_gifs[0]["media_formats"]["nanogif"]["url"];

}


// function to call the trending and category endpoints
function grab_data(search_term)
{
    // set the apikey and limit
    var apikey = "AIzaSyB-WCAXFCvcOJGi-8MK6wEqJUTX3X8inNw";
    var clientkey = "my_test_app";
    var lmt = 8;

    // using default locale of en_US
    var search_url = "https://tenor.googleapis.com/v2/search?q=" + search_term + "&key=" +
            apikey +"&client_key=" + clientkey +  "&limit=" + lmt;

    httpGetAsync(search_url,tenorCallback_search);

    // data will be loaded by each call's callback
    return;
}

