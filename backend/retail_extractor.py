import json
from backend.config import client


def extract_retailers(text):

    prompt = f"""
Extract retailer or store names from this text.

Examples include:
Home Depot, Lowe's, Walmart, Target, Amazon, Ace Hardware.

Return JSON like this:

{{"retailers":["store1","store2","store3"]}}

Text:
{text}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role":"system","content":"Return only JSON."},
            {"role":"user","content":prompt}
        ]
    )

    content = response.choices[0].message.content

    try:
        data = json.loads(content)

        if "retailers" in data:
            return data["retailers"]

    except:
        pass

    return []
