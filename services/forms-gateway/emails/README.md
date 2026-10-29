# Bondar Labs Contact notification

First pilot only: Formspark form `Tp0MAK00i`, workspace `VVckLKghq`, recipient `info@bondarlabs.co.uk`. The Quote and Dreamy Cake templates are not part of this change.

`contact.html` is the source of the published Postcraft code template `C53QWzYbzkbbhvLcxhZvG`, named **Bondar Labs — Contact notification**. The template subject is `Bondar Labs | Message from {{data.name}}`. The Worker also sets the subject through `_email.subject`, which takes precedence, and the display sender name through `_email.from = Bondar Labs`. The technical sender address remains Formspark's.

The gateway adds `Message` only for Contact notifications. Existing `email` continues to set Reply-To. `name` falls back to `Website visitor` when optional Name is blank. Existing aggregate `message` remains for the dashboard and as a template fallback. The layout uses escaped Handlebars values and the documented `nl2br` helper for line breaks; do not introduce unescaped triple-brace interpolation for visitor data. The public PNG logo is hosted on bondarlabs.co.uk; some email clients may require the reader to enable external images.

Publish changes using the form's **Settings → Emails → Notifications → Open template** link. Updating a draft alone does not change delivered email: press **Publish**, verify the published state and send one clearly labelled, authorised test. No autoresponder is enabled by this notification template.

Check reply addressing, rendering and quoted appearance in the receiving mail client. The browser preview cannot prove final rendering in every mail app. For rollback use **Revert to default** on this form only; recipient settings and spam protection should remain in place. Recreate from this source through the UI if required; API template management is available only on upgraded workspaces.
