const cursor = document.createElement("div");
cursor.className = "custom-cursor";
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let x = 0;
let y = 0;

let lastX = 0;
let lastY = 0;
let rotation = 0;
let scale = 1;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  // smooth follow
  x += (mouseX - x) * 0.18;
  y += (mouseY - y) * 0.18;

  // velocity
  const dx = x - lastX;
  const dy = y - lastY;
  const speed = Math.sqrt(dx * dx + dy * dy);

  // rotation
  if (speed > 0.2) {
    rotation = Math.atan2(dy, dx) * (180 / Math.PI);
    scale = 0.85;
  } else {
    scale += (1 - scale) * 0.1;
  }

  cursor.style.transform = `
    translate(${x - 11}px, ${y - 11}px)
    rotate(${rotation}deg)
    scale(${scale})
  `;

  lastX = x;
  lastY = y;

  requestAnimationFrame(animate);
}

animate();

