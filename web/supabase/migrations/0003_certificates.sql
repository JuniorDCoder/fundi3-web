-- 0003_certificates.sql
-- Adds user_profiles (display name + Solana pubkey) and certificates tables.

-- ── User profiles ─────────────────────────────────────────────────────────────
CREATE TABLE user_profiles (
    id             UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id        UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name   TEXT        NOT NULL
                   CHECK (char_length(display_name) >= 2
                      AND char_length(display_name) <= 100),
    student_pubkey TEXT        NOT NULL, -- base58 Solana pubkey (deterministic per user)
    created_at     TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at     TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE(user_id)
);

CREATE TRIGGER set_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_profiles_select_own"
    ON user_profiles FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_profiles_insert_own"
    ON user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_profiles_update_own"
    ON user_profiles FOR UPDATE USING (auth.uid() = user_id);

-- ── Certificates ──────────────────────────────────────────────────────────────
CREATE TABLE certificates (
    id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id         UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id       UUID        NOT NULL REFERENCES courses(id)    ON DELETE CASCADE,
    display_name    TEXT        NOT NULL, -- snapshot of name at issuance time
    certificate_pda TEXT,                -- Solana PDA address (null until on-chain)
    metadata_uri    TEXT,                -- canonical metadata URL stored on-chain
    solana_tx_sig   TEXT,                -- transaction signature (null until minted)
    issued_at       TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE(user_id, course_id)
);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Public read — certificates are designed to be shared
CREATE POLICY "certificates_select_public"
    ON certificates FOR SELECT USING (true);

-- Only the owning user may insert (via server with service role in practice)
CREATE POLICY "certificates_insert_own"
    ON certificates FOR INSERT WITH CHECK (auth.uid() = user_id);
