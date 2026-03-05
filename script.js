// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('intro-overlay');
  
  // Auto-dismiss intro overlay after 2.5 seconds
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 3500);

  // Click on overlay to dismiss early
  overlay.addEventListener('click', function() {
    overlay.style.animation = 'fadeOutOverlay 0.5s ease-out forwards';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 500);
  });

  // Lazy load profile image
  const profileImg = document.querySelector('.profile-photo img');
  if (profileImg && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(profileImg);
  }

  // Prevent scrolling during intro animation
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    document.body.style.overflow = 'auto';
  }, 3500);

  // Add click animation to links
  const links = document.querySelectorAll('.link-item');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(168, 85, 247, 0.5)';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.animation = 'ripple 0.6s ease-out';
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = size + 'px';
      ripple.style.height = size + 'px';
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Performance optimization - preload resources
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = 'https://cdnjs.cloudflare.com';
      document.head.appendChild(link);
    });
  }

  // Add smooth scroll behavior for badges
  const badges = document.querySelectorAll('.badge');
  badges.forEach(badge => {
    badge.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
    });
    badge.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    from {
      opacity: 1;
      transform: scale(0);
    }
    to {
      opacity: 0;
      transform: scale(1);
    }
  }
`;
document.head.appendChild(style);

// Optional: Add particles effect on background (performance-friendly)
function createParticles() {
  if (window.innerWidth < 768) return; // Don't create on mobile for performance
  
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '1';
  canvas.style.pointerEvents = 'none';
  canvas.style.opacity = '0.3';
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const ctx = canvas.getContext('2d');
  const particles = [];
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5 + 0.5;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }
    
    draw() {
      ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Create particles
  for (let i = 0; i < 30; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  document.body.appendChild(canvas);
  animate();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Initialize particles after page loads (optional feature)
// Uncomment the line below if you want the particle effect
// window.addEventListener('load', createParticles);