import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"

const app = express()

app.use(cors())
app.use(express.json())

/*
========================================
AI ENGINES
========================================
*/

const aiEngines = [
 "chatgpt",
 "gemini",
 "perplexity"
]

/*
========================================
RETAIL STORES
========================================
*/

const retailers = [
 "Amazon",
 "Walmart",
 "Best Buy",
 "Target",
 "Costco",
 "Newegg",
 "B&H",
 "Apple Store",
 "Micro Center",
 "Sam's Club"
]

/*
========================================
SIMULATED AI RESPONSE GENERATOR
(~250 responses)
========================================
*/

function generateResponses(){

 const responses = []

 const phrases = [

  "The best place to buy PRODUCT is STORE.",
  "Many shoppers purchase PRODUCT from STORE because of pricing.",
  "You can find PRODUCT at retailers like STORE.",
  "Experts recommend checking STORE for PRODUCT deals.",
  "STORE offers competitive pricing for PRODUCT.",
  "Customers often buy PRODUCT from STORE online.",
  "Popular retailers for PRODUCT include STORE.",
  "Many reviews mention STORE when buying PRODUCT.",
  "Consumers frequently purchase PRODUCT at STORE.",
  "STORE is a reliable option when shopping for PRODUCT."

 ]

 const extras = [

  "due to fast shipping.",
  "because of discounts.",
  "because of product availability.",
  "thanks to good return policies.",
  "because of strong customer reviews.",
  "due to competitive pricing.",
  "because of convenient pickup options.",
  "thanks to frequent promotions.",
  "because of wide product selection.",
  "due to trusted brand partnerships."

 ]

 for(const retailer of retailers){

  for(const phrase of phrases){

   for(const extra of extras){

    const response =
     phrase
      .replace("STORE", retailer)
      .replace("PRODUCT","headphones") +
     " " + extra

    responses.push(response)

   }

  }

 }

 return responses

}

const simulatedResponses = generateResponses()

/*
========================================
PATH SETUP
========================================
*/

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname,"../frontend")))

app.get("/",(req,res)=>{
 res.sendFile(path.join(__dirname,"../frontend/dashboard.html"))
})

/*
========================================
PROMPT GENERATOR
========================================
*/

function generatePrompts(product){

 return [

  `best ${product}`,
  `top rated ${product}`,
  `best ${product} brands`,
  `where to buy ${product}`,
  `best place to buy ${product}`,
  `best ${product} deals`,
  `what store sells ${product}`,
  `best ${product} online`,
  `best ${product} reddit`,
  `top ${product} recommendations`

 ]

}

/*
========================================
SIMULATED AI QUERY
========================================
*/

function querySimulatedAI(prompt){

 const randomIndex =
 Math.floor(Math.random() * simulatedResponses.length)

 return simulatedResponses[randomIndex]

}

/*
========================================
AI VISIBILITY AUDIT
========================================
*/

app.post("/api/audit",(req,res)=>{

 const { store, product } = req.body

 console.log("Running demo audit:",store,product)

 const prompts = generatePrompts(product)

 const mentions = {}

 aiEngines.forEach(engine=>{
  mentions[engine] = 0
 })

 for(const prompt of prompts){

  for(const engine of aiEngines){

   const response = querySimulatedAI(prompt)

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
  promptsTested:prompts.length,
  mentions,
  visibility

 })

})

/*
========================================
SERVER START
========================================
*/

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
 console.log(`Server running on port ${PORT}`)
})
