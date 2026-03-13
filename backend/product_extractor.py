import json
from backend.config import client

def extract_products(text):
    prompt = f"""
Extract product or brand names from this text.
Return ONLY valid JSON in this format:
{{"products":["brand1","brand2","brand3"]}}
Text:
{text}
"""
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "Return only valid JSON."},
            {"role": "user", "content": prompt}
        ]
    )

    content = response.choices[0].message.content
    print("AI returned:", content)  # debug

    # Try parsing JSON first
    try:
        data = json.loads(content)
        if isinstance(data, dict) and "products" in data:
            return data["products"]
    except Exception as e:
        print("JSON parse failed:", e)

    # Fallback: parse as plain text
    products = []
    for line in content.split("\n"):
        line = line.strip()
        if not line:
            continue
        # remove numbering if present
        if "." in line:
            line = line.split(".")[-1].strip()
        # skip lines that aren’t real product names
        if line:
            products.append(line)
    return products
