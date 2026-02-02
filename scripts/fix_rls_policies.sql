-- ==============================================================================
-- SCRIPT PARA CORRIGIR A RECURSÃO INFINITA NAS POLÍTICAS RLS DA TABELA PROFILES
-- ==============================================================================
-- O erro "infinite recursion detected in policy for relation profiles" acontece
-- quando uma política RLS tenta consultar a própria tabela que está protegendo.
--
-- RODE ESTE SCRIPT NO SQL EDITOR DO SUPABASE
-- ==============================================================================

-- 1. Primeiro, remova todas as políticas existentes da tabela profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for users based on id" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_policy" ON public.profiles;

-- 2. Desabilitar RLS temporariamente para garantir limpeza
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- 3. Habilitar RLS novamente
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. Criar políticas simples e seguras (SEM recursão)
-- Política de SELECT: usuários podem ver seu próprio perfil
CREATE POLICY "profiles_select_own"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Política de INSERT: usuários podem criar seu próprio perfil
CREATE POLICY "profiles_insert_own"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Política de UPDATE: usuários podem atualizar seu próprio perfil
CREATE POLICY "profiles_update_own"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 5. Verificar se o perfil admin existe e está correto
DO $$ 
DECLARE
  v_user_id uuid;
BEGIN
  -- Pega o ID do usuário admin
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'admin@einstein.site';
  
  IF v_user_id IS NOT NULL THEN
    -- Insere ou atualiza o perfil do admin
    INSERT INTO public.profiles (id, email, role, name)
    VALUES (v_user_id, 'admin@einstein.site', 'admin', 'Administrador')
    ON CONFLICT (id) DO UPDATE SET 
      role = 'admin', 
      email = 'admin@einstein.site';
    
    RAISE NOTICE 'Perfil admin atualizado com sucesso! ID: %', v_user_id;
  ELSE
    RAISE NOTICE 'Usuário admin@einstein.site não encontrado em auth.users';
  END IF;
END $$;

-- 6. Verificar as políticas criadas
SELECT * FROM pg_policies WHERE tablename = 'profiles';
