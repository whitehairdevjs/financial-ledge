-- 가계부 애플리케이션 데이터베이스 스키마

-- 카테고리 테이블
CREATE TABLE IF NOT EXISTS categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(7), -- HEX 색상 코드 (예: #FF5733)
    icon VARCHAR(50), -- 아이콘 이름
    parent_id BIGINT, -- 상위 카테고리 (자기 참조)
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('INCOME', 'EXPENSE', 'BOTH')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 계정/지갑 테이블
CREATE TABLE IF NOT EXISTS accounts (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    account_type VARCHAR(50) NOT NULL, -- CASH, BANK, CREDIT_CARD, INVESTMENT 등
    balance DECIMAL(15, 2) DEFAULT 0.00 NOT NULL,
    currency VARCHAR(10) DEFAULT 'KRW' NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 거래 내역 테이블 (기존 transactions 테이블 개선)
CREATE TABLE IF NOT EXISTS transactions (
    id BIGSERIAL PRIMARY KEY,
    transaction_date DATE NOT NULL,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('INCOME', 'EXPENSE', 'TRANSFER')),
    category_id BIGINT,
    account_id BIGINT NOT NULL,
    target_account_id BIGINT, -- 이체(TRANSFER) 시 대상 계정
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 예산 테이블
CREATE TABLE IF NOT EXISTS budgets (
    id BIGSERIAL PRIMARY KEY,
    category_id BIGINT NOT NULL,
    account_id BIGINT,
    amount DECIMAL(15, 2) NOT NULL,
    period_type VARCHAR(20) NOT NULL CHECK (period_type IN ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY')),
    start_date DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 태그 테이블
CREATE TABLE IF NOT EXISTS tags (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    color VARCHAR(7), -- HEX 색상 코드
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 거래-태그 연결 테이블 (다대다 관계)
CREATE TABLE IF NOT EXISTS transaction_tags (
    transaction_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,
    PRIMARY KEY (transaction_id, tag_id)
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_transactions_category ON transactions(category_id);
CREATE INDEX IF NOT EXISTS idx_transactions_account ON transactions(account_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_budgets_category ON budgets(category_id);
CREATE INDEX IF NOT EXISTS idx_budgets_period ON budgets(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id);

-- 초기 데이터 삽입 (선택사항)
-- 기본 카테고리
INSERT INTO categories (name, transaction_type, color) VALUES
    ('식비', 'EXPENSE', '#FF6B6B'),
    ('교통비', 'EXPENSE', '#4ECDC4'),
    ('쇼핑', 'EXPENSE', '#FFE66D'),
    ('의료비', 'EXPENSE', '#95E1D3'),
    ('교육비', 'EXPENSE', '#F38181'),
    ('급여', 'INCOME', '#6BCB77'),
    ('부수입', 'INCOME', '#4D96FF'),
    ('이체', 'BOTH', '#9B59B6')
ON CONFLICT (name) DO NOTHING;

-- 기본 계정
INSERT INTO accounts (name, account_type, balance) VALUES
    ('카드', 'CARD', 0.00),
    ('현금', 'CASH', 0.00),
    ('주계좌', 'BANK', 0.00)
ON CONFLICT (name) DO NOTHING;
