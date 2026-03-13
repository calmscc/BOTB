import random
from ai_query_engine import query_ai
from retail_extractor import extract_retailers
from verification_engine import calculate_visibility

ai_engines = ["chatgpt","gemini","perplexity"]

def generate_prompts(product):

    prompts = []

    templates = [
        "best PRODUCT",
        "top rated PRODUCT",
        "best PRODUCT brands",
        "where to buy PRODUCT",
        "best place to buy PRODUCT",
        "best PRODUCT deals",
        "best PRODUCT online",
        "best PRODUCT reddit",
        "best PRODUCT for beginners",
        "best PRODUCT for professionals"
    ]

    for i in range(20):

        for t in templates:
            prompts.append(t.replace("PRODUCT",product))

    return prompts


def run_audit(store, product):

    prompts = generate_prompts(product)

    mentions = {}

    for engine in ai_engines:
        mentions[engine] = 0

    for prompt in prompts:

        for engine in ai_engines:

            response = query_ai(prompt)

            retailers = extract_retailers(response)

            if store.lower() in retailers:
                mentions[engine] += 1

    visibility = calculate_visibility(mentions,len(prompts))

    return {
        "store":store,
        "product":product,
        "promptsTested":len(prompts),
        "mentions":mentions,
        "visibility":visibility
    }
