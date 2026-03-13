import express from "express"
import cors from "cors"
import { exec } from "child_process"
import path from "path"
import { fileURLToPath } from "url"

import { generatePrompts } from "./promptGenerator.js"
import { saveAudit } from "./database.js"

const app = express()

app.use(cors())
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pythonScript = path.join(__dirname,"main.py")

app.post("/api/audit",(req,res)=>{

 const { store, product } = req.body

 const prompts = generatePrompts(product)

 exec(`python3 ${pythonScript} "${store}" "${product}"`, (error, stdout, stderr)=>{

  console.log("PYTHON STDOUT:", stdout)
  console.log("PYTHON STDERR:", stderr)

  if(error){
   console.log("Python error:", error)
   return res.json({ error:"Python engine failed" })
  }

  const result = JSON.parse(stdout)

  saveAudit(result)

  res.json(result)

 })

})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
 console.log("Server running on port",PORT)
})
