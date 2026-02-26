-- Remove existing broken cron job
SELECT cron.unschedule('auto-publish-blog') WHERE EXISTS (
  SELECT 1 FROM cron.job WHERE jobname = 'auto-publish-blog'
);

-- Re-create cron without Authorization header (Edge Function must have verify_jwt = false)
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