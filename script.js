document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            sections.forEach(section => {
                section.classList.remove('visible');
                section.classList.add('hidden');
            });

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.classList.remove('hidden');
                targetSection.classList.add('visible');
            }
        });
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            try {
                console.log('Enviando dados:', data);

                const response = await fetch('http://localhost:3003/submit-form', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    throw new Error(`Erro: ${response.statusText}`);
                }

                const responseData = await response.text();
                console.log('Resposta do servidor:', responseData);

                document.getElementById('response-message').textContent = responseData;
                contactForm.reset();
            } catch (error) {
                console.error('Erro ao enviar o formulário:', error);
                document.getElementById('response-message').textContent = `Erro: ${error.message}`;
            }
        });
    }
});
