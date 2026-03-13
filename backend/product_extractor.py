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
        model="openai/gpt-oss-120b",
        messages=[
            {"role": "system", "content": "Return only valid JSON."},
            {"role": "user", "content": prompt}
        ]
    )

    content = response.choices[0].message.content

    try:
        data = json.loads(content)
        return data.get("products", [])

    except Exception as e:
        print("JSON parse error:", e)
        print("Model output:", content)
        return []
