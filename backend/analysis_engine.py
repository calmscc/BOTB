from collections import Counter
import itertools


def retailer_visibility(platform_retailers, company):

    appearances = 0
    total_queries = len(platform_retailers)

    for retailers in platform_retailers.values():

        retailers_lower = [r.lower() for r in retailers]

        if company.lower() in retailers_lower:
            appearances += 1

    score = (appearances / total_queries) * 100

    return round(score,2)


def retailer_share(platform_retailers):

    all_retailers = list(
        itertools.chain.from_iterable(platform_retailers.values())
    )

    counts = Counter(all_retailers)

    return dict(counts)
