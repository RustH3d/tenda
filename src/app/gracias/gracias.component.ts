import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gracias',
  standalone: true,
  templateUrl: './gracias.component.html',
  styleUrls: ['./gracias.component.css'],
  imports: [CommonModule]
})
export class GraciasComponent implements OnInit {
  confettiArray: any[] = Array(100); // Puedes ajustar el número de piezas de confetti

  ngOnInit(): void {
    this.iniciarConfetti();
  }

  iniciarConfetti(): void {
    
    this.confettiArray = this.confettiArray.map(() => ({
      left: Math.random() * 100 + 'vw',
      top: Math.random() * 100 + 'vh',
      animationDuration: Math.random() * 3 + 2 + 's',
      animationDelay: Math.random() * 2 + 's'
    }));
  }
}
