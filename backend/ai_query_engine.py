from backend.config import client

def query_ai(product):

    query = f"What are the most popular brands or products for {product}? Give a ranked list."

    print("Querying Groq...")

    response = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[{"role": "user", "content": query}]
    )

    result = response.choices[0].message.content

    print(result)

    return {
        "groq": result
    }
