import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paseadores } from './paseadores';

describe('Paseadores', () => {
  let component: Paseadores;
  let fixture: ComponentFixture<Paseadores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paseadores],
    }).compileComponents();

    fixture = TestBed.createComponent(Paseadores);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
