import {Component} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isDarkTheme = false;

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      this.generateStars();
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      this.generateParticles();
      document.querySelector('.stars')!.innerHTML = '';
    }
  }


  private generateStars(): void {
    const starContainer = document.querySelector('.stars')!;
    starContainer.innerHTML = '';
    const starCount = 120;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 2 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const opacity = Math.random() * 0.5 + 0.4;

      star.classList.add('star');
      Object.assign(star.style, {
        width: `${size}px`,
        height: `${size}px`,
        top: `${posY}%`,
        left: `${posX}%`,
        opacity: `${opacity}`,
      });

      starContainer.appendChild(star);
    }
  }

  private generateParticles(): void {
    const particleContainer = document.querySelector('.particles')!;
    const particleCount = 200;  // Increase particles for better effect

    // Clear out previous particles
    particleContainer.innerHTML = '';

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      // Randomize size, position, and animation speed
      const size = Math.random() * 5 + 3;  // Particle size between 3px to 8px
      const posX = Math.random() * 100;  // Random X position
      const posY = Math.random() * 100;  // Random Y position
      const animationDuration = Math.random() * 10 + 10;  // Animation duration between 10s to 20s

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.top = `${posY}%`;
      particle.style.left = `${posX}%`;
      particle.style.animationDuration = `${animationDuration}s`;  // Set random speed

      // Append each particle to the container
      particleContainer.appendChild(particle);
    }
  }
}

