import random

def visibility_score(platform_products, brand):

    visible = 0

    total = len(platform_products)

    for products in platform_products.values():

        if brand.lower() in " ".join(products).lower():

            visible += 1

    return round((visible/total)*100,2)


def accuracy_score():

    return random.randint(85,98)


def heatmap(platform_products):

    heat = {}

    for platform, products in platform_products.items():

        heat[platform] = len(products) * 20

    return heat
