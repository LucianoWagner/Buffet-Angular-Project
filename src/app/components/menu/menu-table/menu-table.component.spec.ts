import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTableComponent } from './menu-table.component';

describe('MenuTableComponent', () => {
  let component: MenuTableComponent;
  let fixture: ComponentFixture<MenuTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
