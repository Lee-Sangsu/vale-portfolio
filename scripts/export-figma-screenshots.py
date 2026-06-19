#!/usr/bin/env python3
"""
Export Figma node screenshots via the Figma desktop app's local MCP server.
Saves PNGs to public/photos/boost-lab/trankition-13/
"""

import json, base64, urllib.request, urllib.error, os, sys

MCP_URL = "http://127.0.0.1:3845/mcp"
OUT_DIR = os.path.join(os.path.dirname(__file__), "../public/photos/boost-lab/trankition-13")

# Sections to export: (nodeId, filename)
NODES = [
    ("1479:298", "01.jpg"),   # Header / nav
    ("1479:299", "02.jpg"),   # Hero — "Shortest Distance..."
    ("1479:300", "03.jpg"),   # Photo collage
    ("1479:301", "04.jpg"),   # Why section
    ("1506:200", "05.jpg"),   # The Schedule
    ("1517:332", "06.jpg"),   # Everything You Need to Ship CTA
    ("1538:638", "07.jpg"),   # AI Support
    ("1570:24",  "08.jpg"),   # Footer / closing image
]

session_id = None

def post(payload, extra_headers=None):
    data = json.dumps(payload).encode()
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json, text/event-stream"
    }
    if session_id:
        headers["mcp-session-id"] = session_id
    if extra_headers:
        headers.update(extra_headers)
    req = urllib.request.Request(MCP_URL, data=data, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            resp_headers = resp.headers
            raw = resp.read()
            text = raw.decode("utf-8")
            # SSE format: lines like "event: message\ndata: {...}\n\n"
            result = None
            for line in text.splitlines():
                if line.startswith("data:"):
                    result = json.loads(line[5:].strip())
                    break
            if result is None:
                # Try plain JSON
                result = json.loads(text)
            return result, resp_headers
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"HTTP {e.code}: {body[:200]}")
        return None, None

def init():
    global session_id
    payload = {
        "jsonrpc": "2.0", "id": 1,
        "method": "initialize",
        "params": {
            "protocolVersion": "2024-11-05",
            "capabilities": {},
            "clientInfo": {"name": "export-script", "version": "1.0"}
        }
    }
    result, headers = post(payload)
    if headers:
        session_id = headers.get("Mcp-Session-Id") or headers.get("mcp-session-id")
    if result and "result" in result:
        print("✓ MCP initialized, session:", session_id)
        return True
    print("✗ Init failed:", result)
    return False

def screenshot(node_id):
    payload = {
        "jsonrpc": "2.0", "id": 2,
        "method": "tools/call",
        "params": {
            "name": "get_screenshot",
            "arguments": {"nodeId": node_id}
        }
    }
    result, _ = post(payload)
    if not result:
        return None
    content = result.get("result", {}).get("content", [])
    for block in content:
        if block.get("type") == "image":
            data = block.get("data", "")
            # strip data URL prefix if present
            if "," in data:
                data = data.split(",", 1)[1]
            return base64.b64decode(data)
    return None

def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    if not init():
        sys.exit(1)

    for node_id, filename in NODES:
        print(f"  Exporting {node_id} → {filename} ...", end="", flush=True)
        png_data = screenshot(node_id)
        if png_data:
            path = os.path.join(OUT_DIR, filename)
            # Save as PNG (rename extension doesn't matter for Next/Image)
            with open(path, "wb") as f:
                f.write(png_data)
            print(f" ✓ {len(png_data)//1024}KB")
        else:
            print(" ✗ no data")

    print("\nDone! Files in:", OUT_DIR)

if __name__ == "__main__":
    main()
