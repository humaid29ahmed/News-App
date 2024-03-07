import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import moment from "moment"; // This npm package is used for display the duration of each post.

// This server uses New York Times Public API for displaying the data .

const app = express();
const port = 3000;
const API_URL = 'https://api.nytimes.com/svc/topstories/v2/'; // This url is used to hit the endpoint of world news API.
const api_url = 'https://api.nytimes.com/svc/search/v2/';  // This url is used to hit the endpoint of search API.
const API_KEY = "2hbGCkPqPE60yGjYA7SYOvPwdhMIYoAn" ;    

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",async(req,res)=>{
    // This get function is used to call the latest world news new Api
    try{
const result = await axios.get(`${API_URL}world.json?api-key=${API_KEY}`);
res.render("index.ejs",{content:(result.data).results, moment:moment}); //Sending the JSON Object and Moment package to index.ejs.
    } catch(error){

        console.log(error.response.data); // Display the error message on the console or terminal.
    }
});

app.post("/search",(req,res)=>{
    // This post function is used to display the search.ejs page.
    res.render("search.ejs");
})

app.post("/Search_Page", async(req,res)=>{
    // This post function is used to take the "Keyword" and "news desk" data to fetch the JSON file from the Search API.
    try{
     const keyword = req.body["keywords"];
     const news_desk = req.body["news_desk"];
     const response = await axios.get(`${api_url}articlesearch.json?q=${keyword}&fq=news_desk:(${news_desk})&page=0&api-key=${API_KEY}`);
     res.render("search.ejs", {data:(response.data).response.docs , moment:moment}); //Sending the JSON Object and Moment package to search.ejs.
    }catch(error){
        console.log(error.response.data);
    }
});

app.listen(port,()=>{
console.log(`The server is listening on ${port}.`);
});