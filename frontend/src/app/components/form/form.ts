import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsService } from '../../services/questions.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form implements OnInit {
  currentQuestion: number = 1;
  totalQuestions: number = 50;
  answers: { [key: number]: string } = {};
  questions: any[] = [];
  user_name: string = '';
  user_group: string = '';


  constructor(private router: Router, private questionsService: QuestionsService) {
    
  }

  ngOnInit(): void {
    this.fetchQuestions();
    this.createParticles();
    this.updateUI();
  }
  

  fetchQuestions(): void {
    this.questionsService.getQuestions().subscribe({
      next: (data) => {
        console.log('Preguntas desde el backend:', data);
        this.questions = data;
        // Aquí puedes asignarlas dinámicamente si estás generando el HTML desde Angular
      },
      error: (err) => {
        console.error('Error al obtener preguntas:', err);
      }
    });
  }

  sendAnswers(): void {
  if (!this.user_name || !this.user_group) {
    alert('Por favor ingresa tu nombre y grupo antes de enviar.');
    return;
  }

  const answersToSend = this.questions.map((question, index) => ({
    question_id: question._id,
    answer: this.answers[index + 1],
    user_name: this.user_name,
    user_group: this.user_group
  }));

  console.log('Enviando respuestas:', answersToSend);

  this.questionsService.sendAnswers(answersToSend).subscribe({
    next: () => {
      console.log('Respuestas enviadas correctamente');
    },
    error: (err) => {
      console.error('Error al enviar respuestas:', err);
    }
  });
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
  }
  onAnswerChange(): void {
  this.updateUI();
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

  // Mostrar solo la pregunta actual
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
    const currentAnswer = this.answers[this.currentQuestion];
    const allAnswered = Object.keys(this.answers).length === this.totalQuestions &&
      Object.values(this.answers).every(ans => ans && ans.trim().length > 0);

    if (this.currentQuestion === this.totalQuestions) {
      if (allAnswered) {
        nextBtn.textContent = 'Enviar Chismes 🚀';
        nextBtn.disabled = false;
      } else {
        nextBtn.textContent = 'Responde todas antes de enviar';
        nextBtn.disabled = true;
      }
    } else {
      nextBtn.textContent = 'Siguiente →';
      nextBtn.disabled = !currentAnswer || currentAnswer.trim().length === 0;
    }
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

  // Enviar las respuestas al backend
  this.sendAnswers();
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