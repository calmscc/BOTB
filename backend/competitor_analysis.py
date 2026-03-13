from collections import Counter

def competitor_share(platform_products):
    result = {}
    for platform, products in platform_products.items():
        # products is already a list, not a dict
        counts = {}
        for p in products:
            counts[p] = counts.get(p, 0) + 1
        result[platform] = counts
    return result
