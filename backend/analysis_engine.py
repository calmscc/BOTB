from collections import Counter
import itertools

def ai_visibility_audit(product, brand, platform_products):

    all_products = list(itertools.chain.from_iterable(platform_products.values()))
    total_mentions = len(all_products)

    brand_mentions = sum(
        1 for p in all_products if brand.lower() in p.lower()
    )

    visibility = (brand_mentions / total_mentions * 100) if total_mentions else 0

    competitor_counts = Counter(all_products)

    return {
        "product": product,
        "brand": brand,
        "visibility_percent": round(visibility, 2),
        "total_ai_mentions": total_mentions,
        "brand_mentions": brand_mentions,
        "competitor_mentions": dict(competitor_counts)
    }
