import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEditDialogComponent } from './menu-edit-dialog.component';

describe('MenuEditDialogComponent', () => {
  let component: MenuEditDialogComponent;
  let fixture: ComponentFixture<MenuEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
