import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { View } from './view';
import { AnswersService } from '../../services/answers.service';
import { ActivatedRoute } from '@angular/router';

describe('View', () => {
  let component: View;
  let fixture: ComponentFixture<View>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, View],
      providers: [
        AnswersService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: (key: string) => 'mock-category'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(View);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
