import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureListeComponent } from './facture-list';

describe('FactureList', () => {
  let component: FactureListeComponent;
  let fixture: ComponentFixture<FactureListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactureListeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactureListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
