function showContact() {
    document.getElementById('contact').style.display = 'block';
}

function toggleMode() {
    document.body.classList.toggle("light-mode");
    document.querySelector(".toggle-mode").textContent = document.body.classList.contains("light-mode") ? "🌞" : "🌙";
}

const canvas = document.getElementById("bg"),
    ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for (let i = 0; i < 120; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = "white";
        ctx.fillRect(p.x, p.y, 3, 3);

        particles.forEach(q => {
            let dist = Math.hypot(p.x - q.x, p.y - q.y);
            if (dist < 120) {
                ctx.strokeStyle = `rgba(255,255,255,${1 - dist / 120})`;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animate);
}

animate();
