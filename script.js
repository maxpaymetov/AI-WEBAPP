function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (!message) return;

  appendMessage('Вы', message);
  input.value = '';

  // Пример отправки сообщения (можно заменить на real backend)
  fetch('https://api-inference.huggingface.co/models/gpt2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  })
  .then(res => res.json())
  .then(data => {
    appendMessage('AI', data.reply || 'Нет ответа...');
  })
  .catch(() => appendMessage('AI', 'Ошибка подключения.'));
}

function appendMessage(sender, message) {
  const chatbox = document.getElementById('chatbox');
  const div = document.createElement('div');
  div.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}
