import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeroeComponent } from './heroe.component';

describe('HeroeComponent', () => {
  let component: HeroeComponent;
  let fixture: ComponentFixture<HeroeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HeroeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
