import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  TuiButton,
  TuiDataListComponent,
  TuiDialogContext,
  TuiDialogService,
  TuiError,
  TuiLabel,
  TuiLoader,
  TuiOption,
  TuiTextfield,
  TuiTextfieldComponent,
  TuiTextfieldDirective,
} from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TuiContext,
  TuiDay,
  tuiPure,
  TuiStringHandler,
  TuiValidationError,
} from '@taiga-ui/cdk';
import { TuiForm } from '@taiga-ui/layout';
import {
  TuiButtonLoading,
  TuiFieldErrorPipe,
  TuiInputNumber,
  TuiSwitch,
  tuiValidationErrorsProvider,
} from '@taiga-ui/kit';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import {
  TuiInputDateModule,
  TuiInputDateRangeModule,
  TuiInputSliderModule,
  TuiSelectModule,
} from '@taiga-ui/legacy';
import { Menu, MenuComponent, MenuUpdate } from '../../../../models/menu.model';
import { MenuComponentService } from '../../../../core/menu/menu-component.service';
import { MenuService } from '../../../../core/menu/menu.service';
import { findComponentList } from '../../../../utils/utils';
import { TuiCurrencyPipe } from '@taiga-ui/addon-commerce';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-menu-add-dialog',
  imports: [
    TuiForm,
    ReactiveFormsModule,
    TuiLabel,
    TuiTextfieldDirective,
    TuiError,
    TuiFieldErrorPipe,
    AsyncPipe,
    TuiInputDateModule,
    TuiInputDateRangeModule,
    TuiInputNumber,
    TuiInputSliderModule,
    TuiLoader,
    TuiDataListComponent,
    NgIf,
    NgForOf,
    TuiOption,
    TuiSelectModule,
    TuiCurrencyPipe,
    TuiTextfield,
    TuiSwitch,
    TuiButton,
    TuiButtonLoading,
  ],
  templateUrl: './menu-add-dialog.component.html',
  styleUrl: './menu-add-dialog.component.css',
  standalone: true,
  providers: [
    tuiValidationErrorsProvider({
      required: 'Este campo es obligatorio',
      email: 'Introduce un email válido',
      max: 'Introduce un valor menor o igual a {max}',
      min: 'Introduce un valor mayor o igual a {min}',
    }),
  ],
})
export class MenuAddDialogComponent implements OnInit {
  @Output() refreshTable = new EventEmitter<void>();

  constructor(
    private menuComponentService: MenuComponentService,
    private menuService: MenuService,
  ) {}

  protected menuComponents: MenuComponent[] = [];
  protected readonly isSubmitting$ = new BehaviorSubject<boolean>(false);
  isLoading = true;
  protected submitError: TuiValidationError | null = null;

  protected startersList: MenuComponent[] = [];
  protected mainDishesList: MenuComponent[] = [];
  protected dessertsList: MenuComponent[] = [];
  protected drinksList: MenuComponent[] = [];

  private readonly dialogs = inject(TuiDialogService);
  public readonly context =
    injectContext<TuiDialogContext<Menu | undefined, Menu | undefined>>();
  private readonly today = new Date();
  protected value: Menu | null = null;
  protected readonly form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    date: new FormControl(
      new TuiDay(
        this.today.getFullYear(),
        this.today.getMonth(),
        this.today.getDate(),
      ),
      Validators.required,
    ),
    price: new FormControl(1, [Validators.required, Validators.min(1)]),
    stock: new FormControl(0, [Validators.required, Validators.min(0)]),
    starter: new FormControl(undefined),
    main_dish: new FormControl(undefined),
    dessert: new FormControl(undefined),
    drink: new FormControl(undefined),
    vegetarian: new FormControl(false),
  });

  ngOnInit(): void {
    this.fetchMenuComponents();
  }

  fetchMenuComponents(): void {
    this.menuComponentService.getAllMenuComponents().subscribe({
      next: (menuComponents) => {
        this.menuComponents = menuComponents;
        this.isLoading = false;
        this.startersList = findComponentList(this.menuComponents, 'STARTER');
        this.mainDishesList = findComponentList(
          this.menuComponents,
          'MAIN_DISH',
        );
        this.dessertsList = findComponentList(this.menuComponents, 'DESSERT');
        this.drinksList = findComponentList(this.menuComponents, 'DRINK');
      },
      error: (error) => {
        console.error('Error fetching menu components:', error);
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    this.isSubmitting$.next(true);
    const {
      name,
      date,
      price,
      stock,
      starter,
      main_dish,
      dessert,
      drink,
      vegetarian,
    } = this.form.value;

    const formattedDate = `${date!.year}-${String(date!.month + 1).padStart(2, '0')}-${String(date!.day).padStart(2, '0')}`;
    console.log(formattedDate);
    const menu: MenuUpdate = {
      name: name!,
      date: formattedDate,
      price: price!,
      stock: stock!,
      starter: starter ?? undefined,
      mainDish: main_dish ?? undefined,
      dessert: dessert ?? undefined,
      drink: drink ?? undefined,
      isVegetarian: vegetarian!,
    };

    this.menuService.createMenu(menu).subscribe({
      next: (menu) => {
        this.value = menu;
        this.submit();
      },
      error: (error) => {
        console.error('Error adding menu:', error);
        this.submitError = new TuiValidationError(
          error.message ?? 'Se ha producido un error al añadir el menú',
        );
      },
      complete: () => {
        this.isSubmitting$.next(false);
      },
    });
  }

  closeDialog(): void {
    this.context.completeWith(undefined);
  }

  protected submit(): void {
    if (this.value !== null) {
      this.context.completeWith(this.value);
    }
  }

  @tuiPure
  protected stringifyMenuComponents(
    items: readonly MenuComponent[],
  ): TuiStringHandler<TuiContext<number>> {
    // Create a Map from the MenuComponent items
    const map = new Map(
      items.map(({ id, name }) => [id, name] as [number, string]),
    );

    return ({ $implicit }: TuiContext<number>) => map.get($implicit) || '';
  }
}
