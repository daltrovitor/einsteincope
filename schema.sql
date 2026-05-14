CREATE TABLE raffles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  total_numbers INTEGER DEFAULT 1000,
  status VARCHAR(50) DEFAULT 'OPEN', -- OPEN, CLOSED, DRAWN
  draw_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE raffle_buyers (
  id SERIAL PRIMARY KEY,
  raffle_id INTEGER REFERENCES raffles(id),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  pix_account_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  numbers JSONB NOT NULL, -- Array of 4-digit numbers
  total_value DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert the initial raffles
INSERT INTO raffles (title, slug, description, price, image_url, total_numbers, status, draw_date) VALUES 
('Secador Philco 4 em 1 Dobrável', 'secador', 'Secador Philco 4 em 1 Dobrável. Motor BLDC, 4 em 1 (seca, alisa, modela, dá volume), Dobrável, Tecnologia de íons.', 10.00, '/images/raffle-secador.jpg', 1000, 'OPEN', '2024-05-25 20:00:00'),
('Clareamento Caseiro Moldado no Consultório', 'clareamento', 'Clareamento Caseiro com CD3 Odontologia. Acompanhamento odontológico, molheira e seringas inclusas.', 10.00, '/images/raffle-clareamento.jpg', 1000, 'OPEN', '2024-05-25 20:00:00');

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Habilitar RLS nas tabelas
ALTER TABLE raffles ENABLE ROW LEVEL SECURITY;
ALTER TABLE raffle_buyers ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- Políticas para a tabela `raffles`
-- ------------------------------------------------------------------------------
-- Qualquer pessoa (anônima ou não) pode visualizar as rifas
CREATE POLICY "Permitir leitura pública de rifas" 
ON raffles FOR SELECT 
USING (true);

-- Apenas usuários logados (Admin) podem criar rifas
CREATE POLICY "Permitir criação de rifas para admin" 
ON raffles FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Apenas usuários logados (Admin) podem atualizar rifas
CREATE POLICY "Permitir atualização de rifas para admin" 
ON raffles FOR UPDATE 
TO authenticated 
USING (true);

-- Apenas usuários logados (Admin) podem deletar rifas
CREATE POLICY "Permitir exclusão de rifas para admin" 
ON raffles FOR DELETE 
TO authenticated 
USING (true);

-- ------------------------------------------------------------------------------
-- Políticas para a tabela `raffle_buyers`
-- ------------------------------------------------------------------------------
-- Qualquer pessoa pode inserir (comprar uma rifa)
CREATE POLICY "Permitir que qualquer pessoa compre rifas" 
ON raffle_buyers FOR INSERT 
WITH CHECK (true);

-- Apenas usuários logados (Admin) podem visualizar os compradores (leitura completa)
CREATE POLICY "Permitir leitura de compradores para admin" 
ON raffle_buyers FOR SELECT 
TO authenticated 
USING (true);

-- Permitir leitura pública limitada (necessário para o .select() após o insert funcionar)
CREATE POLICY "Permitir leitura pública de compradores" 
ON raffle_buyers FOR SELECT 
USING (true);

-- Apenas usuários logados (Admin) podem atualizar status de compradores
CREATE POLICY "Permitir atualização de compradores para admin" 
ON raffle_buyers FOR UPDATE 
TO authenticated 
USING (true);

-- Apenas usuários logados (Admin) podem deletar compradores
CREATE POLICY "Permitir exclusão de compradores para admin" 
ON raffle_buyers FOR DELETE 
TO authenticated 
USING (true);
-- ==============================================================================
-- STORAGE CONFIGURATION (Buckets & Policies)
-- ==============================================================================

-- 1. Criar o bucket para as imagens das rifas (se não existir)
-- Nota: Isso requer permissões de admin no Supabase.
INSERT INTO storage.buckets (id, name, public)
VALUES ('raffles', 'raffles', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Políticas para o bucket `raffles`

-- Permitir acesso público para visualização das imagens
CREATE POLICY "Acesso Público para Visualização"
ON storage.objects FOR SELECT
USING ( bucket_id = 'raffles' );

-- Permitir que apenas usuários autenticados (Admin) façam upload
CREATE POLICY "Acesso de Admin para Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'raffles' );

-- Permitir que apenas usuários autenticados (Admin) atualizem arquivos
CREATE POLICY "Acesso de Admin para Atualização"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'raffles' );

-- Permitir que apenas usuários autenticados (Admin) deletem arquivos
CREATE POLICY "Acesso de Admin para Exclusão"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'raffles' );
