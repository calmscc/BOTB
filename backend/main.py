from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from backend.ai_query_engine import run_queries
from backend.product_extractor import extract_products
from backend.scoring import visibility_score, accuracy_score
from backend.competitor_analysis import competitor_share

app = FastAPI()

@app.get("/", response_class=HTMLResponse)
def dashboard():

    return """
    <html>
    <head>
        <title>VerifAI Dashboard</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    </head>

    <body>

    <h1>VerifAI AI Visibility Dashboard</h1>

    <input id="product" placeholder="Enter Product Name">
    <button onclick="runAnalysis()">Run Analysis</button>

    <h2>Visibility Score</h2>
    <div id="visibility"></div>

    <h2>Accuracy Score</h2>
    <div id="accuracy"></div>

    <canvas id="chart"></canvas>

    <script>

    async function runAnalysis(){

        let product = document.getElementById("product").value

        let res = await fetch(`/run-analysis?product=${product}`)

        let data = await res.json()

        document.getElementById("visibility").innerText =
        data.visibility_score + "%"

        document.getElementById("accuracy").innerText =
        data.accuracy_score + "%"

        let labels = Object.keys(data.competitors)
        let values = Object.values(data.competitors)

        new Chart(document.getElementById("chart"),{

            type:"bar",

            data:{
                labels:labels,
                datasets:[{
                    label:"Competitor Appearances",
                    data:values
                }]
            }

        })

    }

    </script>

    </body>
    </html>
    """
