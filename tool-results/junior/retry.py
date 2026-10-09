import subprocess, sys, os, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from runvlm import run_one
jobs = sys.argv[1:]
for j in jobs:
    p, h = int(j[:-1]), j[-1]
    for attempt in range(6):
        run_one(p, h)
        f = os.path.join(os.path.dirname(os.path.abspath(__file__)), f"a{p:03d}{h}.json")
        if os.path.exists(f):
            print("ok", j); break
        print(f"retry {j} attempt {attempt+2} (rate limited)")
        time.sleep(45)
    else:
        print("FAILED", j)
