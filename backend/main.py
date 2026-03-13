from fastapi import FastAPI, Query
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from backend.ai_query_engine import query_ai
from backend.product_extractor import extract_products
from backend.competitor_analysis import competitor_share
from backend.analysis_engine import visibility_score, accuracy_score, heatmap

app = FastAPI()

# Serve static frontend
app.mount("/static", StaticFiles(directory="frontend"), name="static")


@app.get("/")
def home():
    return FileResponse("frontend/index.html")


@app.get("/analyze")
def analyze(
    product: str = Query(..., description="Product to analyze"),
    brand: str = Query(..., description="Brand to check visibility for")
):
    try:
        # Step 1: Get AI responses
        print(f"Querying AI for product: {product}")
        responses = query_ai(product)
        print("AI responses received:", responses)

        # Step 2: Extract products per platform (with robust parsing)
        platform_products = {}
        for platform, text in responses.items():
            products = extract_products(text)
            platform_products[platform] = products
        print("Platform products:", platform_products)

        # Step 3: Compute competitor share
        competitors = competitor_share(platform_products)
        print("Competitors:", competitors)

        # Step 4: Compute visibility & accuracy
        visibility = visibility_score(platform_products, brand)
        accuracy = accuracy_score()

        # Step 5: Generate heatmap
        heat = heatmap(platform_products)

        # Step 6: Return everything as JSON
        return {
            "responses": responses,
            "platform_products": platform_products,
            "competitors": competitors,
            "visibility": visibility,
            "accuracy": accuracy,
            "heatmap": heat
        }

    except Exception as e:
        # Catch all errors to avoid 500
        print("ANALYZE ERROR:", e)
        return {"error": str(e)}


# Optional: test AI independently
@app.get("/test-ai")
def test_ai(product: str = Query(...)):
    try:
        response = query_ai(product)
        print("Test AI response:", response)
        return response
    except Exception as e:
        print("Test AI error:", e)
        return {"error": str(e)}
