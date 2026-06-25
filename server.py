#!/usr/bin/env python3
import json
import os
import time
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "data"
STATS_FILE = DATA_DIR / "stats.json"
INITIAL_COUNT = 100


def default_stats():
    return {
        "total": INITIAL_COUNT,
        "generated": 0,
        "events": [
            {"text": f"已有 {INITIAL_COUNT} 位求索者读到自己的人生沙盘", "ts": int(time.time())},
        ],
    }


def read_stats():
    DATA_DIR.mkdir(exist_ok=True)
    if not STATS_FILE.exists():
        write_stats(default_stats())
    try:
        with STATS_FILE.open("r", encoding="utf-8") as f:
            data = json.load(f)
    except (json.JSONDecodeError, OSError):
        data = default_stats()
    data["total"] = max(int(data.get("total", INITIAL_COUNT)), INITIAL_COUNT)
    data["generated"] = max(int(data.get("generated", 0)), 0)
    data["events"] = list(data.get("events", []))[-8:] or default_stats()["events"]
    return data


def write_stats(data):
    DATA_DIR.mkdir(exist_ok=True)
    tmp = STATS_FILE.with_suffix(".tmp")
    with tmp.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    os.replace(tmp, STATS_FILE)


class LifeSandboxHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, format, *args):
        return

    def send_json(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path.startswith("/api/stats"):
            stats = read_stats()
            self.send_json({
                "total": stats["total"],
                "generated": stats["generated"],
                "events": stats["events"][-5:][::-1],
            })
            return
        super().do_GET()

    def do_POST(self):
        if self.path.startswith("/api/event"):
            length = int(self.headers.get("Content-Length", "0") or 0)
            try:
                payload = json.loads(self.rfile.read(length).decode("utf-8") or "{}")
            except json.JSONDecodeError:
                payload = {}
            label = str(payload.get("label") or "一位求索者读到自己的人生沙盘")[:80]
            stats = read_stats()
            stats["total"] = max(stats["total"] + 1, INITIAL_COUNT)
            stats["generated"] += 1
            stats["events"] = (stats["events"] + [{"text": label, "ts": int(time.time())}])[-8:]
            write_stats(stats)
            self.send_json({
                "total": stats["total"],
                "generated": stats["generated"],
                "events": stats["events"][-5:][::-1],
            })
            return
        self.send_error(404)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8080"))
    server = ThreadingHTTPServer(("0.0.0.0", port), LifeSandboxHandler)
    print(f"Life Sandbox server running at http://localhost:{port}")
    server.serve_forever()
