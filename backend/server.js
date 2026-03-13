import express from "express";
import cors from "cors";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());
app.use(express.json());

/*
=====================================================
AI ENGINES (SIMULATED)
=====================================================
*/

const aiEngines = [
 "chatgpt",
 "gemini",
 "perplexity"
];

/*
=====================================================
PATH SETUP
=====================================================
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
=====================================================
SERVE FRONTEND
=====================================================
*/

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
 res.sendFile(path.join(__dirname, "../frontend/dashboard.html"));
});

/*
=====================================================
PROMPT GENERATOR
=====================================================
*/

async function harvestPrompts(product){

 const prompts = []

 try{

  const googleURL =
  `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(product)}`

  const googleRes = await axios.get(googleURL,{
   timeout:10000
  })

  googleRes.data[1].forEach(p=>prompts.push(p))

 }catch{
  console.log("Google autocomplete failed")
 }

 try{

  const redditURL =
  `https://www.reddit.com/search.json?q=${encodeURIComponent(product)}&limit=20`

  const redditRes = await axios.get(redditURL,{
   timeout:10000,
   headers:{
    "User-Agent":"Mozilla/5.0"
   }
  })

  redditRes.data.data.children.forEach(post=>{
   prompts.push(post.data.title)
  })

 }catch{
  console.log("Reddit prompt generation failed")
 }

 const templates = [

  `best ${product}`,
  `top rated ${product}`,
  `best ${product} under 200`,
  `where to buy ${product}`,
  `best place to buy ${product}`,
  `best ${product} deals`,
  `what store sells ${product}`,
  `best ${product} reddit`

 ]

 templates.forEach(t=>prompts.push(t))

 return [...new Set(prompts)]

}

/*
=====================================================
SEARCH SOURCE 1 — DUCKDUCKGO
=====================================================
*/

async function queryDuckDuckGo(prompt){

 try{

  const url =
  `https://api.duckduckgo.com/?q=${encodeURIComponent(prompt)}&format=json`

  const res = await axios.get(url,{
   timeout:10000,
   headers:{
    "User-Agent":"Mozilla/5.0"
   }
  })

  const text =
   res.data.AbstractText ||
   res.data.RelatedTopics?.map(t=>t.Text).join(" ") ||
   ""

  return text

 }catch{

  console.log("DuckDuckGo failed:",prompt)

  return ""

 }

}

/*
=====================================================
SEARCH SOURCE 2 — WIKIPEDIA
=====================================================
*/

async function queryWikipedia(prompt){

 try{

  const url =
  `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(prompt)}&format=json`

  const res = await axios.get(url,{
   timeout:10000
  })

  const results = res.data.query.search

  const text = results.map(r=>r.snippet).join(" ")

  return text

 }catch{

  console.log("Wikipedia failed:",prompt)

  return ""

 }

}

/*
=====================================================
SEARCH SOURCE 3 — REDDIT
=====================================================
*/

async function queryReddit(prompt){

 try{

  const url =
  `https://www.reddit.com/search.json?q=${encodeURIComponent(prompt)}&limit=10`

  const res = await axios.get(url,{
   timeout:10000,
   headers:{
    "User-Agent":"Mozilla/5.0"
   }
  })

  const posts = res.data.data.children

  const text = posts.map(p=>p.data.title).join(" ")

  return text

 }catch{

  console.log("Reddit search failed:",prompt)

  return ""

 }

}

/*
=====================================================
MULTI-SOURCE QUERY ENGINE
=====================================================
*/

async function queryMultipleSources(prompt){

 const sources = [
  queryDuckDuckGo,
  queryWikipedia,
  queryReddit
 ]

 for(const source of sources){

  const response = await source(prompt)

  if(response && response.length > 0){
   return response
  }

 }

 return ""

}

/*
=====================================================
AI VISIBILITY AUDIT
=====================================================
*/

app.post("/api/audit", async (req,res)=>{

 const { store, product } = req.body

 console.log("Starting audit:",store,product)

 const prompts = (await harvestPrompts(product)).slice(0,20)

 console.log("Prompts generated:",prompts.length)

 const mentions = {}

 aiEngines.forEach(engine=>{
  mentions[engine] = 0
 })

 for(const prompt of prompts){

  console.log("Testing prompt:",prompt)

  for(const engine of aiEngines){

   const response = await queryMultipleSources(prompt)

   if(response.toLowerCase().includes(store.toLowerCase())){
    mentions[engine]++
   }

  }

 }

 const visibility = {}

 aiEngines.forEach(engine=>{
  visibility[engine] =
   Math.round((mentions[engine] / prompts.length) * 100)
 })

 console.log("Audit finished")

 res.json({
  store,
  product,
  promptsTested: prompts.length,
  mentions,
  visibility
 })

})

/*
=====================================================
SERVER START
=====================================================
*/

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
 console.log(`Server running on port ${PORT}`)
})
