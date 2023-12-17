const m = document.getElementById('life').getContext('2d');

const draw = (x, y, c, r) => {
  m.shadowBlur = 50;
  m.shadowColor = 'rgba(241, 176, 165, 2)';

  m.beginPath();
  m.arc(x, y, r, 0, 2 * Math.PI);
  m.fillStyle = c;
  m.fill();

  m.shadowBlur = 0;
  m.shadowColor = 'transparent';
};

const particles = [];

const particle = (x, y, c) => {
  return { x: x, y: y, vx: 0, vy: 0, color: c };
};

const random = () => {
  return Math.random() * 800 + 50;
};

const create = (number, color) => {
  const group = [];
  for (let i = 0; i < number; i++) {
    group.push(particle(random(), random(), color));
    particles.push(group[i]);
  }
  return group;
};

const rule = (particles1, particles2, g) => {
  for (let i = 0; i < particles1.length; i++) {
    let fx = 0;
    let fy = 0;
    for (let j = 0; j < particles2.length; j++) {
      const a = particles1[i];
      const b = particles2[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 0 && dist < 80) {
        const F = (g * 1) / dist;
        fx += F * dx;
        fy += F * dy;
      }
      a.vx = (a.vx + fx) * 0.1;
      a.vy = (a.vy + fy) * 0.1;
      a.x += a.vx;
      a.y += a.vy;
      if (a.x <= 0 || a.x >= 500) {
        a.vx *= -1;
      }
      if (a.y <= 0 || a.y >= 500) {
        a.vy *= -1;
      }
    }
  }
};

const blue = create(300, 'blue');
const fuchsia = create(600, 'fuchsia');
const lime = create(500, 'lime');

const update = () => {
  rule(lime, lime, -0.02);
  rule(lime, fuchsia, 0.04);
  rule(lime, blue, 0.03);
  rule(fuchsia, fuchsia, 0.005);
  rule(fuchsia, lime, 0.05);
  rule(blue, blue, 0.005);
  rule(blue, lime, -0.01);

  // rule(lime, lime, -0.32);
  // rule(lime, fuchsia, -0.17);
  // rule(lime, blue, 0.34);
  // rule(fuchsia, fuchsia, -0.1);
  // rule(fuchsia, lime, -0.34);
  // rule(blue, blue, 0.15);
  // rule(blue, lime, -0.2);

  m.clearRect(0, 0, 500, 500);
  draw(0, 0, '#000000', 5000);

  for (let i = 0; i < particles.length; i++) {
    draw(particles[i].x, particles[i].y, particles[i].color, 2.2); // 크기 조절
  }

  requestAnimationFrame(update);
};

update();
