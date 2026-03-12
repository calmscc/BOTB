def visibility_score(all_results, client_product):

    appearances = 0
    total = len(all_results)

    for r in all_results:

        products = r["products"]

        if client_product.lower() in " ".join(products).lower():
            appearances += 1

    score = (appearances / total) * 100

    return round(score,2)


def accuracy_score():

    # simulated for demo
    import random
    return random.randint(88,98)
