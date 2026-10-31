# Bali Belly Recovery CMS – setup and deployment

This package adds a first CMS foundation and AI article drafting workflow to the existing GitHub Pages website. It does **not** replace the existing homepage or the 15 location pages.

## Important architecture and security

- The public website remains on GitHub Pages.
- `/admin/` is a static admin interface. Protect it with **Cloudflare Access** before using it.
- The CMS API runs as a Cloudflare Worker. Protect its hostname with Cloudflare Access too; the Worker verifies the Cloudflare Access JWT and audience.
- GitHub App private key and OpenAI API key are Worker secrets only. Never put either in `admin.js`, HTML, repository files or browser local storage.
- The Worker uses a GitHub App installation token to write article HTML, JSON content, blog listing and sitemap.
- AI output is an editable draft, not medical approval. Medical articles require a reviewer name and approval checkbox before publishing. Have a qualified medical professional verify medical claims.

## 1. Copy files into the existing repository

Copy these package paths into the root of your current repository:

- `admin/` (admin dashboard)
- `workers/` (Cloudflare Worker backend)
- `blog/index.html` (initial blog listing)
- `content/blog/` (create this directory; it will hold article JSON files)

Do not replace the existing `index.html` in this package with your live homepage. Preserve your current homepage and all existing location URLs.

## 2. Create a GitHub App

Create a GitHub App for this repository with repository permissions:

- Contents: Read and write
- Metadata: Read-only

Install it on only the Bali Belly Recovery repository. Record App ID, Installation ID, and download its private key. The app must be allowed to create/update files on the selected branch.

## 3. Deploy the Cloudflare Worker

From the `workers` directory, edit `wrangler.toml` with your GitHub owner, repository, branch, App ID, Installation ID and Cloudflare Access team domain.

Set encrypted secrets (do not commit these):

```bash
npx wrangler secret put OPENAI_API_KEY
npx wrangler secret put GH_APP_PRIVATE_KEY
npx wrangler secret put CF_ACCESS_AUD
```

For `GH_APP_PRIVATE_KEY`, paste the full PEM private key content. `CF_ACCESS_AUD` is the Application Audience (AUD) tag shown in Cloudflare Access.

Deploy:

```bash
npx wrangler deploy
```

Use a dedicated API hostname such as `cms-api.yourdomain.workers.dev` or a custom subdomain. Add a Cloudflare Access self-hosted application for the admin path and the API hostname. Configure its audience tag in `CF_ACCESS_AUD`. Ensure the Access JWT is forwarded to the Worker as `Cf-Access-Jwt-Assertion` (Cloudflare Access does this on protected Worker routes).

## 4. Protect the admin page

Create a Cloudflare Access application for `balibellyrecovery.com/admin/*`. Allow only your administrator email(s). Do not rely on the admin page's `noindex` tag as access control.

Also protect the Worker API hostname with Cloudflare Access and use the same Access application audience expected by the Worker. Configure the admin page's origin in Worker CORS if using a separate admin subdomain. Current CORS allows `https://balibellyrecovery.com`.

## 5. Configure admin

Open `https://balibellyrecovery.com/admin/`, go to Settings, and enter the deployed Worker API base URL, e.g. `https://cms-api.example.workers.dev`.

The first dashboard uses a simple Markdown editor with preview. AI article drafts return title, excerpt, content, SEO title, focus keyword and meta description. Edit and verify before saving or publishing.

## 6. Publishing behavior

When Publish is selected, the Worker writes:

- `content/blog/<slug>.json`
- `content/blog/index.json`
- `blog/<slug>.html`
- `blog/index.html`
- `sitemap.xml` (adds the published article URL)

GitHub Pages then deploys the updated site. Deployment may take a few minutes. Verify the article URL and sitemap after deployment.

## 7. Before production use

This is an initial CMS implementation. Test on a staging branch first. Verify Cloudflare Access JWT forwarding, GitHub App installation permissions, Worker CORS, API rate limits, file uploads (not included in this first build), scheduled publishing (status design is prepared but scheduler is not yet implemented), and sitemap updates. Do not collect patient symptoms, diagnoses, medication details or other sensitive health information in blog comments or public forms.
