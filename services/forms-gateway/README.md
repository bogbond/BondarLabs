# Bondar Labs enquiry gateway

This Worker handles Contact and Quote only. Dreamy Cake and its Worker remain unchanged.

## Public provider switch

`src/assets/data/form-provider.json` selects an explicit mode: `0` FormSubmit (requires its own verified endpoint), `1` legacy Formly (one file), `2` Formspark via this Worker. There is no automatic fallback. Both forms are disabled until the selected service is loaded; visitors without JavaScript can use the displayed email address.

Set `gateway` to this Worker's HTTPS origin and `turnstileSiteKey` to the public Bondar Labs widget key. Do not put credentials in public configuration.

## Configuration

Deploy `wrangler.jsonc` on the existing Workers Free plan, using a SQLite-backed `SESSIONS` Durable Object binding. Durable Objects store short-lived retry state and file-expiry records; they are not an extra paid subscription within the Free plan quotas. Do not enable a paid plan automatically.

Worker secrets:

- `FORMSPARK_CONTACT_FORM_ID`: Contact form, notify `info@bondarlabs.co.uk`.
- `FORMSPARK_QUOTE_FORM_ID`: Quote form, notify `quotes@bondarlabs.co.uk`.
- `TURNSTILE_SECRET_KEY`: Bondar Labs widget, allowing `bondarlabs.co.uk` and `www.bondarlabs.co.uk`; server-verified action `bondar_enquiry`.
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

Use separate Formspark forms inside the chosen shared workspace. Verify notification recipients before sending tests. Formspark must not verify the same Turnstile token a second time. Secrets belong in Cloudflare secrets, never in this repository, screenshots, build artifacts or reports.

## Files and retention

Quote accepts zero to three original files, each 1–10,000,000 bytes. Supported extensions are defined in `worker.mjs` and mirrored in the form and client. CAD, archive, image and PDF files use Cloudinary's signed **raw** upload endpoint, with no transformations, previews or extraction. Validation checks size, extension and basic recognizable signatures where applicable; it is not antivirus scanning or a full CAD compatibility test.

Verify Cloudinary's account delivery settings for raw formats including PDF and ZIP. Test actual download and SHA-256 equality with original files before declaring these supported in production. No unsigned upload preset is needed.

All files for one request share an expiry: six calendar months if all files are at most 5,000,000 bytes; three calendar months if any file is larger. Month-end dates are clamped to the last valid day. Durable Object alarms perform expiry cleanup at the next daily 06:00 UTC boundary and retry failures daily. Destruction is guarded to the exact `bondar-labs/enquiries/<uuid>/<index>.<extension>` namespace. It cannot delete Dreamy Cake objects. Cache invalidation is requested; third-party cache removal may not be instantaneous.

Incomplete draft uploads are cleaned after 24 hours. If the final Formspark result is ambiguous, files retain the normal enquiry expiry. Text fields are removed from retry storage before sending; explicit retryable rejection restores them for at most the draft lifetime. Accepted Formspark submissions, external file links and received email are outside this file cleanup policy.

## Confirmation and retries

1. Validate and verify Turnstile, create a private session.
2. Upload each selected file separately. A confirmed stored result follows the browser transfer progress.
3. Send the enquiry with every file URL to Formspark.
4. Show acceptance only after a positive provider response. This is not proof of email inbox delivery.

The session token is a browser-memory capability and is never sent to analytics. A repeated final request returns the same accepted state. Ambiguous upstream outcomes require checking the reference before any new submission, to avoid duplicates. Reloading the page does not preserve browser file selections; ordinary recoverable errors do.

## Validation and release

Local tests use mocked upstream services and do not prove live delivery. Complete a clearly marked owner-authorized test for each form, inspect Formspark, confirm file hashes and confirm email arrival. Keep analytics consent off during QA. Publish the site only after Worker, Turnstile, Cloudinary delivery and notification routing are ready. A provider configuration placeholder deliberately fails closed.

Changing existing Dreamy Cake retention or uploads is separate work. Do not apply this cleanup retroactively to existing objects without a reviewed scope and approval.
