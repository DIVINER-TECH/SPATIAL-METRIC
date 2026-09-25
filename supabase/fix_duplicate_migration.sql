-- fix_duplicate_migration.sql
-- Inspect, backup, and remove duplicate rows for a specific migration version
-- WARNING: Run a full DB backup or snapshot before applying destructive SQL.

-- 1) Show duplicated versions
SELECT version, count(*) FROM supabase_migrations.schema_migrations GROUP BY version HAVING count(*) > 1;

-- 2) Inspect rows for the conflicting version (replace the version if needed)
SELECT * FROM supabase_migrations.schema_migrations WHERE version = '20260206' ORDER BY inserted_at;

-- 3) Backup the problematic rows into a backup table (safe copy)
CREATE SCHEMA IF NOT EXISTS supabase_migrations_backup;
DROP TABLE IF EXISTS supabase_migrations_backup.schema_migrations_20260206_backup;
CREATE TABLE supabase_migrations_backup.schema_migrations_20260206_backup AS
SELECT * FROM supabase_migrations.schema_migrations WHERE version = '20260206';

-- 4) Delete duplicate rows but keep the earliest inserted row. This uses CTID
WITH duplicates AS (
  SELECT ctid
  FROM supabase_migrations.schema_migrations
  WHERE version = '20260206'
  ORDER BY inserted_at NULLS LAST
  OFFSET 1
)
DELETE FROM supabase_migrations.schema_migrations
WHERE ctid IN (SELECT ctid FROM duplicates);

-- 5) Verify remaining rows for that version
SELECT * FROM supabase_migrations.schema_migrations WHERE version = '20260206';

-- End of script
