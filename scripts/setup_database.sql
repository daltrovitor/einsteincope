-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  name text,
  role text default 'user' check (role in ('admin', 'user')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Users can view their own profile"
  on public.profiles for select
  using ( auth.uid() = id );

create policy "Admins can view all profiles"
  on public.profiles for select
  using ( 
    auth.uid() in (select id from public.profiles where role = 'admin')
  );

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, role)
  values (
    new.id, 
    new.email, 
    split_part(new.email, '@', 1), -- Default name as everything before @
    'user'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. TASKS
create table if not exists public.tasks (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  assigned_date date not null,
  due_date date not null,
  is_completed boolean default false, -- Mainly for UI state, or per-user tracking if extended later
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.tasks enable row level security;

-- Everyone can view tasks
create policy "Authenticated users can view tasks"
  on public.tasks for select
  using ( auth.role() = 'authenticated' );

-- Only admins can insert/update/delete tasks
create policy "Admins can manage tasks"
  on public.tasks for all
  using ( 
    auth.uid() in (select id from public.profiles where role = 'admin')
  );


-- 3. EXAMS
create table if not exists public.exams (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text,
  exam_date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.exams enable row level security;

create policy "Authenticated users can view exams"
  on public.exams for select
  using ( auth.role() = 'authenticated' );

create policy "Admins can manage exams"
  on public.exams for all
  using ( 
    auth.uid() in (select id from public.profiles where role = 'admin')
  );


-- 4. SCHEDULE ITEMS (Class Schedule)
create table if not exists public.schedule_items (
  id uuid default uuid_generate_v4() primary key,
  day text not null check (day in ('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta')),
  subject text not null,
  time text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.schedule_items enable row level security;

create policy "Authenticated users can view schedule"
  on public.schedule_items for select
  using ( auth.role() = 'authenticated' );

create policy "Admins can manage schedule"
  on public.schedule_items for all
  using ( 
    auth.uid() in (select id from public.profiles where role = 'admin')
  );


-- 5. FILE ATTACHMENTS
create table if not exists public.file_attachments (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  url text not null,
  size text,
  uploaded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.file_attachments enable row level security;

create policy "Authenticated users can view files"
  on public.file_attachments for select
  using ( auth.role() = 'authenticated' );

create policy "Admins can manage files"
  on public.file_attachments for all
  using ( 
    auth.uid() in (select id from public.profiles where role = 'admin')
  );
