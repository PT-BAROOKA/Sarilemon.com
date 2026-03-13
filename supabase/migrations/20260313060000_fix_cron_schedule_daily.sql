-- Fix cron schedule: change from */2 (odd days only) to daily
-- The edge function's 36-hour duplicate check handles spacing (1 post every ~2 days)
-- This ensures the cron fires every day, maximizing reliability

SELECT cron.unschedule('auto-publish-blog');

SELECT cron.schedule(
  'auto-publish-blog',
  '0 1 * * *',
  $$
  SELECT net.http_post(
    url := 'https://wfthvovlhphnrodrqxqt.supabase.co/functions/v1/auto-publish-blog',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);
