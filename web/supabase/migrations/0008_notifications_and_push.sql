-- 0008_notifications_and_push.sql
-- In-app notification center, Expo push tokens, wallet "receive" watermark,
-- and a new email preference for wallet activity.
-- No migration runner is configured for this project, so this file is applied manually.

-- ─── In-app notifications ────────────────────────────────────────────────────
-- Bilingual columns so the mobile client can render in whichever language the
-- user is currently using, regardless of the language active when the event
-- happened.

create table if not exists public.notifications (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type        TEXT        NOT NULL, -- 'wallet_send' | 'wallet_receive' | 'certificate_minted'
    title_en    TEXT        NOT NULL,
    title_fr    TEXT        NOT NULL,
    body_en     TEXT        NOT NULL,
    body_fr     TEXT        NOT NULL,
    data        JSONB       NOT NULL DEFAULT '{}'::jsonb,
    read_at     TIMESTAMPTZ,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

create index if not exists notifications_user_id_created_at_idx
    on public.notifications (user_id, created_at desc);

alter table public.notifications enable row level security;

create policy "notifications_select_own"
    on public.notifications for select using (auth.uid() = user_id);

create policy "notifications_update_own"
    on public.notifications for update using (auth.uid() = user_id);

-- ─── Expo push tokens ─────────────────────────────────────────────────────────
-- Service-role access only (same pattern as github_connections in 0007): no
-- policies are defined, so only the service-role client can read/write.

create table if not exists public.user_push_tokens (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    expo_push_token TEXT        NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, expo_push_token)
);

alter table public.user_push_tokens enable row level security;

-- ─── Wallet "receive" watermark ─────────────────────────────────────────────
-- Tracks the newest transaction signature we've already notified about, per
-- user, so /api/wallet/transactions only fires "receive" notifications for
-- NEW incoming transfers. Service-role access only.

create table if not exists public.user_wallet_watch (
    user_id        UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    last_signature TEXT,
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

drop trigger if exists set_user_wallet_watch_updated_at on public.user_wallet_watch;
create trigger set_user_wallet_watch_updated_at
    before update on public.user_wallet_watch
    for each row execute procedure set_updated_at();

alter table public.user_wallet_watch enable row level security;

-- ─── New email preference ────────────────────────────────────────────────────

alter table public.user_notification_preferences
    add column if not exists email_wallet_activity BOOLEAN NOT NULL DEFAULT true;
