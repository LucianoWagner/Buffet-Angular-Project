import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponentTableComponent } from './menu-component-table.component';

describe('MenuComponentTableComponent', () => {
  let component: MenuComponentTableComponent;
  let fixture: ComponentFixture<MenuComponentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponentTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
