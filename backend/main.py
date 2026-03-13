from fastapi import FastAPI, Query
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from backend.ai_query_engine import query_ai
from backend.retailer_extractor import extract_retailers
from backend.analysis_engine import retailer_visibility, retailer_share

app = FastAPI()

app.mount("/static", StaticFiles(directory="frontend"), name="static")


@app.get("/")
def home():
    return FileResponse("frontend/index.html")


@app.get("/analyze")

def analyze(product: str = Query(...), retailer: str = Query(...)):

    responses = query_ai(product)

    platform_retailers = {}

    for query, text in responses.items():

        stores = extract_retailers(text)

        platform_retailers[query] = stores

    visibility = retailer_visibility(platform_retailers, retailer)

    competitors = retailer_share(platform_retailers)

    return {

        "product": product,
        "retailer": retailer,

        "responses": responses,
        "retailers_found": platform_retailers,

        "visibility_score": visibility,
        "retailer_mentions": competitors

    }
