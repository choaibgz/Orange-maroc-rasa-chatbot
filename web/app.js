const messages = document.querySelector("#messages");
const form = document.querySelector("#chatForm");
const input = document.querySelector("#messageInput");
const clearChat = document.querySelector("#clearChat");
const quickActions = document.querySelectorAll("[data-message]");

const senderId = `web-${Math.random().toString(36).slice(2)}`;
const endpoint = "/webhooks/rest/webhook";

function addMessage(text, type = "bot", extraClass = "") {
  const bubble = document.createElement("div");
  bubble.className = `message ${type} ${extraClass}`.trim();
  bubble.textContent = text;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
  return bubble;
}

function resetChat() {
  messages.innerHTML = "";
  addMessage("Bonjour, bienvenue chez Orange Maroc. Comment puis-je vous aider aujourd'hui ?");
}

async function sendMessage(text) {
  const content = text.trim();
  if (!content) return;

  addMessage(content, "user");
  const loading = addMessage("Reponse en cours...", "bot", "loading");

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender: senderId, message: content }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    loading.remove();

    if (!data.length) {
      addMessage("Je n'ai pas de reponse pour cette demande. Pouvez-vous reformuler ?");
      return;
    }

    data.forEach((item) => {
      if (item.text) addMessage(item.text);
    });
  } catch (error) {
    loading.remove();
    addMessage("Le serveur Rasa n'est pas joignable. Verifiez que Docker Compose est lance.");
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value;
  input.value = "";
  sendMessage(text);
});

clearChat.addEventListener("click", resetChat);

quickActions.forEach((button) => {
  button.addEventListener("click", () => {
    sendMessage(button.dataset.message);
  });
});

resetChat();
