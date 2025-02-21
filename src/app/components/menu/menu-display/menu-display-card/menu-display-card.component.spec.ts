import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDisplayCardComponent } from './menu-display-card.component';

describe('MenuDisplayCardComponent', () => {
  let component: MenuDisplayCardComponent;
  let fixture: ComponentFixture<MenuDisplayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDisplayCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
