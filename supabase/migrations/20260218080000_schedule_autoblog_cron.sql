-- Remove any existing auto-publish-blog cron job
SELECT cron.unschedule('auto-publish-blog') WHERE EXISTS (
  SELECT 1 FROM cron.job WHERE jobname = 'auto-publish-blog'
);

-- Schedule auto-publish-blog every day at 01:00 UTC (08:00 WIB)
SELECT cron.schedule(
  'auto-publish-blog',
  '0 1 * * *',
  $$
  SELECT net.http_post(
    url := 'https://xjuncfctptangrqvnrdb.supabase.co/functions/v1/auto-publish-blog',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
    ),
    body := '{}'::jsonb
  ) AS request_id;
  $$
);