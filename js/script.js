// Particle with mouseover.
const html = document.querySelector('html');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const turnOffParticles = document.getElementById('partical-effect-off');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  

class Particle {
  constructor(x, y, radius, color, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx; 
    this.dy = dy; 
    this.opacity = 0.5; 
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    this.opacity -= 0.01;

    this.draw();
  }
}

const particles = [];

html.addEventListener('mousemove', e => {
  if (turnOffParticles.checked || reduceMotion.matches) return;
  const radius = Math.random() * 3 + 1;
  const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
  const dx = Math.random() * 2 - 1;
  const dy = Math.random() * 2 - 1;
  particles.push(new Particle(e.clientX, e.clientY, radius, color, dx, dy));
});

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    particle.update();
    if (particle.opacity <= 0.1) {
      particles.splice(index, 1);
    }
  });
}

animate();


// Make current section button active.
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });

    if (!current) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
    }
});



// Scroll to section with offset.
var navHeight = document.querySelector('nav').offsetHeight;

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();

        var targetId = this.getAttribute('href').substring(1);

        var targetElement = document.getElementById(targetId);

        if (targetElement) {
            if (window.innerWidth <= 1000) {
                var targetPosition = targetElement.offsetTop - navHeight;
            }
            else {
                var targetPosition = targetElement.offsetTop;
            }

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Listen if system is in dark mode, hide element with "x-light" id.
const xLight = document.getElementById('x-light');
const xDark = document.getElementById('x-dark');

const darkMode = window.matchMedia('(prefers-color-scheme: dark)');

if (darkMode.matches) {
    xLight.style.display = 'none';
    xDark.style.display = 'block';
} else {
    xLight.style.display = 'block';
    xDark.style.display = 'none';
}

darkMode.addEventListener('change', () => {
    if (darkMode.matches) {
        xLight.style.display = 'none';
        xDark.style.display = 'block';
    } else {
        xLight.style.display = 'block';
        xDark.style.display = 'none';
    }
});