import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswersService } from '../../services/answers.service';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-view-view',
  templateUrl: './view.html',
  styleUrls: ['./view.css'],
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
})
export class View implements OnInit {
  currentCategory!: string;
  people: any[] = [];
  selectedPerson: any = null;
  modalVisible = false;
  respuestasFiltradas: any[] = [];
  questions: { id: number, text: string }[] = [];



  categoryIcons: { [key: string]: string } = {
    'Amor': '❤️',
    'Miedo': '💀',
    'Vergüenzas': '🫥',
    'Gustos': '🌟',
    'Random': '❔'
  };


   get categoryIcon(): string {
     return this.categoryIcons[this.currentCategory] || '❔';
   }

  get questionPairs() {
  if (!this.selectedPerson) return [];

  return Object.entries(this.selectedPerson.answers).map(([questionIdStr, answer]) => {
    const questionId = +questionIdStr;
    const questionObj = this.questions.find(q => q.id === questionId);

    return {
      index: questionId,
      question: questionObj ? questionObj.text : `Pregunta ${questionId}`,
      answer
    };
  });
}


  constructor(private route: ActivatedRoute, private answersService: AnswersService, private questionsService : QuestionsService) { }

  ngOnInit(): void {
  const categoryParam = this.route.snapshot.queryParamMap.get('category');

   if (!categoryParam) {
    console.warn('No se proporcionó categoría en la URL.');
    return;
  }

    this.currentCategory = categoryParam;

  // Mapea el nombre de la categoría al ID que manejas
  const categories = [
    { id: 1, name: 'Amor' },
    { id: 2, name: 'Miedo' },
    { id: 3, name: 'Vergüenzas' },
    { id: 4, name: 'Gustos' },
    { id: 5, name: 'Random' }
  ];

  const categoryObj = categories.find(c => c.name === this.currentCategory);
  const categoryId = categoryObj?.id || 1;

  this.loadData(categoryId);

  this.questionsService.getQuestionsByCategory(categoryId).subscribe({
   next: (preguntas) => {
    this.questions = preguntas.map((q: any) => ({
      id: q._id,
      text: q.text
    }));
    console.log('Preguntas procesadas:', this.questions);
  },
  error: (err) => {
    console.error('Error al obtener preguntas:', err);
  }
});

  this.createBubbles();
}

loadData(categoryId: number) {
  this.answersService.getGroupedAnswersByCategory(categoryId).subscribe({
    next: (respuestas) => {
      this.people = respuestas.map((r) => ({
        user_name: r.user_name,
        initials: this.getInitials(r.user_name),
        date: new Date(r.created_at).toLocaleDateString(),
        preview: r.answers[1] || 'Sin respuesta previa',
        answers: r.answers
      }));
    },
    error: (err) => console.error(err)
  });

  this.questionsService.getQuestionsByCategory(categoryId).subscribe({
    next: (preguntas) => {
      this.questions = preguntas.map((q: any) => ({
        id: q._id,
        text: q.text
      }));
    },
    error: (err) => console.error(err)
  });
}

getInitials(user_name: string | undefined | null): string {
  if (!user_name) return ''; 
  const parts = user_name.trim().split(' ');
  return parts.map(p => p[0].toUpperCase()).slice(0, 2).join('');
}

  getAnswerCount(person: any): number {
    return Object.keys(person.answers).length;
  }

  openModal(person: any): void {
    this.selectedPerson = person;
    this.modalVisible = true;
    document.body.style.overflow = 'hidden';
    console.log('Preguntas:', this.questions);
    console.log('Respuestas del usuario:', person.answers);

    
  }

  closeModal(): void {
    this.modalVisible = false;
    this.selectedPerson = null;
    document.body.style.overflow = 'auto';
  }

  onModalClick(event: Event): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.closeModal();
    }
  }

  goBack(): void {
    history.back();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }


  createBubbles(): void {
    const container = document.querySelector('.bubbles');
    if (!container) return;

    setInterval(() => {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.style.left = Math.random() * 100 + '%';
      bubble.style.animationDuration = (Math.random() * 3 + 3) + 's';
      bubble.style.width = bubble.style.height = Math.random() * 60 + 40 + 'px';
      container.appendChild(bubble);

      setTimeout(() => bubble.remove(), 6000);
    }, 2000);
  }
}
