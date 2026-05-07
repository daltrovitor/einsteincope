-- Adiciona a coluna de nome na tabela de perfis
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS name text;

-- Atualiza o seu perfil atual com o seu nome
UPDATE public.profiles SET name = 'Vitor Daltro' WHERE email = 'admin@einstein.site';

-- Melhora o gatilho para os próximos cadastros
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    new.id, 
    new.email, 
    split_part(new.email, '@', 1),
    'user'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;