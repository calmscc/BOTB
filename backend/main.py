from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from backend.ai_query_engine import query_ai
from backend.product_extractor import extract_products
from backend.competitor_analysis import competitor_share
from backend.analysis_engine import visibility_score, accuracy_score, heatmap

app = FastAPI()

app.mount("/static", StaticFiles(directory="frontend"), name="static")


@app.get("/")
def home():
    return FileResponse("frontend/index.html")


@app.get("/analyze")
def analyze(product: str, brand: str):

    try:

        responses = query_ai(product)

        platform_products = {}

        for platform, text in responses.items():

            products = extract_products(text)

            platform_products[platform] = products

        competitors = competitor_share(platform_products)

        visibility = visibility_score(platform_products, brand)

        accuracy = accuracy_score()

        heat = heatmap(platform_products)

        return {
            "responses": responses,
            "platform_products": platform_products,
            "competitors": competitors,
            "visibility": visibility,
            "accuracy": accuracy,
            "heatmap": heat
        }

    except Exception as e:
        print("ERROR:", e)
        return {"error": str(e)}
