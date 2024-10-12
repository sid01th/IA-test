const chatBox = document.getElementById('chat-box');

// Função para enviar a mensagem ao backend
async function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  if (userInput.trim() === '') return;

  // Exibe a mensagem do usuário no chat
  const userMessageDiv = document.createElement('div');
  userMessageDiv.textContent = 'Você: ' + userInput;
  chatBox.appendChild(userMessageDiv);

  // Envia a mensagem para o backend
  try {
    const response = await fetch('/send-message', { // A URL agora é relativa
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: userInput }),
    });

    const data = await response.json();
    const aiMessageDiv = document.createElement('div');
    aiMessageDiv.textContent = 'AI: ' + (data.response || 'Sem resposta');
    chatBox.appendChild(aiMessageDiv);
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    const errorMessageDiv = document.createElement('div');
    errorMessageDiv.textContent = 'Erro ao enviar mensagem. Tente novamente.';
    chatBox.appendChild(errorMessageDiv);
  }

  // Limpa o campo de entrada
  document.getElementById('user-input').value = '';
  chatBox.scrollTop = chatBox.scrollHeight; // Rola para o final
}
