import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDisplayComponent } from './menu-display.component';

describe('MenuDisplayComponent', () => {
  let component: MenuDisplayComponent;
  let fixture: ComponentFixture<MenuDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
