# Debug Session: paypal-sdk-load
- **Status**: [OPEN]
- **Issue**: A cleared request shows checkout enabled, but the browser cannot load PayPal checkout.
- **Debug Server**: Pending startup
- **Log File**: .dbg/trae-debug-log-paypal-sdk-load.ndjson

## Reproduction Steps
1. Open the checker and analyze a request that is eligible for PayPal sandbox checkout.
2. Observe the checkout controls and any PayPal SDK load error.

## Hypotheses & Verification
| ID | Hypothesis | Likelihood | Effort | Evidence |
|----|------------|------------|--------|----------|
| A | The browser cannot fetch the PayPal SDK because of a network, browser policy, or blocked request. | High | Low | Rejected as root cause. The browser request fails, but PayPal's endpoint itself returns an SDK validation error. |
| B | The sandbox client ID or its paired secret is invalid, so PayPal rejects SDK initialization. | Medium | Low | Confirmed. The configured ID is present, but PayPal responds that it is unrecognized; sandbox OAuth returns HTTP 401 for the pair. |
| C | The script request succeeds but does not expose `window.paypal.Buttons`. | Medium | Low | Rejected as the initiating failure. The SDK script request errors before `onload`; no `Buttons` API is available. |
| D | The checkout effect is cancelled or its mount node disappears before the SDK completes. | Low | Medium | Rejected as root cause. The effect is re-created with a token and mount node, then the independent SDK request errors. |

## Log Evidence
- `.dbg/trae-debug-log-paypal-sdk-load.ndjson:1-3`: client ID was present; the SDK script emitted `script-error`.
- `.dbg/trae-debug-log-paypal-sdk-load.ndjson:4-10`: the checkout effect restarted with token and mount node present; PayPal still emitted `script-error`.
- Browser network evidence: PayPal SDK request failed with `net::ERR_ABORTED`.
- Host-side GET to the same SDK URL returned HTTP 400 with `SDK Validation error: client-id not recognized`; the client ID was not copied into this record.
- Host-side OAuth validation using the configured sandbox client ID and secret returned HTTP 401. Credential values were not printed.

## Verification Conclusion
Root cause is an invalid or mismatched `PAYPAL_CLIENT_ID` / `PAYPAL_CLIENT_SECRET` pair in the server environment. The request review is eligible, but PayPal rejects checkout credentials. A valid client ID and secret from the same PayPal Sandbox REST app are required before checkout can work. Post-fix verification is pending corrected credentials.
