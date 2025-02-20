import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponentDeleteDialogComponent } from './menu-component-delete-dialog.component';

describe('MenuComponentDeleteDialogComponent', () => {
  let component: MenuComponentDeleteDialogComponent;
  let fixture: ComponentFixture<MenuComponentDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponentDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponentDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
