document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('chatToggle');
    const box = document.getElementById('chatBox');
    const close = document.getElementById('chatClose');
    const body = document.getElementById('chatBody');

    if (!toggle || !box || !close || !body) return;

    // Cada paso tiene una respuesta breve y nuevas opciones.
    const steps = {
        inicio: {
            text: '¡Hola! Soy tu asistente Chromafit ✨ ¿Qué exploramos hoy?',
            options: [
                ['👗 Armar un look', 'look'],
                ['🎨 Descubrir mis colores', 'colores'],
                ['🛍️ Renovar mi clóset', 'closet'],
                ['🎁 ¡Sorpréndeme!', 'sorpresa']
            ]
        },

        look: {
            text: '¡Vamos con ese look! 👗 ¿Para qué ocasión?',
            options: [
                ['☀️ Para el día a día', 'casual'],
                ['💼 Trabajo o presentación', 'formal'],
                ['🎉 Una salida o evento', 'evento']
            ]
        },

        casual: {
            text: '¡Cómodo y con tu sello! ✨ ¿Qué prefieres?',
            options: [
                ['👟 Algo relajado', 'relajado'],
                ['🧥 Algo más arreglado', 'arreglado']
            ]
        },

        relajado: {
            text: 'Prueba jeans, una polera lisa y zapatillas 👟 ' +
                'Nuestras recomendaciones de estilo te ayudan a combinar lo que tienes.',
            options: [
                ['🎨 Elegir colores', 'colores'],
                ['👚 Usar mi ropa actual', 'organizar']
            ]
        },

        arreglado: {
            text: 'Un pantalón recto, una blusa o camisa y una chaqueta ' +
                'pueden ser un buen comienzo ✨ ¿Seguimos?',
            options: [
                ['🎨 Ver colores', 'colores'],
                ['💬 Conocer la asesoría', 'asesoria']
            ]
        },

        formal: {
            text: '¡Vamos a buscar algo que te haga sentir a gusto! 💼 ' +
                'Nuestra asesoría de imagen virtual puede orientarte.',
            options: [
                ['💬 ¿Cómo me ayuda?', 'asesoria'],
                ['🎨 Quiero elegir colores', 'colores']
            ]
        },

        evento: {
            text: '¡Démosle un toque especial! 🎉 ¿Qué estilo te gusta?',
            options: [
                ['✨ Elegante y sencillo', 'elegante'],
                ['🌈 Colorido y creativo', 'creativo']
            ]
        },

        elegante: {
            text: 'Prueba una base de un solo color y un accesorio protagonista ✨ ' +
                'Nuestra asesoría virtual te ayuda a personalizarlo.',
            options: [
                ['💬 Ver asesoría', 'asesoria'],
                ['🎨 Explorar mi paleta', 'colores']
            ]
        },

        creativo: {
            text: '¡Juguemos con el color! 🌈 Elige una prenda llamativa ' +
                'y acompáñala con tonos neutros.',
            options: [
                ['🎨 Descubrir colores', 'colores'],
                ['🛍️ Buscar prendas', 'comprar']
            ]
        },

        colores: {
            text: '¡Exploremos tus colores! 🎨 ¿Ya conoces tu paleta?',
            options: [
                ['🙋 Sí, ya la conozco', 'paleta'],
                ['🔍 Todavía no', 'descubrir']
            ]
        },

        paleta: {
            text: '¡Buenísimo! Puedes usarla como inspiración, ' +
                'siempre dando espacio a tus gustos 💛 ¿Qué necesitas?',
            options: [
                ['👗 Ideas para combinar', 'look'],
                ['🛍️ Buscar ropa', 'comprar']
            ]
        },

        descubrir: {
            text: 'Nuestro análisis de colorimetría te orienta sobre tonos ' +
                'que armonizan contigo ✨ ¿Quieres un consejo o saber dónde estamos?',
            options: [
                ['💡 Un consejo', 'consejo'],
                ['📍 Dónde están', 'ubicacion']
            ]
        },

        consejo: {
            text: 'Compara prendas cerca de tu rostro con luz natural 🎨 ' +
                'Es una primera exploración; una evaluación ayuda a definir tu paleta.',
            options: [
                ['📍 Conocer el estudio', 'ubicacion'],
                ['👗 Armar un look', 'look']
            ]
        },

        closet: {
            text: '¡Tu clóset tiene posibilidades! 👚 ¿Qué te gustaría hacer?',
            options: [
                ['🛍️ Buscar ropa nueva', 'comprar'],
                ['♻️ Aprovechar lo que tengo', 'organizar']
            ]
        },

        comprar: {
            text: 'Nuestra vinculación con catálogos locales te orienta ' +
                'hacia tiendas y marcas 🛍️ ¿Qué buscas?',
            options: [
                ['👕 Prendas para cada día', 'compraDiaria'],
                ['🎉 Algo para una ocasión', 'evento']
            ]
        },

        compraDiaria: {
            text: 'Empieza por una prenda que combine con varias que ya tengas 💡 ' +
                'Las recomendaciones de estilo pueden ayudarte a elegir.',
            options: [
                ['👗 Explorar looks', 'look'],
                ['🎨 Ver colores', 'colores']
            ]
        },

        organizar: {
            text: '¡Hagamos rendir tu ropa! ♻️ Nuestro armario digital ' +
                'te ayuda a organizar prendas y planificar combinaciones.',
            options: [
                ['💡 Dame un reto', 'reto'],
                ['👗 Armar un look', 'look']
            ]
        },

        reto: {
            text: 'Tu reto: elige una prenda olvidada y crea dos looks ' +
                'con ella ✨ ¡Quizás encuentres un nuevo favorito!',
            options: [
                ['👗 Quiero ideas', 'look'],
                ['🎁 Otra sorpresa', 'sorpresa']
            ]
        },

        asesoria: {
            text: 'Te orientamos sobre prendas, colores y combinaciones ' +
                'según tus gustos y rutina 💬 ¿Qué quieres conocer?',
            options: [
                ['🤖 Qué hace la app', 'app'],
                ['📍 Dirección y horario', 'ubicacion']
            ]
        },

        app: {
            text: 'La App Machine Learning está pensada para reconocer ' +
                'prendas y colores 🤖 Este chat te orienta sobre los servicios.',
            options: [
                ['🎨 Ver colorimetría', 'colores'],
                ['👗 Explorar estilos', 'look']
            ]
        },

        ubicacion: {
            text: '📍 Ainavillo 456, Concepción.\n' +
                '🕒 Lunes a viernes, de 10:00 a 19:00.\n' +
                'Para precios y reservas, consulta con el equipo.',
            options: [
                ['💬 Conocer la asesoría', 'asesoria'],
                ['🎁 ¡Sorpréndeme!', 'sorpresa']
            ]
        }
    };

    const surprises = [
        {
            text: '🎁 Reto exprés: ¡crea un look con una prenda ' +
                'que hace tiempo no usas!',
            options: [
                ['👗 Ayúdame con el look', 'look'],
                ['♻️ Organizar mi ropa', 'organizar']
            ]
        },
        {
            text: '✨ ¿Sabías que la iluminación cambia cómo ' +
                'vemos los colores? ¡Prueba comparar una prenda bajo distintas luces!',
            options: [
                ['🎨 Explorar mis colores', 'colores'],
                ['🎁 Otra sorpresa', 'sorpresa']
            ]
        },
        {
            text: '🌈 Idea del día: suma un accesorio de tu color ' +
                'favorito a un look neutro. ¡Un detalle cambia mucho!',
            options: [
                ['👗 Más ideas', 'look'],
                ['🎁 Otra sorpresa', 'sorpresa']
            ]
        }
    ];

    body.replaceChildren();
    body.setAttribute('aria-live', 'polite');

    let lastSurprise = -1;

    function addMessage(text, user = false) {
        const message = document.createElement('p');
        message.className = user ? 'user-msg' : 'bot-msg';
        message.textContent = text;
        message.style.cssText =
            'margin:12px 0;white-space:pre-line;overflow-wrap:anywhere;' +
            (user ? 'text-align:right;font-weight:600;' : '');
        body.appendChild(message);
    }

    function showStep(id) {
        body.querySelectorAll('.chat-options')
            .forEach(menu => menu.remove());

        let step = steps[id];

        if (id === 'sorpresa') {
            const available = surprises
                .map((_, index) => index)
                .filter(index => index !== lastSurprise);

            lastSurprise = available[
                Math.floor(Math.random() * available.length)
            ];
            step = surprises[lastSurprise];
        }

        if (!step) {
            step = {
                text: 'No entendí, ¿puedes elegir una opción? 😊',
                options: steps.inicio.options
            };
        }

        addMessage(step.text);

        const menu = document.createElement('div');
        menu.className = 'chat-options';
        menu.style.cssText =
            'display:flex;flex-direction:column;gap:8px;';

        const options = [...step.options];

        if (id !== 'inicio' && step !== steps.inicio) {
            options.push(['🏠 Volver al inicio', 'inicio']);
        }

        options.forEach(([label, next]) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'chat-opt-btn';
            button.textContent = label;
            button.dataset.step = next;
            menu.appendChild(button);
        });

        body.appendChild(menu);
        body.scrollTop = body.scrollHeight;
    }

    body.addEventListener('click', event => {
        const button = event.target.closest('button[data-step]');
        if (!button || !body.contains(button)) return;

        addMessage(button.textContent, true);
        showStep(button.dataset.step);
    });

    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', () => {
        const opening = getComputedStyle(box).display === 'none';
        box.style.display = opening ? 'block' : 'none';
        toggle.setAttribute('aria-expanded', String(opening));
    });

    close.addEventListener('click', () => {
        box.style.display = 'none';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
    });

    // Permite comprobar la respuesta a mensajes no reconocidos.
    const form = document.createElement('form');
    form.style.cssText = 'display:flex;gap:8px;padding:12px;';

    const input = document.createElement('input');
    input.placeholder = 'O escribe “menú”…';
    input.setAttribute('aria-label', 'Escribe un mensaje');
    input.maxLength = 300;
    input.style.cssText =
        'flex:1;min-width:0;padding:10px;border-radius:10px;' +
        'border:1px solid #ccc;color:#222;background:white;font-size:16px;';

    const send = document.createElement('button');
    send.type = 'submit';
    send.textContent = 'Enviar';
    send.className = 'chat-opt-btn';

    form.append(input, send);
    box.appendChild(form);

    form.addEventListener('submit', event => {
        event.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, true);
        input.value = '';

        const normalized = text.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        const recognized = {
            'hola': 'inicio',
            'menu': 'inicio',
            'inicio': 'inicio',
            'look': 'look',
            'colores': 'colores',
            'closet': 'closet',
            'sorpresa': 'sorpresa'
        };

        showStep(recognized[normalized] || 'desconocido');
    });

    showStep('inicio');
});
