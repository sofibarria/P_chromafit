document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chatToggle');
    const chatBox = document.getElementById('chatBox');
    const chatClose = document.getElementById('chatClose');
    const chatBody = document.getElementById('chatBody');

    // Abrir/Cerrar chat
    chatToggle.addEventListener('click', () => {
        chatBox.style.display = chatBox.style.display === 'none' ? 'block' : 'none';
    });

    chatClose.addEventListener('click', () => {
        chatBox.style.display = 'none';
    });

    // Interacción de botones del chat
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('chat-opt-btn')) {
            const option = e.target.getAttribute('data-op');
            let responseText = "";

            switch(option) {
                case "1":
                    responseText = "✨ ¡Nuestra App de Machine Learning escanea tu foto y detecta tus mejores colores al instante!";
                    break;
                case "2":
                    responseText = "📌 Te conectamos con catálogos de tiendas locales en Concepción para encontrar tu ropa ideal.";
                    break;
                case "3":
                    responseText = "🎨 Tu colorimetría define qué tonos iluminan tu rostro. ¡Visítanos en Ainavillo 456!";
                    break;
                case "4":
                    responseText = "🎁 ¡Sorpresa! Usa el código **CHROMA10** para obtener un 10% de descuento en tu primera asesoría virtual.";
                    break;
            }

            // Mostrar respuesta en el chat
            const p = document.createElement('p');
            p.className = 'bot-msg';
            p.style.marginTop = '10px';
            p.style.color = '#F6EFEA';
            p.innerHTML = responseText;
            chatBody.appendChild(p);
            
            // Auto scroll hacia abajo
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    });
});
