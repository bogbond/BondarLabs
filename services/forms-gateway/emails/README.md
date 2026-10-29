# Bondar Labs email notifications

Workspace `VVckLKghq`: Contact form `Tp0MAK00i` → info@bondarlabs.co.uk; Quote form `AI2hlw9tt` → quotes@bondarlabs.co.uk. Dreamy Cake templates remain separate and unchanged.

Published Postcraft code templates: `contact.html` → `C53QWzYbzkbbhvLcxhZvG` (**Bondar Labs — Contact notification**); `quote.html` → `vtUOPHF18MEQDVYbsoOCR` (**Bondar Labs — Quote notification**). Both use a compact clickable logo, one heading and no promotional footer. Fallback template subjects: `Bondar Labs | Contact enquiry — {{data.name}}` and `Bondar Labs | Quote request — {{data.name}}`.

The Worker sets `_email.from = Bondar Labs` and `_email.subject`, which takes precedence. Subjects use Contact enquiry or Quote request, optional client name and a short reference `[BL-<first 12 UUID hex digits>]`. This is readable in replies and distinguishes multiple enquiries from one client. The technical sender address remains Formspark's; submitted `email` supplies Reply-To. Blank optional Name falls back to Website visitor in the body.

`Message` contains only the contact message or quote description. Quote supplies a filtered `Quote` object of non-empty details, a `Files` array of original file names/URLs, optional `Shared file link`, and `File expiry date` in DD/MM/YYYY (UTC). Existing aggregate message, per-file fields and ISO expiry remain for the dashboard and compatibility. Upload and retention rules are unchanged. The layout escapes visitor values and uses documented `nl2br` and `sanitizeUrl` helpers; never introduce unescaped triple braces. The public PNG logo is on bondarlabs.co.uk; some mail apps require enabling external images.

Email threading (grouping every notification from a form) is off for both Contact and Quote, following the owner's explicit approval for each form. Every submission starts a separate conversation; replies are handled by the receiving mail app. Preserve recipients and spam protection when editing presentation.

Publish changes using the form's **Settings → Emails → Notifications → Open template** link. Updating a draft alone does not change delivered email: press **Publish**, verify the published state and send one clearly labelled, authorised test. No autoresponder is enabled by this notification template.

Check reply addressing, rendering and quoted appearance in the receiving mail client. The browser preview cannot prove final rendering in every mail app. For rollback use **Revert to default** on this form only; recipient settings and spam protection should remain in place. Recreate from this source through the UI if required; API template management is available only on upgraded workspaces.
