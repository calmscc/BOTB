import os
from backend.config import client

def query_ai(product):

    query = f"""What are the most popular brands or products for {product}? Give a ranked list."""
    
    response = client.chat.completions.create(
                model="openai/gpt-oss-120b",
                messages=[{"role":"user","content":query}]
            )

            results[platform] = response.choices[0].message.content
