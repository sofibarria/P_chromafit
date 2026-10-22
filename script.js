document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chatToggle');
    const chatBox = document.getElementById('chatBox');
    const chatClose = document.getElementById('chatClose');
    const chatBody = document.getElementById('chatBody');

    if (!chatToggle || !chatBox || !chatClose || !chatBody) return;

    const initialMenu = chatBody.querySelector('.chat-options');
    if (!initialMenu) return;
    const menuTemplate = initialMenu.cloneNode(true);

    // Campo para escribir sin modificar index.html.
    const form = document.createElement('form');
    form.style.cssText =
        'display:flex;gap:8px;padding:12px;';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Escribe tu consulta…';
    input.setAttribute('aria-label', 'Tu consulta');
    input.maxLength = 500;
    input.style.cssText =
        'flex:1;min-width:0;padding:10px;border-radius:10px;' +
        'border:1px solid #aaa;background:#fff;color:#222;font-size:16px;';

    const send = document.createElement('button');
    send.type = 'submit';
    send.textContent = 'Enviar';
    send.className = 'chat-opt-btn';

    form.append(input, send);
    chatBox.appendChild(form);
    chatBody.setAttribute('aria-live', 'polite');

    function addMessage(text, fromUser = false) {
        const message = document.createElement('p');
        message.className = fromUser ? 'user-msg' : 'bot-msg';
        message.style.cssText =
            'margin-top:12px;white-space:pre-line;overflow-wrap:anywhere;';
        message.textContent = fromUser ? `Tú: ${text}` : text;
        chatBody.appendChild(message);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showMenu() {
        chatBody.querySelectorAll('.chat-options')
            .forEach(menu => menu.remove());
        chatBody.appendChild(menuTemplate.cloneNode(true));
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    const surprises = [
        '🎁 Reto Chromafit: crea tres combinaciones con una prenda ' +
        'que casi nunca uses. Nuestro armario digital te ayuda ' +
        'a organizar tus ideas.',

        '✨ Dato curioso: la iluminación cambia cómo percibimos ' +
        'los colores. La luz natural es útil para comparar tonos.',

        '🎨 Consejo sorpresa: combina prendas neutras con un ' +
        'accesorio de tu color favorito para renovar tu look.'
    ];

    function respond(option) {
        const responses = {
            '1': '🔍 Para explorar prendas y colores, te recomendamos ' +
                'nuestra App Machine Learning. Para crear combinaciones ' +
                'según la ocasión y tus gustos, elige recomendaciones ' +
                'personalizadas de estilo. Para una orientación guiada, ' +
                'conoce la asesoría de imagen virtual.',

            '2': '📌 Si buscas prendas nuevas, te recomendamos la ' +
                'vinculación con catálogos locales. Si quieres aprovechar ' +
                'la ropa que ya tienes, nuestro armario digital te ayuda ' +
                'a organizar tu clóset y planificar combinaciones.',

            '3': '🎨 Te recomendamos el análisis de colorimetría ' +
                'personalizada para explorar los colores que armonizan ' +
                'con tu piel, ojos y cabello. Puedes complementarlo con ' +
                'asesoría de imagen virtual para aplicarlos a tu vestuario.'
        };

        const response = option === '4'
            ? surprises[Math.floor(Math.random() * surprises.length)]
            : responses[option];

        addMessage(response || 'No entendí, ¿puedes elegir una opción?');
        showMenu();
    }

    chatToggle.addEventListener('click', () => {
        const opening = getComputedStyle(chatBox).display === 'none';
        chatBox.style.display = opening ? 'block' : 'none';
        chatToggle.setAttribute('aria-expanded', String(opening));
    });

    chatClose.addEventListener('click', () => {
        chatBox.style.display = 'none';
        chatToggle.setAttribute('aria-expanded', 'false');
        chatToggle.focus();
    });

    chatBody.addEventListener('click', event => {
        const button = event.target.closest('.chat-opt-btn');
        if (!button || !chatBody.contains(button)) return;
        addMessage(button.textContent.trim(), true);
        respond(button.dataset.op);
    });

    form.addEventListener('submit', event => {
        event.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        input.value = '';
        addMessage(text, true);

        const query = text.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        if (/^[1-4]$/.test(query)) {
            respond(query);
        } else if (/sorpresa|regalo|reto/.test(query)) {
            respond('4');
        } else if (/colorimetria|paleta|colores/.test(query)) {
            respond('3');
        } else if (/catalogo|comprar|ropa|closet|armario/.test(query)) {
            respond('2');
        } else if (/outfit|look|estilo|asesoria/.test(query)) {
            respond('1');
        } else {
            if (/direccion|ubicacion|donde/.test(query)) {
                addMessage('📍 Estamos en Ainavillo 456, Concepción, Chile.');
            } else if (/horario|atienden/.test(query)) {
                addMessage('🕒 Lunes a viernes, de 10:00 a 19:00 horas.');
            } else if (/precio|valor|reserva|agendar/.test(query)) {
                addMessage('Para confirmar precios y disponibilidad, ' +
                    'consulta directamente con el equipo de Chromafit.');
            } else if (/^(hola|buenas|menu|inicio)[!. ]*$/.test(query)) {
                addMessage('¡Hola! Bienvenid@ a Chromafit ✨ ' +
                    '¿Qué te gustaría hacer hoy?');
            } else {
                addMessage('No entendí, ¿puedes elegir una opción?');
            }
            showMenu();
        }
    });
});
