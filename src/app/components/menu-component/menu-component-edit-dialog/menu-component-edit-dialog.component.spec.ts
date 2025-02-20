import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponentEditDialogComponent } from './menu-component-edit-dialog.component';

describe('MenuComponentEditDialogComponent', () => {
  let component: MenuComponentEditDialogComponent;
  let fixture: ComponentFixture<MenuComponentEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponentEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponentEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
