from fastapi import FastAPI
from backend.ai_query_engine import run_queries
from backend.product_extractor import extract_products
from backend.scoring import visibility_score, accuracy_score
from backend.competitor_analysis import competitor_share

app = FastAPI()

@app.get("/run-analysis")

def run_analysis(product: str):

    raw = run_queries()

    processed = []

    for r in raw:

        products = extract_products(r["response"])

        processed.append({
            "query": r["query"],
            "products": products
        })

    visibility = visibility_score(processed, product)

    accuracy = accuracy_score()

    competitors = competitor_share(processed)

    return {
        "visibility_score": visibility,
        "accuracy_score": accuracy,
        "competitors": competitors
    }
