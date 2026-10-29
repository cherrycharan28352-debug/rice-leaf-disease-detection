import urllib.request

routes = ["/", "/detect", "/library", "/dashboard", "/history", "/about"]
base = "https://frontend-react-mu-tawny.vercel.app"

print("--- Testing Live Public Website Deployment ---")
all_ok = True
for r in routes:
    url = base + r
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            code = resp.getcode()
            print(f"ROUTE {r:12s} -> HTTP {code} OK")
    except Exception as e:
        print(f"ROUTE {r:12s} -> FAILED: {e}")
        all_ok = False

# Test ONNX Model
model_url = base + "/models/ricenet_int8.onnx"
try:
    req = urllib.request.Request(model_url, headers={"User-Agent": "Mozilla/5.0"}, method="HEAD")
    with urllib.request.urlopen(req, timeout=10) as resp:
        cl = resp.headers.get("Content-Length")
        print(f"ASSET /models/ricenet_int8.onnx -> HTTP {resp.getcode()} OK (Size: {int(cl):,} bytes)")
except Exception as e:
    print(f"ASSET /models/ricenet_int8.onnx -> FAILED: {e}")
    all_ok = False

if all_ok:
    print("\n[SUCCESS] ALL PUBLIC WEBSITE ROUTES AND MODEL ASSETS ARE LIVE & OPERATIONAL 24/7!")
