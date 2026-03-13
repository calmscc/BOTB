import json
import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def extract_products(text):

    prompt = f"""
Extract product or brand names from this text.

Return JSON like this:

{{"products":["brand1","brand2","brand3"]}}

Text:
{text}
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role":"user","content":prompt}]
    )

    try:

        data = json.loads(response.choices[0].message.content)

        return data["products"]

    except:

        return []
