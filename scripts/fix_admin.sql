-- RODE ESTE SCRIPT NO SQL EDITOR DO SUPABASE PARA CORRIGIR O SEU ACESSO

DO $$ 
DECLARE
  v_user_id uuid;
BEGIN
  -- 1. Pega o ID correto da tabela de autenticação do Supabase
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'admin@einstein.site';

  -- 2. Se o usuário existir, garante que o perfil dele tenha a role de admin
  IF v_user_id IS NOT NULL THEN
    INSERT INTO public.profiles (id, email, role, name)
    VALUES (v_user_id, 'admin@einstein.site', 'admin', 'Vitor Daltro')
    ON CONFLICT (id) DO UPDATE SET role = 'admin', name = 'Vitor Daltro', email = 'admin@einstein.site';
    
    -- 3. Remove perfis duplicados ou com ID antigo
    DELETE FROM public.profiles WHERE email = 'admin@einstein.site' AND id != v_user_id;
  END IF;
END $$;
