import express from "express";
import cors from "cors";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());
app.use(express.json());



const aiEngines = [
 "chatgpt",
 "gemini",
 "perplexity"
];



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
 res.sendFile(path.join(__dirname, "../frontend/dashboard.html"));
});



function generateProducts(){

 const categories = {

  tools:[
   {brand:"Estwing", product:"Framing Hammer"},
   {brand:"Stanley", product:"Claw Hammer"},
   {brand:"DeWalt", product:"Steel Hammer"},
   {brand:"Milwaukee", product:"Construction Hammer"}
  ],

  electronics:[
   {brand:"Apple", product:"iPhone 15"},
   {brand:"Samsung", product:"Galaxy S24"},
   {brand:"Sony", product:"WH-1000XM5 Headphones"},
   {brand:"Dell", product:"XPS 13 Laptop"}
  ],

  appliances:[
   {brand:"Dyson", product:"V15 Vacuum"},
   {brand:"Ninja", product:"Air Fryer"},
   {brand:"Instant Pot", product:"Pressure Cooker"}
  ],

  sports:[
   {brand:"Nike", product:"Air Zoom Pegasus"},
   {brand:"Adidas", product:"Ultraboost"},
   {brand:"Wilson", product:"Pro Staff Tennis Racket"}
  ]

 }

 const stores = [
  "Amazon",
  "Walmart",
  "Target",
  "Best Buy",
  "Home Depot",
  "Lowe's"
 ]

 let id = 1
 const products = []

 for(const category in categories){

  categories[category].forEach(p=>{

   products.push({

    id:id++,

    name:`${p.brand} ${p.product}`,
    brand:p.brand,
    category:category,
    store:stores[Math.floor(Math.random()*stores.length)],
    price:Math.floor(Math.random()*900)+50,
    rating:(Math.random()*2+3).toFixed(1),
    description:`${p.brand} ${p.product} designed for professional and consumer use`

   })

  })

 }

 return products
}

const products = generateProducts()



async function harvestPrompts(product){

 const prompts = []

 try{

  const googleURL =
  `https://suggestqueries.google.com/complete/search?client=firefox&q=${product}`

  const googleRes = await axios.get(googleURL)

  googleRes.data[1].forEach(p=>prompts.push(p))

 }catch{}

 try{

  const redditURL =
  `https://www.reddit.com/search.json?q=${product}&limit=20`

  const redditRes = await axios.get(redditURL)

  redditRes.data.data.children.forEach(post=>{
   prompts.push(post.data.title)
  })

 }catch{}

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



async function queryAI(engine, prompt){

 try{

const encodedPrompt = encodeURIComponent(prompt)

const url = `https://api.duckduckgo.com/?q=${encodedPrompt}&format=json`

  const res = await axios.get(url, {
   timeout: 5000,
    headers: {
     "User-Agent": "Mozilla/5.0 (NOLAlytics AI Analyzer)"
 }
  })

  const text =
   res.data.AbstractText ||
   res.data.RelatedTopics?.map(t=>t.Text).join(" ") ||
   ""

  return text

 }
 
 
catch(err){
 console.log("Query failed:", prompt)
 console.log("Error:", err.message)
 return ""
}

}



app.post("/api/audit", async (req,res)=>{

 const { store, product } = req.body

 const prompts = await harvestPrompts(product)

 const mentions = {}

 aiEngines.forEach(engine=>{
  mentions[engine] = 0
 })

 for(const prompt of prompts){

  for(const engine of aiEngines){

   const response = await queryAI(engine, prompt)

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

 res.json({
  store,
  product,
  promptsTested: prompts.length,
  mentions,
  visibility
 })

})


app.get("/api/products",(req,res)=>{
 res.json(products)
})

app.get("/api/products/category/:category",(req,res)=>{

 const category = req.params.category

 const filtered = products.filter(
  p => p.category === category
 )

 res.json(filtered)

})



const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
 console.log(`Server running on port ${PORT}`)
})
