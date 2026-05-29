
-- 1. Make user-uploads bucket private (progress photos)
UPDATE storage.buckets SET public = false WHERE id = 'user-uploads';

-- 2. Add UPDATE policy on calorie_logs (currently missing)
CREATE POLICY "Users can update their own logs"
ON public.calorie_logs
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 3. Add DELETE policy on user_metrics
CREATE POLICY "Users can delete their own metrics"
ON public.user_metrics
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- 4. Fix mutable search_path on cleanup_old_messages
CREATE OR REPLACE FUNCTION public.cleanup_old_messages()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $function$
BEGIN
  DELETE FROM chat_messages
  WHERE id IN (
    SELECT id
    FROM (
      SELECT id,
             ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) as rn
      FROM chat_messages
    ) ranked
    WHERE ranked.rn > 50
  );
  RETURN NEW;
END;
$function$;

-- 5. Revoke EXECUTE on SECURITY DEFINER functions from public roles.
-- These are trigger functions and should not be callable by end users via the API.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.cleanup_old_messages() FROM PUBLIC, anon, authenticated;

-- 6. Storage policies for private user-uploads bucket (in case missing)
DROP POLICY IF EXISTS "Users can view their own uploads" ON storage.objects;
CREATE POLICY "Users can view their own uploads"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Users can upload their own files" ON storage.objects;
CREATE POLICY "Users can upload their own files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Users can delete their own uploads" ON storage.objects;
CREATE POLICY "Users can delete their own uploads"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);
