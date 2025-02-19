import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponentAddDialogComponent } from './menu-component-add-dialog.component';

describe('MenuComponentAddDialogComponent', () => {
  let component: MenuComponentAddDialogComponent;
  let fixture: ComponentFixture<MenuComponentAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponentAddDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponentAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
