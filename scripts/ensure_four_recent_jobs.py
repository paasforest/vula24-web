#!/usr/bin/env python3
"""Ensure each location has 4 recentJobs (append city-specific line if only 3)."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "lib" / "locations-data.json"


def job(service: str, suburb: str, time_ago: str, note: str) -> dict:
    return {
        "service": service,
        "suburb": suburb,
        "timeAgo": time_ago,
        "note": note,
    }


def fourth_for(loc: dict) -> dict:
    name = loc["name"]
    subs = loc["suburbs"]
    s0 = subs[0] if subs else name
    s1 = subs[1] if len(subs) > 1 else s0
    return job(
        "Priority call-out",
        s1,
        "Same day",
        f"After-hours request — rapid dispatch across {name} metro ({s0} corridor)",
    )


def main() -> None:
    data = json.loads(DATA.read_text(encoding="utf-8"))
    for key in ("gauteng", "westernCape"):
        for loc in data[key]:
            rj = loc["recentJobs"]
            if len(rj) >= 4:
                continue
            while len(rj) < 4:
                rj.append(fourth_for(loc))
    DATA.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Updated {DATA}")


if __name__ == "__main__":
    main()
