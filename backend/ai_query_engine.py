from backend.config import client

def generate_queries(product):

    return [
        f"What are the best {product} brands?",
        f"Where can I buy the best {product}?",
        f"Top rated {product} products?",
        f"What {product} do professionals recommend?",
        f"What {product} should I buy online?"
    ]


def query_ai(product):

    queries = generate_queries(product)

    responses = {}

    for q in queries:

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role":"user","content":q}]
        )

        responses[q] = response.choices[0].message.content

    return responses
