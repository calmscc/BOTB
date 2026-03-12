from config import client

queries = [
    "best laptops under $500",
    "top student laptops under $500",
    "best budget laptops 2026",
    "best affordable laptops for college"
]

def ask_ai(query):

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role":"user","content":query}]
    )

    return response.choices[0].message.content


def run_queries():

    results = []

    for q in queries:

        response = ask_ai(q)

        results.append({
            "query": q,
            "response": response
        })

    return results
