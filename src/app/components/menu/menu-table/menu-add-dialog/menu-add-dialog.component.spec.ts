import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAddDialogComponent } from './menu-add-dialog.component';

describe('MenuAddDialogComponent', () => {
  let component: MenuAddDialogComponent;
  let fixture: ComponentFixture<MenuAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuAddDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
