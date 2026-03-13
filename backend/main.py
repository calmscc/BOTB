import sys
import json

from audit_engine import run_audit


if __name__ == "__main__":

    store = sys.argv[1]
    product = sys.argv[2]

    result = run_audit(store, product)

    print(json.dumps(result))
