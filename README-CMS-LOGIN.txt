# Bali Belly Recovery CMS — Admin Login Update

This update replaces the previous Cloudflare Access JWT requirement with a signed,
HttpOnly cookie session handled by the Cloudflare Worker.

## Files to place in GitHub

- `workers/cms-worker.js`       <- use `cms-worker-auth.js`
- `admin/index.html`            <- use `index-auth.html`
- `admin/admin.js`              <- use `admin-auth.js`

Keep your existing `admin.css` and all other website files.

## Cloudflare Worker setup

1. Open Worker `bali-belly-recovery-cms`.
2. Replace its code with `cms-worker-auth.js` and deploy.
3. Add these as **Secrets** (not plain Variables):
   - `ADMIN_EMAIL` — your admin email address.
   - `ADMIN_PASSWORD` — use a unique password of at least 20 characters.
   - `SESSION_SECRET` — a random secret of at least 32 characters. Generate one locally; do not send it in chat.
4. Keep the existing GitHub App variables and `GH_APP_PRIVATE_KEY` Secret.

## API hostname

In the Worker settings, add the custom domain:
`api.balibellyrecovery.com`

The domain must be managed by the same Cloudflare account as the Worker. Cloudflare will create/attach the DNS record. Wait until the custom domain is active.

## Rate limiting (important)

Create a Cloudflare Worker Rate Limiting binding:
- Binding name: `LOGIN_LIMITER`
- Limit: 5 requests
- Period: 60 seconds

Bind it to this Worker. The code checks this binding on `/api/auth/login`. If no binding is present, login still works but does not have this additional per-IP rate limit. Do not publish the admin login until rate limiting is configured.

## GitHub files

Upload:
- `index-auth.html` as `admin/index.html`
- `admin-auth.js` as `admin/admin.js`

Upload the Worker code as `workers/cms-worker.js`.

Then open `https://balibellyrecovery.com/admin/`. The API URL defaults to
`https://api.balibellyrecovery.com`.

## GitHub private key format

The existing Worker uses Web Crypto PKCS#8 import. GitHub App private keys are commonly
downloaded as PKCS#1 (`BEGIN RSA PRIVATE KEY`). If the Worker reports a key import error,
convert the private key locally to PKCS#8 (`BEGIN PRIVATE KEY`) using OpenSSL and store
the converted value as the `GH_APP_PRIVATE_KEY` Secret. Never paste a private key into chat.

## Important

- Do not delete the old Worker deployment until the new code is deployed and tested.
- `/api/health` is public; CMS data and write endpoints require a valid session.
- The admin HTML is not itself secret; the Worker enforces authentication on every CMS endpoint.
- Keep a backup of the current three files before replacing them.
