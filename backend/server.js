import express from "express"
import cors from "cors"
import { exec } from "child_process"
import path from "path"
import { fileURLToPath } from "url"

import { generatePrompts } from "./promptGenerator.js"
import { saveAudit, getAudits } from "./database.js"

const app = express()

app.use(cors())
app.use(express.json())

/*
========================================
PATH SETUP
========================================
*/

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/*
========================================
SERVE FRONTEND
========================================
*/

app.use(express.static(path.join(__dirname,"../frontend")))

app.get("/",(req,res)=>{
 res.sendFile(path.join(__dirname,"frontend/index.html"))
})

/*
========================================
AI VISIBILITY AUDIT
========================================
*/

app.post("/api/audit",(req,res)=>{

 const { store, product } = req.body

 if(!store || !product){

  return res.json({
   error:"Store and product are required"
  })

 }

 const prompts = generatePrompts(product)

 exec(
  `python3 main.py "${store}" "${product}"`,
  (error,stdout,stderr)=>{

   if(error){

    console.log("Python error:",error)

    return res.json({
     error:"Python engine failed"
    })

   }

   try{

    const result = JSON.parse(stdout)

    saveAudit(result)

    res.json(result)

   }catch(e){

    console.log("JSON parse error:",e)

    res.json({
     error:"Invalid response from Python engine"
    })

   }

  }

 )

})

/*
========================================
AUDIT HISTORY (DATABASE)
========================================
*/

app.get("/api/history",(req,res)=>{

 const audits = getAudits()

 res.json(audits)

})

/*
========================================
HEALTH CHECK
========================================
*/

app.get("/health",(req,res)=>{
 res.json({
  status:"running",
  service:"NOLAlytics AI Analyzer"
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
