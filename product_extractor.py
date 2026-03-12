from config import client
import json

def extract_products(text):

    prompt = f"""
Extract product names mentioned in this AI answer.

Return JSON like this:

{{"products":["product1","product2"]}}

Text:
{text}
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role":"user","content":prompt}]
    )

    data = response.choices[0].message.content

    try:
        return json.loads(data)["products"]
    except:
        return []
