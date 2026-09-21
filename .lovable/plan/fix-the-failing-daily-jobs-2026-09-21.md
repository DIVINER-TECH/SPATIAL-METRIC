# Fix the failing daily jobs

## What's actually wrong

The hosted database behind SpatialMetric is **paused**. Every scheduled job — news ingestion, the daily market snapshot, and AI content generation — writes to that database, so while it's asleep each run fails immediately. This is not a bug in the job code; nothing in the pipeline can succeed until the backend is awake.

A second issue sits underneath it: the app's connection settings point at a backend address that no longer matches this project's database. Even after waking things up, the site can read stale or empty data until that connection is repaired.

## Plan

1. **Wake the backend** and wait until it reports healthy.
2. **Repair the app's backend connection** so the site talks to the correct live database instead of the outdated address.
3. **Re-run the jobs one at a time** (news, then market snapshot, then content generation) rather than all at once — running them together previously hit a time limit.
4. **Confirm the schedule is still armed** so tomorrow's run happens on its own: the full pipeline daily, plus news refreshes through the day.
5. **Verify on the site**: fresh news on the home feed, an up-to-date market snapshot on the dashboard, new articles, and the pipeline panel showing green for every job.

## Technical notes

- Resume the Lovable Cloud instance, then poll status until `ACTIVE_HEALTHY`.
- Client env currently references ref `wgvmfqkyksfyitmaehkl`; the active instance is `ymlmuupqiytcwobmxzpz`. Fix via the backend connection, not by hand-editing `.env`.
- Invoke `ingest-news`, `daily-market-snapshot`, `auto-content` as separate calls; then check `function_runs` for `success` rows on each.
- Re-check `cron.job` entries for the daily pipeline (06:00 UTC) and the 6-hourly news job; recreate them if the pause dropped them.
- If `auto-content` returns 402, that's AI credits, not code — report it and leave the rest green.
