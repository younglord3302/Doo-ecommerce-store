import React, { useRef, useEffect } from 'react';

const CosmicBackground = () => {
  const canvasRef = useRef(null);
  const collectedCountRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width, height;
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    const particleCount = 200;
    const mouse = { x: -100, y: -100, isDown: false };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5;
        this.alpha = Math.random() * 0.4 + 0.1;
        this.color = Math.random() > 0.5 ? '#8456ff' : '#00c6ff';
        this.isCollecting = false;
      }

      update() {
        if (this.isCollecting) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 5) {
            this.reset();
            return true; 
          }
          
          this.vx += dx * 0.02;
          this.vy += dy * 0.02;
          this.vx *= 0.94;
          this.vy *= 0.94;
        } else {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 200) {
            const force = (200 - dist) / 200;
            this.vx += dx * force * 0.001;
            this.vy += dy * force * 0.001;
          }
          
          this.vx *= 0.99;
          this.vy *= 0.99;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
        
        return false;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        
        if (this.isCollecting) {
           ctx.shadowBlur = 15;
           ctx.shadowColor = this.color;
        } else {
           ctx.shadowBlur = 0;
        }
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawStar = (x, y, size) => {
      // Core (Intense White)
      const coreGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 0.15);
      coreGradient.addColorStop(0, '#ffffff');
      coreGradient.addColorStop(1, '#8456ff');
      
      ctx.beginPath();
      ctx.arc(x, y, size * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.globalAlpha = 1;
      ctx.fill();
      
      // Secondary Layer (Indigo Hub)
      const midGradient = ctx.createRadialGradient(x, y, size * 0.15, x, y, size * 0.4);
      midGradient.addColorStop(0, '#8456ff');
      midGradient.addColorStop(1, 'rgba(0, 198, 255, 0.3)');
      
      ctx.beginPath();
      ctx.arc(x, y, size * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = midGradient;
      ctx.globalAlpha = 0.6;
      ctx.fill();

      // Atmospheric Glow (Cyan Aura)
      const outerGradient = ctx.createRadialGradient(x, y, size * 0.4, x, y, size);
      outerGradient.addColorStop(0, 'rgba(0, 198, 255, 0.3)');
      outerGradient.addColorStop(1, 'transparent');
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = outerGradient;
      ctx.globalAlpha = 0.4;
      ctx.fill();

      // Lens Flare Rays
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Date.now() / 5000);
      ctx.shadowBlur = 40;
      ctx.shadowColor = '#8456ff';
      ctx.strokeStyle = 'rgba(132, 86, 255, 0.2)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.moveTo(-size * 1.5, 0);
          ctx.lineTo(size * 1.5, 0);
          ctx.stroke();
          ctx.rotate(Math.PI / 4);
      }
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      let collectedThisFrame = 0;

      particles.forEach(p => {
        if (mouse.isDown && !p.isCollecting) {
             const dx = mouse.x - p.x;
             const dy = mouse.y - p.y;
             if (Math.sqrt(dx*dx + dy*dy) < 300) {
                 p.isCollecting = true;
             }
        }
        
        if (!mouse.isDown) p.isCollecting = false;

        const collected = p.update();
        if (collected) collectedThisFrame++;
        p.draw();
      });

      if (collectedThisFrame > 0) {
        collectedCountRef.current += collectedThisFrame;
      } else if (!mouse.isDown && collectedCountRef.current > 0) {
        // Faster decay when not interacting
        collectedCountRef.current = Math.max(0, collectedCountRef.current - 1.5);
      }

      const count = collectedCountRef.current;
      if (count > 0) {
          const currentSize = Math.min(25 + count * 0.12, 130);
          drawStar(mouse.x, mouse.y, currentSize);

          // Orbiting Elements (Rocks) - with fade out
          const maxRocks = Math.floor(count / 25);
          for (let i = 0; i < maxRocks; i++) {
              const orbitalSpeed = (0.5 + (i % 3) * 0.3);
              const angle = (Date.now() / 1500) * orbitalSpeed + (i * Math.PI * 2 / maxRocks);
              const orbitRadius = currentSize + 40 + (i * 12);
              
              const rx = mouse.x + Math.cos(angle) * orbitRadius;
              const ry = mouse.y + Math.sin(angle) * orbitRadius;
              
              // Draw Rock
              ctx.beginPath();
              ctx.arc(rx, ry, 3 + (i % 5), 0, Math.PI * 2);
              const colors = ['#00c6ff', '#ff4d80', '#8456ff', '#ffffff'];
              ctx.fillStyle = colors[i % colors.length];
              
              // Fade rocks as they approach the end of the star mass
              const rockThreshold = (i + 1) * 25;
              const rockAlpha = Math.min(0.9, (count - rockThreshold + 25) / 25);
              
              ctx.globalAlpha = rockAlpha;
              ctx.fill();
              
              if (rockAlpha > 0.1) {
                  ctx.shadowBlur = 15;
                  ctx.shadowColor = ctx.fillStyle;
                  ctx.strokeWidth = 1;
                  ctx.strokeStyle = `rgba(255, 255, 255, ${rockAlpha * 0.2})`;
                  ctx.stroke();
                  ctx.shadowBlur = 0;
              }
          }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseDown = () => { mouse.isDown = true; };
    const handleMouseUp = () => { mouse.isDown = false; };
    const handleMouseLeave = () => { mouse.isDown = false; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('blur', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('blur', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default CosmicBackground;
