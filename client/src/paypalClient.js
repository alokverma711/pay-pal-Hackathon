let sdkPromise;
export function loadPayPal(clientId) {
  // #region debug-point B:client-id-and-sdk-state
  fetch('http://127.0.0.1:7777/event', { method: 'POST', body: JSON.stringify({ sessionId: 'paypal-sdk-load', runId: 'pre-fix', hypothesisId: 'B', location: 'client/src/paypalClient.js:loadPayPal', msg: '[DEBUG] PayPal SDK load requested', data: { clientIdPresent: Boolean(clientId), clientIdLength: typeof clientId === 'string' ? clientId.length : 0, sdkAlreadyAvailable: Boolean(window.paypal?.Buttons), requestAlreadyPending: Boolean(sdkPromise) }, ts: Date.now() }) }).catch(() => {});
  // #endregion
  if (sdkPromise) return sdkPromise;
  if (window.paypal?.Buttons) return Promise.resolve(window.paypal);
  if (!clientId) return Promise.reject(new Error('PayPal sandbox is not configured.'));
  sdkPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    let settled = false;
    s.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=USD&intent=capture`;
    const timer = window.setTimeout(() => fail('timeout'), 15000);
    const fail = (reason) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      sdkPromise = null;
      s.remove();
      // #region debug-point A:sdk-request-failure
      fetch('http://127.0.0.1:7777/event', { method: 'POST', body: JSON.stringify({ sessionId: 'paypal-sdk-load', runId: 'pre-fix', hypothesisId: 'A', location: 'client/src/paypalClient.js:loadPayPal.fail', msg: '[DEBUG] PayPal SDK request failed', data: { reason, clientIdPresent: Boolean(clientId) }, ts: Date.now() }) }).catch(() => {});
      // #endregion
      reject(new Error("PayPal checkout couldn't load. Check your connection or allow paypal.com, then try again."));
    };
    s.onload = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      // #region debug-point C:sdk-global-availability
      fetch('http://127.0.0.1:7777/event', { method: 'POST', body: JSON.stringify({ sessionId: 'paypal-sdk-load', runId: 'pre-fix', hypothesisId: 'C', location: 'client/src/paypalClient.js:script.onload', msg: '[DEBUG] PayPal SDK script loaded', data: { sdkGlobalPresent: Boolean(window.paypal), buttonsAvailable: Boolean(window.paypal?.Buttons) }, ts: Date.now() }) }).catch(() => {});
      // #endregion
      if (window.paypal?.Buttons) resolve(window.paypal);
      else {
        settled = false;
        fail('missing-buttons-api');
      }
    };
    s.onerror = () => fail('script-error');
    document.head.appendChild(s);
  });
  return sdkPromise;
}
