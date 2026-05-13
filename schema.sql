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

