import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialPage } from './special-page';

describe('SpecialPage', () => {
  let component: SpecialPage;
  let fixture: ComponentFixture<SpecialPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
