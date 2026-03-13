async function run(){

try{

// Get user inputs
let product = document.getElementById("product").value.trim()
let brand = document.getElementById("brand").value.trim()

// Validation
if(!product || !brand){
alert("Please enter both a product and brand")
return
}

// Show results section
document.getElementById("results-section").style.display = "block"

// Loading messages
document.getElementById("visibility").innerText = "Analyzing..."
document.getElementById("accuracy").innerText = "Analyzing..."
document.getElementById("responses").innerHTML = "<p>Running AI queries...</p>"

// Call backend API
let res = await fetch(
`/analyze?product=${encodeURIComponent(product)}&brand=${encodeURIComponent(brand)}`
)

// Check for server errors
if(!res.ok){
throw new Error("Server error")
}

let data = await res.json()

console.log("API DATA:", data)


// ---------------------------
// Visibility Score
// ---------------------------
if(data.visibility !== undefined){
document.getElementById("visibility").innerText =
data.visibility + "%"
}


// ---------------------------
// Accuracy Score
// ---------------------------
if(data.accuracy !== undefined){
document.getElementById("accuracy").innerText =
Math.round(data.accuracy * 100) + "%"
}


// ---------------------------
// Platform Products Table
// ---------------------------
const platformBody = document.querySelector("#platform-products-table tbody")

if(platformBody && data.platform_products){

platformBody.innerHTML = ""

for(const [platform, products] of Object.entries(data.platform_products)){

const tr = document.createElement("tr")

const tdPlatform = document.createElement("td")
tdPlatform.textContent = platform

const tdProducts = document.createElement("td")
tdProducts.textContent = products.join(", ")

tr.appendChild(tdPlatform)
tr.appendChild(tdProducts)

platformBody.appendChild(tr)

}

}


// ---------------------------
// Competitor Table
// ---------------------------
const competitorBody = document.querySelector("#competitors-table tbody")

if(competitorBody && data.competitors){

competitorBody.innerHTML = ""

for(const [name,count] of Object.entries(data.competitors)){

const tr = document.createElement("tr")

const tdName = document.createElement("td")
tdName.textContent = name

const tdCount = document.createElement("td")
tdCount.textContent = count

tr.appendChild(tdName)
tr.appendChild(tdCount)

competitorBody.appendChild(tr)

}

}


// ---------------------------
// AI Responses
// ---------------------------
let html = "<h2>AI Responses</h2>"

if(data.responses){

for(let prompt in data.responses){

html += `
<div class="response-block">
<h4>${prompt}</h4>
<p>${data.responses[prompt]}</p>
</div>
`

}

}

document.getElementById("responses").innerHTML = html


}catch(error){

console.error("Dashboard error:", error)

document.getElementById("responses").innerHTML =
"<p style='color:red;'>Error running analysis.</p>"

}

}
