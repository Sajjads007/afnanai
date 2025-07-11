document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ajax");
  const input = document.getElementById("user_input");
  const chatBox = document.getElementById("chat-box");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    // Show user's message
    chatBox.innerHTML = "";  // 🔥 Clear previous messages
    chatBox.innerHTML += `<div class="chat-message user"><strong>You:</strong> ${message}</div>`;
    input.value = "";

    // Add Afnan is thinking
    const thinking = document.createElement("div");
    thinking.className = "chat-message bot";
    thinking.id = "thinking-msg";
    thinking.innerHTML = "<strong>Afnan:</strong> <em>Thinking...</em>";
    chatBox.appendChild(thinking);

    // AJAX call
    fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRFToken": CSRF_TOKEN
      },
      body: `user_input=${encodeURIComponent(message)}`
    })
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const botReply = doc.querySelector(".chat-message.bot")?.innerHTML;

      const thinkingDiv = document.getElementById("thinking-msg");
      if (botReply && thinkingDiv) {
        thinkingDiv.innerHTML = botReply;
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    })
    .catch(() => {
      const thinkingDiv = document.getElementById("thinking-msg");
      if (thinkingDiv) {
        thinkingDiv.innerHTML = "<strong>Afnan:</strong> ⚠️ Something went wrong.";
      }
    });
  });
});
