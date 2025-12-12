-- Add 'superadmin' to the app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'superadmin';

-- Create trigger to automatically create profile for new users (if not exists)
CREATE OR REPLACE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- Create trigger to automatically assign default role (if not exists)  
CREATE OR REPLACE TRIGGER on_auth_user_role_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user_role();