 const steps = {
    start: {
      question: "Vai šobrīd vēlies būt produktīvs?",
      answers: {
        Jā: "productiveType",
        Nē: "entertainmentType"
      }
    },
    productiveType: {
      question: "Ko vēlies darīt?",
      answers: {
        strādāt: "workType",
        mācīties: "learnField"
      }
    },
    workType: {
      question: "Kāda veida darbs?",
      answers: {
        komandas: "https://asana.com/",
        individuālais: "https://www.notion.com/desktop",
        plānošana: "https://trello.com/"
      }
    },
    learnField: {
      question: "Ko vēlies mācīties?",
      answers: {
        valodas: "https://www.duolingo.com/",
        programmēšanu: "https://www.freecodecamp.org/",
        universitātes: "https://www.coursera.org/",
        māksla: "https://www.skillshare.com/"
      }
    },
    entertainmentType: {
      question: "Kāda veida izklaide?",
      answers: {
        video: "https://www.youtube.com/",
        spēles: "gameType",
        mūzika: "https://www.spotify.com/",
        sociālie: "socialType",
        grāmatas: "bookType",
        ceļošana: "travelType"
      }
    },
    gameType: {
      question: "Kādas spēles tev patīk?",
      answers: {
        datora: "https://store.steampowered.com/",
        mobilās: "https://play.google.com/store/apps"
      }
    },
    socialType: {
      question: "Kādu sociālo tīklu saturu vēlies?",
      answers: {
        foto: "https://www.instagram.com/",
        video: "https://www.tiktok.com/"
      }
    },
    bookType: {
      question: "Ko labprātāk lasītu?",
      answers: {
        grāmatas: "https://www.goodreads.com/",
        komiksi: "https://www.webtoons.com/"
      }
    },
    travelType: {
      question: "Ko meklē?",
      answers: {
        ceļojumu_plānošana: "https://www.booking.com/",
        iedvesma: "https://www.pinterest.com/"
      }
    }
  };

  let currentStep = null;
  let history = [];

  function startTest() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    currentStep = 'start';
    history = [];
    showQuestion(true);
  }

  function next(answer) {
    const step = steps[currentStep];
    if (typeof step.answers[answer] === 'string' && step.answers[answer].startsWith('http')) {
      animateOut(() => {
        launchExplosion();
        document.getElementById('question').style.display = 'none';
        document.getElementById('answers').style.display = 'none';
        document.getElementById('backBtn').style.display = 'inline-block';
        document.getElementById('result').innerHTML = `
          Tev piemērotā mājaslapa:<br>
          <a class="link" href="${step.answers[answer]}" target="_blank">${step.answers[answer]}</a>
        `;
      });
    } else {
      history.push(currentStep);
      currentStep = step.answers[answer];
      showQuestion();
    }
  }

  function showQuestion(first = false) {
    const step = steps[currentStep];
    const q = document.getElementById('question');
    const answersDiv = document.getElementById('answers');
    if (!first) animateOut(() => updateQuestion(step));
    else updateQuestion(step);
  }

  function updateQuestion(step) {
    const q = document.getElementById('question');
    const answersDiv = document.getElementById('answers');
    q.innerText = step.question;
    document.getElementById('result').innerHTML = '';
    q.style.display = 'block';
    answersDiv.style.display = 'block';
    answersDiv.innerHTML = '';
    for (let key in step.answers) {
      const btn = document.createElement('button');
      btn.innerText = key.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
      btn.className = 'quiz-button fade-in';
      btn.onclick = () => next(key);
      answersDiv.appendChild(btn);
    }
    q.classList.add('fade-in');
    setTimeout(() => q.classList.remove('fade-in'), 500);
    document.getElementById('backBtn').style.display = history.length > 0 ? 'inline-block' : 'none';
  }

  function animateOut(callback) {
    const q = document.getElementById('question');
    const answersDiv = document.getElementById('answers');
    q.classList.add('fade-out');
    Array.from(answersDiv.children).forEach(btn => btn.classList.add('fade-out'));
    setTimeout(() => {
      q.classList.remove('fade-out');
      Array.from(answersDiv.children).forEach(btn => btn.remove());
      callback();
    }, 300);
  }

  function goBack() {
    if (history.length > 0) {
      currentStep = history.pop();
      showQuestion();
    }
  }

 function launchExplosion() {
  const flash = document.createElement('div');
  flash.style.position = 'fixed';
  flash.style.top = '0';
  flash.style.left = '0';
  flash.style.width = '100vw';
  flash.style.height = '100vh';
  flash.style.background = 'white';
  flash.style.opacity = '1';
  flash.style.zIndex = '9999';
  flash.style.pointerEvents = 'none';
  flash.style.transition = 'opacity 0.6s ease-out';
  document.body.appendChild(flash);
  setTimeout(() => flash.style.opacity = '0', 100);
  setTimeout(() => flash.remove(), 800);

  document.body.classList.add('shake');
  setTimeout(() => document.body.classList.remove('shake'), 1000);

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const colors = ['#ff3838', '#f8d90f', '#40c057', '#1e90ff', '#9b59b6', '#ff6b6b'];

  for (let i = 0; i < 250; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 14 + 8;
    const color = colors[Math.floor(Math.random() * colors.length)];

    Object.assign(particle.style, {
      position: 'fixed',
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      backgroundColor: color,
      boxShadow: `0 0 8px ${color}`,
      left: `${centerX}px`,
      top: `${centerY}px`,
      zIndex: 9999,
      pointerEvents: 'none',
      opacity: 1,
      transform: 'translate(-50%, -50%) scale(1)'
    });

    document.body.appendChild(particle);

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * window.innerWidth * 1.2;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    particle.animate([
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.2)`, opacity: 0 }
    ], {
      duration: 3000,
      easing: 'ease-out'
    });

    setTimeout(() => particle.remove(), 3000);
  }
}