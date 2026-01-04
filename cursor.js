// Run cursor only on desktop devices
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {

  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  let mouseX = 0;
  let mouseY = 0;
  let x = 0;
  let y = 0;

  let lastX = 0;
  let lastY = 0;
  let scale = 1;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Hover detection (links, buttons, clickable elements)
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest("a, button, input, textarea, select, label")) {
      cursor.classList.add("hover");
    }
  });

  document.addEventListener("mouseout", () => {
    cursor.classList.remove("hover");
  });

  function animate() {
    // smooth follow
    x += (mouseX - x) * 0.18;
    y += (mouseY - y) * 0.18;

    // velocity-based scale
    const dx = x - lastX;
    const dy = y - lastY;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (speed > 0.2) {
      scale = 0.9;
    } else {
      scale += (1 - scale) * 0.1;
    }

    cursor.style.transform = `
      translate(${x - 16}px, ${y - 16}px)
      scale(${scale})
    `;

    lastX = x;
    lastY = y;

    requestAnimationFrame(animate);
  }

  animate();
}

