import express from "express"
import cors from "cors"
import axios from "axios"

import path from "path";
import { fileURLToPath } from "url";



const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("NOLAlytics API is running");
});

/*
=====================================================
GENERATED PRODUCT DATABASE
(No JSON files required)
=====================================================
*/

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

    description:`${p.brand} ${p.product} designed for professional and consumer use`,

    specs:{
     quality:"premium",
     durability:"high",
     popularity:"top rated"
    }

   })

  })

 }

 return products

}

const products = generateProducts()

/*
=====================================================
AUDIT STATUS TRACKER
=====================================================
*/

let auditStatus = {
 progress:0,
 currentPrompt:"",
 completed:false,
 results:null
}

/*
=====================================================
PROMPT GENERATION
=====================================================
*/

async function getGooglePrompts(keyword){

 try{

 const url =
 `https://suggestqueries.google.com/complete/search?client=firefox&q=${keyword}`

 const res = await axios.get(url)

 return res.data[1]

 }catch{

 return []

 }

}

function expandPrompts(keyword){

 return [

  `best ${keyword} brands`,
  `top rated ${keyword}`,
  `what ${keyword} do professionals recommend`,
  `best ${keyword} under 100`,
  `where can I buy ${keyword}`

 ]

}

async function harvestPrompts(keyword){

 const google = await getGooglePrompts(keyword)

 const expanded = expandPrompts(keyword)

 const prompts = [...google,...expanded]

 return [...new Set(prompts)]

}

/*
=====================================================
AI QUERY SIMULATION
=====================================================
*/

async function queryAI(prompt){

 try{

  const url =
  `https://api.duckduckgo.com/?q=${prompt}&format=json`

  const res = await axios.get(url)

  return res.data.AbstractText || ""

 }catch{

  return ""

 }

}

/*
=====================================================
RESPONSE ANALYSIS
=====================================================
*/

function extractMentions(response,brands){

 const text = response.toLowerCase()

 return brands.filter(b =>
  text.includes(b.toLowerCase())
 )

}

/*
=====================================================
AUDIT ENDPOINT
=====================================================
*/

app.post("/api/audit", async (req,res)=>{

 const { product } = req.body

 auditStatus = {
  progress:0,
  currentPrompt:"",
  completed:false,
  results:null
 }

 const prompts = await harvestPrompts(product)

 const brands = [...new Set(products.map(p=>p.brand))]

 let mentions = 0

 for(let i=0;i<prompts.length;i++){

  const prompt = prompts[i]

  auditStatus.currentPrompt = prompt
  auditStatus.progress = Math.floor((i/prompts.length)*100)

  const response = await queryAI(prompt)

  const found = extractMentions(response,brands)

  if(found.length > 0) mentions++

 }

 const score = (mentions / prompts.length) * 100

 auditStatus.completed = true

 auditStatus.results = {

  visibilityScore:Math.round(score),

  promptsTested:prompts.length

 }

 res.json({ message:"Audit started" })

})

/*
=====================================================
AUDIT STATUS API
=====================================================
*/

app.get("/api/status",(req,res)=>{
 res.json(auditStatus)
})

/*
=====================================================
PRODUCT API
=====================================================
*/

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

app.get("/api/products/search/:brand",(req,res)=>{

 const brand = req.params.brand.toLowerCase()

 const filtered = products.filter(p =>
  p.brand.toLowerCase().includes(brand)
 )

 res.json(filtered)

})

/*
=====================================================
SERVER
=====================================================
*/

const PORT = 5000

app.listen(PORT,()=>{
 console.log(`Server running on port ${PORT}`)
})
