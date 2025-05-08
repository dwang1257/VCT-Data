import requests
from bs4 import BeautifulSoup
import psycopg2

def safe_float(text):
    try:
        return float(text.strip().replace('%', ''))
    except:
        return None

conn = psycopg2.connect(
    host="localhost",
    database="valorant",
    user="dylan"
)
cur = conn.cursor()

url = "https://www.vlr.gg/stats/?event_group_id=74&region=all&min_rounds=150&min_rating=&agent=all&map_id=all&timespan=all"
headers = {"User-Agent": "Mozilla/5.0"}

response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, "html.parser")

rows = soup.select("table.wf-table.mod-stats.mod-scroll tbody tr")
inserted = 0

for row in rows:
    cols = row.find_all("td")
    if len(cols) < 13:
        continue

    try:
        player_cell = cols[0]
        name_tag = player_cell.select_one("a div.text-of")
        team_tag = player_cell.select_one("a div.stats-player-country")

        if not name_tag or not team_tag:
            continue

        name = name_tag.text.strip()
        team = team_tag.text.strip()

        rounds_played = int(cols[2].text.strip())
        span_tags = row.select("td.mod-color-sq span")

        kast_raw = safe_float(span_tags[3].text) if len(span_tags) > 3 else None
        kast = kast_raw / 100 if kast_raw is not None else None

        cl_raw = safe_float(span_tags[10].text) if len(span_tags) > 10 else None
        cl_percent = cl_raw / 100 if cl_raw is not None else None

        kd_ratio = safe_float(span_tags[2].text) if len(span_tags) > 2 else 0.0
        acs = safe_float(span_tags[1].text) if len(span_tags) > 1 else 0.0
        fkpr = safe_float(span_tags[7].text) if len(span_tags) > 7 else 0.0
        apr = safe_float(span_tags[6].text) if len(span_tags) > 6 else 0.0
        kpr = safe_float(span_tags[5].text) if len(span_tags) > 5 else 0.0
        fdpr = safe_float(span_tags[8].text) if len(span_tags) > 8 else 0.0

        try:
            cur.execute("""
                INSERT INTO players (
                    name, team, acs, kd_ratio, kast, fkpr, apr, kpr, fdpr, cl_percent, rounds_played
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (name, team, acs, kd_ratio, kast, fkpr, apr, kpr, fdpr, cl_percent, rounds_played))
            conn.commit()
            inserted += 1
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            print(f"Skipped duplicate player: {name} ({team})")

    except Exception as e:
        conn.rollback()
        print(f"Skipping row due to error: {e}")

print(f"Total new players inserted: {inserted}")
cur.close()
conn.close()
