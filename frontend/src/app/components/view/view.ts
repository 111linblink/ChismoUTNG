import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-view',
  templateUrl: './view.html',
  styleUrls: ['./view.css'],
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
})
export class View implements OnInit {
  currentCategory = 'Amor';
  people: any[] = [];
  selectedPerson: any = null;
  modalVisible = false;

  categoryIcons: { [key: string]: string } = {
    'Amor': '❤️',
    'Terror': '💀',
    'Verguenza': '🫥',
    'Gustos Personales': '🌟',
    'Random': '❔'
  };

  questions: string[] = [
    '¿Cuál es el chisme más jugoso que sabes?',
    '¿Qué secreto te está carcomiendo por dentro?',
    '¿Cuál es la situación más incómoda que has vivido?',
    '¿Qué te parece más atractivo de una persona?',
    '¿Cuál es tu crush secreto?',
    '¿Qué harías si te enteraras de un secreto sobre tu mejor amigo?',
    '¿Cuál es la mentira más grande que has dicho?',
    '¿Qué es lo más vergonzoso que te ha pasado?'
  ];

  sampleData: any = {
    'Amor': [
      {
        name: 'María González',
        initials: 'MG',
        date: '15 de Julio, 2024',
        preview: 'Tengo un crush súper fuerte con...',
        answers: {
          1: 'Tengo un crush súper fuerte con alguien de mi clase de matemáticas...',
          2: 'Mi mejor amiga me confesó que le gusta el mismo chico que a mí...',
          3: 'Vi a mi ex besándose con otra persona en la cafetería...',
          4: 'Hay un chico que siempre me ayuda con las tareas...',
          5: 'Mi novio me dijo que necesita un "tiempo"...',
          6: 'Creo que estoy enamorándome de mi mejor amigo...',
          7: 'Descubrí que mi crush tiene novia...',
          8: 'Mis padres no aprueban a mi novio...'
        }
      },
      {
        name: 'Carlos Mendoza',
        initials: 'CM',
        date: '14 de Julio, 2024',
        preview: 'Estoy loco por una chica de mi salón...',
        answers: {
          1: 'Estoy loco por una chica de mi salón, pero es súper popular...'
        }
      },
      {
        name: 'Ana Rodríguez',
        initials: 'AR',
        date: '13 de Julio, 2024',
        preview: 'Mi corazón está hecho pedazos...',
        answers: {
          1: 'Mi corazón está hecho pedazos porque descubrí que mi novio me engañó...'
        }
      }
    ],
    'Terror': [
      {
        name: 'Pedro Sánchez',
        initials: 'PS',
        date: '12 de Julio, 2024',
        preview: 'Algo muy extraño pasó en la biblioteca...',
        answers: {
          1: 'Escuché pasos cuando no había nadie más, y los libros se movían solos.'
        }
      }
    ]
  };

  get categoryIcon(): string {
    return this.categoryIcons[this.currentCategory] || '❔';
  }

  get questionPairs() {
    if (!this.selectedPerson) return [];
    return Object.entries(this.selectedPerson.answers).map(([index, answer]) => ({
      index,
      question: this.questions[+index - 1],
      answer
    }));
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const category = this.route.snapshot.queryParamMap.get('category') || 'Amor';
    this.currentCategory = category;
    this.people = this.sampleData[category] || [];
    this.createBubbles();
  }

  getAnswerCount(person: any): number {
    return Object.keys(person.answers).length;
  }

  openModal(person: any): void {
    this.selectedPerson = person;
    this.modalVisible = true;
    document.body.style.overflow = 'hidden';
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
