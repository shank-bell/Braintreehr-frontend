/**
 * Web3Forms plugin — client-side email notifications for BrainTree HR forms.
 * Plain script version (no ES modules) — works with a normal <script> tag.
 *
 * IMPORTANT: Web3Forms's free tier is meant to be called from the browser.
 * Server-side calls (e.g. from a Next.js API route) require a paid plan +
 * server IP whitelisting. Keep this call on the client.
 */

(function () {
  const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

  async function sendToWeb3Forms({ accessKey, subject, fromName, replyTo, ccEmail, fields = {} }) {
    if (!accessKey) throw new Error("sendToWeb3Forms: accessKey is required");

    const payload = {
      access_key: accessKey,
      subject,
      from_name: fromName || "BrainTree HR Website",
      ...fields,
    };
    if (replyTo) payload.replyto = replyTo;
    if (ccEmail) payload.ccemail = ccEmail; // PRO plan only — no-ops silently on free tier

    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Web3Forms submission failed");
    }
    return data;
  }

  async function sendFormToWeb3Forms(form, opts) {
    const formData = new FormData(form);
    const fields = Object.fromEntries(formData.entries());

    // Honeypot check — if a bot filled the hidden field, silently skip
    if (fields.botcheck) return { success: false, skipped: true };

    return sendToWeb3Forms({
      ...opts,
      replyTo: opts.replyTo || fields.email,
      fields,
    });
  }

  // Attach to window so any plain <script> on the page can call these
  window.sendToWeb3Forms = sendToWeb3Forms;
  window.sendFormToWeb3Forms = sendFormToWeb3Forms;
})();
