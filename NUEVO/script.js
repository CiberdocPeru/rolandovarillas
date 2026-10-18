const menuButton = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
  primaryNav?.classList.toggle('is-open', !isOpen);
});

primaryNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menú');
    primaryNav.classList.remove('is-open');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const bookingForm = document.querySelector('#booking-form');
const formStatus = document.querySelector('#form-status');
const phonePrefix = document.querySelector('#phone-prefix');
const customPrefix = document.querySelector('#custom-prefix');

phonePrefix?.addEventListener('change', () => {
  const usesCustomPrefix = phonePrefix.value === 'other';
  customPrefix.hidden = !usesCustomPrefix;
  customPrefix.required = usesCustomPrefix;
  if (usesCustomPrefix) customPrefix.focus();
});

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.classList.remove('error');

  if (!bookingForm.reportValidity()) {
    formStatus.textContent = 'Revisa los campos requeridos para continuar.';
    formStatus.classList.add('error');
    return;
  }

  const data = new FormData(bookingForm);
  const prefix = data.get('phone-prefix') === 'other'
    ? String(data.get('custom-prefix') || '').trim()
    : String(data.get('phone-prefix') || '');
  const phoneNumber = String(data.get('phone') || '').trim();
  const message = encodeURIComponent([
    'Hola, quisiera solicitar información o una cita con el Dr. Rolando Varillas.',
    `Nombre: ${data.get('name')}`,
    `Correo: ${data.get('email')}`,
    `Teléfono: ${prefix} ${phoneNumber}`.trim(),
    `Modalidad de preferencia: ${data.get('modality') || 'No especificada'}`,
    `Mensaje: ${data.get('message') || 'Sin mensaje adicional'}`
  ].join('\n'));

  window.open(`https://wa.me/51999177788?text=${message}`, '_blank', 'noopener,noreferrer');
  formStatus.textContent = 'Se abrió WhatsApp con tu solicitud lista para enviar.';
});
