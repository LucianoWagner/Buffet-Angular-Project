import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTableHeaderComponent } from './menu-table-header.component';

describe('MenuTableHeaderComponent', () => {
  let component: MenuTableHeaderComponent;
  let fixture: ComponentFixture<MenuTableHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuTableHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuTableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
