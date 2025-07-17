import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form',
  imports: [],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form implements OnInit {
  currentQuestion: number = 1;
  totalQuestions: number = 8;
  answers: { [key: number]: string } = {};

  constructor(private router: Router) {
    
  }

  ngOnInit(): void {
    this.createParticles();
    this.updateUI();
    this.setupEventListeners();
  }

  // Crear partículas de fondo
  createParticles(): void {
    const particles = document.getElementById('particles');
    if (particles) {
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = particle.style.height = Math.random() * 4 + 2 + 'px';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = Math.random() * 4 + 4 + 's';
        particles.appendChild(particle);
      }
    }
  }

  // Configurar event listeners
  setupEventListeners(): void {
    for (let i = 1; i <= this.totalQuestions; i++) {
      const textarea = document.querySelector(`[data-question="${i}"] .text-input`) as HTMLTextAreaElement;
      const counter = document.getElementById(`charCount${i}`);
      
      if (textarea && counter) {
        textarea.addEventListener('input', (event) => {
          const target = event.target as HTMLTextAreaElement;
          const length = target.value.length;
          counter.textContent = length.toString();
          
          // Cambiar color si se acerca al límite
          if (length > 450) {
            counter.parentElement?.classList.add('warning');
          } else {
            counter.parentElement?.classList.remove('warning');
          }
          
          // Guardar respuesta
          this.answers[i] = target.value;
          
          // Habilitar/deshabilitar botón siguiente
          const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;
          if (nextBtn) {
            nextBtn.disabled = length === 0;
          }
        });
      }
    }
  }

  updateUI(): void {
    // Actualizar barra de progreso
    const progress = (this.currentQuestion / this.totalQuestions) * 100;
    const progressBar = document.getElementById('progressBar') as HTMLElement;
    if (progressBar) {
      progressBar.style.width = progress + '%';
    }
    
    const currentQuestionElement = document.getElementById('currentQuestion');
    if (currentQuestionElement) {
      currentQuestionElement.textContent = this.currentQuestion.toString();
    }
    
    // Mostrar pregunta actual
    document.querySelectorAll('.question-card').forEach(card => {
      card.classList.remove('active');
    });
    
    const currentCard = document.querySelector(`[data-question="${this.currentQuestion}"]`);
    if (currentCard) {
      currentCard.classList.add('active');
    }
    
    // Actualizar botones
    const prevBtn = document.getElementById('prevBtn') as HTMLButtonElement;
    if (prevBtn) {
      prevBtn.disabled = this.currentQuestion === 1;
      prevBtn.style.display = this.currentQuestion === 1 ? 'none' : 'block';
    }
    
    const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;
    if (nextBtn) {
      if (this.currentQuestion === this.totalQuestions) {
        nextBtn.textContent = 'Enviar Chismes 🚀';
      } else {
        nextBtn.textContent = 'Siguiente →';
      }
      
      // Verificar si ya hay respuesta
      const currentAnswer = this.answers[this.currentQuestion];
      nextBtn.disabled = !currentAnswer || currentAnswer.trim().length === 0;
    }
  }

  nextQuestion(): void {
    if (this.currentQuestion < this.totalQuestions) {
      this.currentQuestion++;
      this.updateUI();
    } else {
      this.showResult();
    }
  }

  previousQuestion(): void {
    if (this.currentQuestion > 1) {
      this.currentQuestion--;
      this.updateUI();
    }
  }

  showResult(): void {
    // Ocultar formulario y mostrar resultado
    const formContainer = document.querySelector('.form-container') as HTMLElement;
    if (formContainer) {
      formContainer.style.display = 'none';
    }
    
    const progressContainer = document.querySelector('.progress-container') as HTMLElement;
    if (progressContainer) {
      progressContainer.style.display = 'none';
    }
    
    const resultContainer = document.getElementById('resultContainer');
    if (resultContainer) {
      resultContainer.classList.add('active');
    }
    
    // Simular envío de datos
    console.log('Chismes enviados:', this.answers);
  }

  shareResult(): void {
    if (navigator.share) {
      navigator.share({
        title: 'Chismógrafo - La App del Chisme',
        text: '¡Acabo de compartir mis chismes más jugosos en Chismógrafo! ¿Te atreves a compartir los tuyos?',
        url: window.location.href
      });
    } else {
      const text = '¡Acabo de compartir mis chismes más jugosos en Chismógrafo! ¿Te atreves a compartir los tuyos?';
      navigator.clipboard.writeText(text).then(() => {
        alert('¡Invitación copiada al portapapeles!');
      });
    }
  }

viewGossips(): void {
  //alert('¡Redirigiendo a la sección de chismes!');
  this.router.navigate(['/category']);
}


otherRes(): void {
  //alert('¡Redirigiendo a la sección de chismes!');
  this.router.navigate(['/category']);
}


  restartForm(): void {
    this.currentQuestion = 1;
    this.answers = {};
    
    // Resetear UI
    const formContainer = document.querySelector('.form-container') as HTMLElement;
    if (formContainer) {
      formContainer.style.display = 'block';
    }
    
    const progressContainer = document.querySelector('.progress-container') as HTMLElement;
    if (progressContainer) {
      progressContainer.style.display = 'block';
    }
    
    const resultContainer = document.getElementById('resultContainer');
    if (resultContainer) {
      resultContainer.classList.remove('active');
    }
    
    // Limpiar textareas
    document.querySelectorAll('.text-input').forEach(textarea => {
      const textareaElement = textarea as HTMLTextAreaElement;
      textareaElement.value = '';
    });
    
    // Resetear contadores
    for (let i = 1; i <= this.totalQuestions; i++) {
      const counter = document.getElementById(`charCount${i}`);
      if (counter) {
        counter.textContent = '0';
        counter.parentElement?.classList.remove('warning');
      }
    }
    
    this.updateUI();
  }
}