import sys
import json

from ai_query_engine import query_ai
from retail_extractor import extract_retailers
from audit_engine import ai_visibility_audit
from verification_engine import verify_product_accuracy


def run_analysis(product, brand):

    responses = query_ai(product)

    platform_products = {}

    for prompt, text in responses.items():

        retailers = extract_retailers(text)

        platform_products[prompt] = retailers

    audit = ai_visibility_audit(product, brand, platform_products)

    verification = verify_product_accuracy(platform_products, brand)

    return {
        "product": product,
        "brand": brand,
        "responses": responses,
        "platform_products": platform_products,
        "visibility_audit": audit,
        "accuracy_report": verification
    }


if __name__ == "__main__":

    brand = sys.argv[1]
    product = sys.argv[2]

    result = run_analysis(product, brand)

    print(json.dumps(result))
