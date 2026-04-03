/**
 * AI for Business Unlocked — Chat Widget
 * Drop-in embeddable script. Zero dependencies.
 * Place just before </body>:
 *   <script src="/chat-widget/widget.js"></script>
 */
(function () {
  "use strict";

  // ─── Configuration ────────────────────────────────────────────────
  var CHAT_API    = "/api/chat";
  var CONTACT_API = "/api/contact";
  var BRAND_COLOR = "#6D28D9";
  var BRAND_DARK  = "#4C1D95";
  var BRAND_LIGHT = "#EDE9FE";

  // ─── Inject Styles ────────────────────────────────────────────────
  var style = document.createElement("style");
  style.textContent = [
    "#aib-widget-btn{position:fixed;bottom:24px;right:24px;z-index:99999;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#7C3AED,#4C1D95);border:none;cursor:pointer;box-shadow:0 4px 20px rgba(109,40,217,.45);display:flex;align-items:center;justify-content:center;transition:transform .2s,box-shadow .2s}",
    "#aib-widget-btn:hover{transform:scale(1.08);box-shadow:0 6px 26px rgba(109,40,217,.55)}",
    "#aib-widget-btn svg{width:28px;height:28px;fill:#fff;transition:opacity .2s}",
    "#aib-widget-btn .aib-icon-close{display:none}",
    "#aib-widget-btn.open .aib-icon-chat{display:none}",
    "#aib-widget-btn.open .aib-icon-close{display:block}",
    "#aib-chat-window{position:fixed;bottom:96px;right:24px;z-index:99998;width:370px;max-width:calc(100vw - 32px);height:540px;max-height:calc(100vh - 120px);background:#fff;border-radius:18px;box-shadow:0 8px 40px rgba(0,0,0,.18);display:flex;flex-direction:column;overflow:hidden;opacity:0;transform:translateY(20px) scale(.97);pointer-events:none;transition:opacity .25s,transform .25s}",
    "#aib-chat-window.open{opacity:1;transform:translateY(0) scale(1);pointer-events:all}",
    "#aib-chat-header{background:linear-gradient(135deg,#7C3AED,#4C1D95);padding:16px 18px;display:flex;align-items:center;gap:12px;flex-shrink:0}",
    "#aib-chat-header .aib-avatar{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden}",
    "#aib-chat-header .aib-avatar svg{width:22px;height:22px;fill:#fff}",
    "#aib-chat-header .aib-avatar img{width:100%;height:100%;object-fit:cover}",
    "#aib-chat-header .aib-hinfo{flex:1;min-width:0}",
    "#aib-chat-header .aib-hname{color:#fff;font-weight:700;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    "#aib-chat-header .aib-hstatus{color:rgba(255,255,255,.8);font-size:12px;margin-top:2px;display:flex;align-items:center;gap:5px}",
    ".aib-dot{width:7px;height:7px;border-radius:50%;background:#34D399;flex-shrink:0}",
    "#aib-messages{flex:1;overflow-y:auto;padding:16px 14px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth}",
    "#aib-messages::-webkit-scrollbar{width:4px}",
    "#aib-messages::-webkit-scrollbar-thumb{background:#E5E7EB;border-radius:4px}",
    ".aib-msg{display:flex;align-items:flex-end;gap:8px;max-width:85%}",
    ".aib-msg.bot{align-self:flex-start}",
    ".aib-msg.user{align-self:flex-end;flex-direction:row-reverse}",
    ".aib-msg-avatar{width:28px;height:28px;border-radius:50%;background:#EDE9FE;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden}",
    ".aib-msg-avatar svg{width:15px;height:15px;fill:#7C3AED}",
    ".aib-msg-avatar img{width:100%;height:100%;object-fit:cover}",
    ".aib-bubble{padding:10px 13px;border-radius:16px;font-size:14px;line-height:1.5;word-break:break-word}",
    ".bot .aib-bubble{background:#F3F4F6;color:#111827;border-bottom-left-radius:4px}",
    ".user .aib-bubble{background:linear-gradient(135deg,#7C3AED,#4C1D95);color:#fff;border-bottom-right-radius:4px}",
    ".aib-typing{display:flex;gap:4px;padding:10px 14px;align-items:center}",
    ".aib-typing span{width:7px;height:7px;border-radius:50%;background:#9CA3AF;animation:aib-bounce .9s infinite}",
    ".aib-typing span:nth-child(2){animation-delay:.15s}",
    ".aib-typing span:nth-child(3){animation-delay:.3s}",
    "@keyframes aib-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}",
    "#aib-form-area{padding:14px 16px 0;border-top:1px solid #F3F4F6;background:#FAFAFA;flex-shrink:0}",
    "#aib-form-area h3{font-size:13px;font-weight:700;color:#4C1D95;margin:0 0 10px;text-align:center}",
    ".aib-field{margin-bottom:8px}",
    ".aib-field input,.aib-field textarea{width:100%;box-sizing:border-box;border:1px solid #E5E7EB;border-radius:10px;padding:8px 11px;font-size:13px;color:#111827;outline:none;font-family:inherit;transition:border-color .2s;background:#fff}",
    ".aib-field input:focus,.aib-field textarea:focus{border-color:#7C3AED;box-shadow:0 0 0 3px rgba(124,58,237,.12)}",
    ".aib-field textarea{resize:none;height:56px;line-height:1.4}",
    ".aib-field input::placeholder,.aib-field textarea::placeholder{color:#9CA3AF}",
    "#aib-form-submit{width:100%;margin-top:8px;padding:10px;background:linear-gradient(135deg,#7C3AED,#4C1D95);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:opacity .2s;font-family:inherit}",
    "#aib-form-submit:hover:not(:disabled){opacity:.88}",
    "#aib-form-submit:disabled{opacity:.55;cursor:default}",
    "#aib-form-note{font-size:11px;color:#9CA3AF;text-align:center;margin:6px 0 12px}",
    "#aib-input-area{padding:12px 14px;border-top:1px solid #F3F4F6;display:flex;gap:8px;align-items:flex-end;flex-shrink:0}",
    "#aib-input{flex:1;border:1px solid #E5E7EB;border-radius:12px;padding:9px 12px;font-size:14px;color:#111827;resize:none;outline:none;font-family:inherit;line-height:1.4;max-height:100px;overflow-y:auto;transition:border-color .2s;background:#fff}",
    "#aib-input:focus{border-color:#7C3AED;box-shadow:0 0 0 3px rgba(124,58,237,.1)}",
    "#aib-input::placeholder{color:#9CA3AF}",
    "#aib-send{width:38px;height:38px;border-radius:10px;background:linear-gradient(135deg,#7C3AED,#4C1D95);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:opacity .2s}",
    "#aib-send:hover:not(:disabled){opacity:.85}",
    "#aib-send:disabled{opacity:.45;cursor:default}",
    "#aib-send svg{width:18px;height:18px;fill:#fff}",
    ".aib-success{text-align:center;padding:16px 12px;color:#065F46;font-size:14px;font-weight:600}",
    ".aib-error{font-size:12px;color:#DC2626;text-align:center;margin-top:4px}",
    "@media(max-width:480px){#aib-chat-window{width:calc(100vw - 16px);right:8px;bottom:84px;height:calc(100vh - 100px)}}",
  ].join("");
  document.head.appendChild(style);

  // ─── Build HTML ───────────────────────────────────────────────────
  var container = document.createElement("div");
  container.id = "aib-widget-root";
  container.innerHTML = [
    // Toggle button
    '<button id="aib-widget-btn" aria-label="Chat with us">',
      '<svg class="aib-icon-chat" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-2 10H6v-2h12zm0-3H6V7h12z"/></svg>',
      '<svg class="aib-icon-close" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
    '</button>',
    // Chat window
    '<div id="aib-chat-window" role="dialog" aria-label="Workshop Chat">',
      // Header
      '<div id="aib-chat-header">',
        '<div class="aib-avatar">',
          '<img src="/logo.png" alt="AI for Business Unlocked" />',
        '</div>',
        '<div class="aib-hinfo">',
          '<div class="aib-hname">AI for Business Unlocked</div>',
          '<div class="aib-hstatus"><span class="aib-dot"></span>Workshop Assistant</div>',
        '</div>',
      '</div>',
      // Messages
      '<div id="aib-messages"></div>',
      // Lead form (hidden initially)
      '<div id="aib-form-area" style="display:none">',
        '<h3>Connect with Our Team</h3>',
        '<div class="aib-field"><input id="aib-f-name"    type="text"  placeholder="Your name *" /></div>',
        '<div class="aib-field"><input id="aib-f-email"   type="email" placeholder="Email address *" /></div>',
        '<div class="aib-field"><input id="aib-f-phone"   type="tel"   placeholder="Phone number" /></div>',
        '<div class="aib-field"><input id="aib-f-biz"     type="text"  placeholder="Business name" /></div>',
        '<div class="aib-field"><textarea id="aib-f-issue" placeholder="What can we help you with? *"></textarea></div>',
        '<div id="aib-form-error" class="aib-error" style="display:none"></div>',
        '<button id="aib-form-submit">Send Message</button>',
        '<p id="aib-form-note">We\'ll respond within 1 business day.</p>',
      '</div>',
      // Text input
      '<div id="aib-input-area">',
        '<textarea id="aib-input" placeholder="Ask about the workshop…" rows="1"></textarea>',
        '<button id="aib-send" aria-label="Send">',
          '<svg viewBox="0 0 24 24"><path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"/></svg>',
        '</button>',
      '</div>',
    '</div>',
  ].join("");
  document.body.appendChild(container);

  // ─── State ────────────────────────────────────────────────────────
  var isOpen       = false;
  var isLoading    = false;
  var showingForm  = false;
  var greeted      = false;
  var sessionId    = "s_" + Math.random().toString(36).slice(2);
  var history      = [];   // [{role, content}]

  // ─── Element refs ─────────────────────────────────────────────────
  var btn       = document.getElementById("aib-widget-btn");
  var win       = document.getElementById("aib-chat-window");
  var msgs      = document.getElementById("aib-messages");
  var inputEl   = document.getElementById("aib-input");
  var sendBtn   = document.getElementById("aib-send");
  var formArea  = document.getElementById("aib-form-area");
  var inputArea = document.getElementById("aib-input-area");

  // ─── Toggle open/close ────────────────────────────────────────────
  btn.addEventListener("click", function () {
    isOpen = !isOpen;
    btn.classList.toggle("open", isOpen);
    win.classList.toggle("open", isOpen);
    if (isOpen && !greeted) {
      greeted = true;
      appendBot(
        "Hi there! 👋 I'm here to help with any questions about the **AI for Business Unlocked** workshop on April 25th in Gainesville, FL.\n\nWhat would you like to know?"
      );
    }
    if (isOpen) {
      setTimeout(function () { inputEl.focus(); }, 300);
    }
  });

  // ─── Auto-resize textarea ─────────────────────────────────────────
  inputEl.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = Math.min(this.scrollHeight, 100) + "px";
  });

  // ─── Send on Enter (Shift+Enter = newline) ────────────────────────
  inputEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });
  sendBtn.addEventListener("click", send);

  // ─── Send message ─────────────────────────────────────────────────
  function send() {
    var text = inputEl.value.trim();
    if (!text || isLoading || showingForm) return;

    appendUser(text);
    history.push({ role: "user", content: text });
    inputEl.value = "";
    inputEl.style.height = "auto";
    setLoading(true);

    var typing = appendTyping();

    fetch(CHAT_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history, sessionId: sessionId }),
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        removeTyping(typing);
        setLoading(false);
        if (data.error) {
          appendBot("Sorry, something went wrong. Please try again.");
          return;
        }
        var reply = data.reply || "";
        appendBot(reply);
        history.push({ role: "assistant", content: reply });
        if (data.collectLead) {
          setTimeout(revealForm, 600);
        }
      })
      .catch(function () {
        removeTyping(typing);
        setLoading(false);
        appendBot("Sorry, I'm having trouble connecting. Please try again in a moment.");
      });
  }

  // ─── Reveal lead-collection form ──────────────────────────────────
  function revealForm() {
    showingForm = true;
    inputArea.style.display = "none";
    formArea.style.display = "block";
    scroll();

    document.getElementById("aib-form-submit").addEventListener("click", submitForm);
  }

  // ─── Submit contact form ──────────────────────────────────────────
  function submitForm() {
    var name  = document.getElementById("aib-f-name").value.trim();
    var email = document.getElementById("aib-f-email").value.trim();
    var phone = document.getElementById("aib-f-phone").value.trim();
    var biz   = document.getElementById("aib-f-biz").value.trim();
    var issue = document.getElementById("aib-f-issue").value.trim();
    var errEl = document.getElementById("aib-form-error");
    var subEl = document.getElementById("aib-form-submit");

    errEl.style.display = "none";

    if (!name || !email || !issue) {
      errEl.textContent = "Please fill in your name, email, and question.";
      errEl.style.display = "block";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errEl.textContent = "Please enter a valid email address.";
      errEl.style.display = "block";
      return;
    }

    subEl.disabled = true;
    subEl.textContent = "Sending…";

    fetch(CONTACT_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, email: email, phone: phone, business: biz, issue: issue }),
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.ok) {
          formArea.innerHTML =
            '<div class="aib-success">✅ Got it, ' + escHtml(name) + '!<br/>The team will reach out to you soon.</div>';
        } else {
          throw new Error(data.error || "Send failed");
        }
      })
      .catch(function (err) {
        subEl.disabled = false;
        subEl.textContent = "Send Message";
        errEl.textContent = "Something went wrong. Please try again.";
        errEl.style.display = "block";
      });
  }

  // ─── Helpers ──────────────────────────────────────────────────────
  function appendBot(text) {
    var row = document.createElement("div");
    row.className = "aib-msg bot";
    row.innerHTML =
      '<div class="aib-msg-avatar"><img src="/logo.png" alt="AI" /></div>' +
      '<div class="aib-bubble">' + formatText(text) + '</div>';
    msgs.appendChild(row);
    scroll();
    return row;
  }

  function appendUser(text) {
    var row = document.createElement("div");
    row.className = "aib-msg user";
    row.innerHTML = '<div class="aib-bubble">' + escHtml(text) + '</div>';
    msgs.appendChild(row);
    scroll();
  }

  function appendTyping() {
    var row = document.createElement("div");
    row.className = "aib-msg bot";
    row.innerHTML =
      '<div class="aib-msg-avatar"><img src="/logo.png" alt="AI" /></div>' +
      '<div class="aib-bubble aib-typing"><span></span><span></span><span></span></div>';
    msgs.appendChild(row);
    scroll();
    return row;
  }

  function removeTyping(el) { if (el && el.parentNode) el.parentNode.removeChild(el); }

  function setLoading(v) {
    isLoading  = v;
    sendBtn.disabled  = v;
    inputEl.disabled  = v;
  }

  function scroll() {
    setTimeout(function () { msgs.scrollTop = msgs.scrollHeight; }, 50);
  }

  function escHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatText(s) {
    // Basic markdown: **bold**, line breaks, links (no raw HTML from API)
    return escHtml(s)
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
  }
})();
