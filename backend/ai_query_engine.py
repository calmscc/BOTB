from backend.config import client

def generate_queries(product):

    return [
        f"Where can I buy the best {product}?",
        f"What stores sell the best {product}?",
        f"Where should I buy a high quality {product}?",
        f"What retailers sell the most popular {product}?",
        f"Where do professionals buy their {product}?"
    ]


def query_ai(product):

    queries = generate_queries(product)

    responses = {}

    for i, q in enumerate(queries):

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role":"user","content":q}]
        )

        responses[f"query_{i+1}"] = response.choices[0].message.content

    return responses
