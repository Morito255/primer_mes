(() => {
  const flower = document.querySelector('#flower-portal');
  const bloomButton = document.querySelector('#bloom-button');
  const phrase = document.querySelector('#bloom-phrase');
  const field = document.querySelector('#petal-field');
  const portrait = document.querySelector('.portrait');
  const phrases = [
    'En este primer mes, hasta los días sencillos han florecido contigo.',
    'Como un lirio al sol, mi mundo se abre un poco más a tu lado.',
    'Un mes contigo y ya eres mi lugar favorito para florecer.',
    'Que lo nuestro crezca despacio, bonito y lleno de luz.',
    'Tú haces que cada instante eche raíces en mi corazón.',
    'Este primer mes es el primer pétalo de todo lo que nos espera.'
  ];
  let phraseIndex = -1;
  let typingTimer;
  let resetTimer;

  function bloom(event) {
    flower.classList.remove('awakened');
    void flower.offsetWidth;
    flower.classList.add('awakened');
    clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => flower.classList.remove('awakened'), 1050);

    const originX = event.clientX || window.innerWidth / 2;
    const originY = event.clientY || window.innerHeight / 2;
    for (let i = 0; i < 12; i++) {
      const petal = document.createElement('i');
      const angle = (Math.PI * 2 * i) / 12 + Math.random() * .35;
      const distance = 75 + Math.random() * 145;
      petal.className = 'floating-petal';
      petal.style.left = originX + 'px';
      petal.style.top = originY + 'px';
      petal.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
      petal.style.setProperty('--dy', Math.sin(angle) * distance + 'px');
      petal.style.setProperty('--rot', Math.round(Math.random() * 260 - 130) + 'deg');
      petal.style.animationDelay = Math.random() * 100 + 'ms';
      field.append(petal);
      petal.addEventListener('animationend', () => petal.remove(), { once: true });
    }
  }

  flower.addEventListener('click', bloom);
  portrait.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = portrait.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    flower.style.transform = `translate(calc(-50% + ${x * -13}px), calc(-50% + ${y * -9}px))`;
  });
  portrait.addEventListener('pointerleave', () => { flower.style.transform = ''; });
  bloomButton.addEventListener('click', () => {
    clearTimeout(typingTimer);
    phraseIndex = (phraseIndex + 1) % phrases.length;
    const line = phrases[phraseIndex];
    phrase.hidden = false;
    phrase.textContent = '';
    phrase.classList.remove('is-typing', 'is-visible');
    void phrase.offsetWidth;
    phrase.classList.add('is-visible');
    phrase.classList.add('is-typing');
    bloomButton.setAttribute('aria-expanded', 'true');
    let position = 0;
    const typeCharacter = () => {
      phrase.textContent = line.slice(0, ++position);
      if (position < line.length) typingTimer = window.setTimeout(typeCharacter, 32);
      else phrase.classList.remove('is-typing');
    };
    typeCharacter();
    const rect = flower.getBoundingClientRect();
    bloom({ clientX: rect.left + rect.width * .5, clientY: rect.top + rect.height * .4 });
  });
})();
