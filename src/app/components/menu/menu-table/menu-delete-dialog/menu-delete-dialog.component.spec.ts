import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDeleteDialogComponent } from './menu-delete-dialog.component';

describe('MenuDeleteDialogComponent', () => {
  let component: MenuDeleteDialogComponent;
  let fixture: ComponentFixture<MenuDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
