from fastapi import FastAPI, Query
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from backend.ai_query_engine import query_ai
from backend.retail_extractor import extract_retailers
from backend.audit_engine import ai_visibility_audit
from backend.verification_engine import verify_product_accuracy

app = FastAPI()

app.mount("/static", StaticFiles(directory="frontend"), name="static")


@app.get("/")
def home():
    return FileResponse("frontend/index.html")


@app.get("/analyze")

def analyze(product: str = Query(...), brand: str = Query(...)):

    responses = query_ai(product)

    platform_products = {}

    for prompt, text in responses.items():

        products = extract_products(text)

        platform_products[prompt] = products

    audit = ai_visibility_audit(product, brand, platform_products)

    verification = verify_product_accuracy(platform_products, brand)

    return {

        "product": product,
        "brand": brand,

        "responses": responses,
        "platform_products": platform_products,

        "visibility_audit": audit,
        "accuracy_report": verification
    }
