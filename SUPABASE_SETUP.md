# Configuração do Supabase

Siga estes passos para configurar o seu projeto Supabase.

## 1. Configurar Variáveis de Ambiente

Abra o arquivo `.env.local` e preencha com suas chaves do Supabase:

```bash
NEXT_PUBLIC_SUPABASE_URL=sua-url-aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

## 2. Banco de Dados (SQL)

Vá até o **SQL Editor** no painel do Supabase e execute o seguinte script para criar as tabelas e permissões:

```sql
-- 1. Tabela de Perfis (Profiles) e Trigger Automático
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  role text check (role in ('admin', 'user')) default 'user'
);

-- Função para criar perfil automaticamente ao cadastrar usuário
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Tabela de Tarefas
create table public.tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  assigned_date date,
  due_date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Tabela de Provas
create table public.exams (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text,
  exam_date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Tabela de Arquivos
create table public.files (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  url text not null,
  uploaded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Habilitar Segurança (RLS)
alter table public.profiles enable row level security;
alter table public.tasks enable row level security;
alter table public.exams enable row level security;
alter table public.files enable row level security;

-- 6. Políticas de Acesso (Policies)

-- Perfis: Leitura pública (simplificado), Inserção apenas pelo próprio Auth
create policy "Ver perfis" on public.profiles for select using (true);

-- Tarefas: Todos veem, Admin cria
create policy "Ver tarefas" on public.tasks for select using (true);
create policy "Criar tarefas" on public.tasks for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Provas: Todos veem, Admin cria
create policy "Ver provas" on public.exams for select using (true);
create policy "Criar provas" on public.exams for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Arquivos: Todos veem, Admin cria
create policy "Ver arquivos" on public.files for select using (true);
create policy "Criar arquivos" on public.files for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
```

## 3. Configurar Storage (Arquivos)

1. No menu lateral, clique em **Storage**.
2. Crie um novo bucket chamado **`files`**.
3. Deixe-o como Public Bucket (ou configure Policies mais restritas se desejar).

## 4. Como testar Admin vs Aluno

1. Faça Sign Up no seu app (tela de login, se tiver link, senão crie user no Supabase Auth).
2. O usuário criado será `role: 'user'` por padrão.
3. Para tornar um usuário **Admin**:
   - Vá na tabela `profiles` no Table Editor.
   - Encontre o usuário e mude o campo `role` para `admin`.
