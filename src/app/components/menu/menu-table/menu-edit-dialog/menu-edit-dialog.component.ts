import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {TuiAmountPipe, TuiCurrencyPipe} from '@taiga-ui/addon-commerce';
import {TuiAutoFocus, TuiContext, TuiDay, tuiPure, TuiStringHandler} from '@taiga-ui/cdk';
import {TuiAppearance, TuiDialogContext, TuiLoader, TuiTitle} from '@taiga-ui/core';
import { TuiButton, TuiDialogService, TuiTextfield } from '@taiga-ui/core';
import {TuiCheckbox, TuiDataListWrapper, TuiInputNumber, TuiSlider, TuiSwitch} from '@taiga-ui/kit';
import {
  TuiInputDateModule,
  TuiInputModule, TuiInputSliderModule,
  TuiSelectModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { injectContext } from '@taiga-ui/polymorpheus';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import {Menu, MenuComponent, MenuUpdate} from '../../../../models/menu.model';
import {findComponent, findComponentList} from '../../../../utils/utils';
import {MenuComponentService} from '../../../../core/menu/menu-component.service';
import {MenuService} from '../../../../core/menu/menu.service';


@Component({
  selector: 'app-menu-edit-dialog',
  imports: [
    AsyncPipe,
    FormsModule,
    TuiAmountPipe,
    TuiAutoFocus,
    TuiButton,
    TuiDataListWrapper,
    TuiInputModule,
    TuiSelectModule,
    TuiSlider,
    TuiTextfield,
    TuiTextfieldControllerModule,
    TuiAppearance,
    TuiForm,
    ReactiveFormsModule,
    TuiHeader,
    TuiTitle,
    TuiCardLarge,
    TuiInputDateModule,
    TuiInputNumber,
    TuiCurrencyPipe,
    TuiInputSliderModule,
    NgForOf,
    TuiLoader,
    NgIf,
    TuiCheckbox,
    TuiSwitch,
  ],
  templateUrl: './menu-edit-dialog.component.html',
  styleUrls: ['./menu-edit-dialog.component.css'],
  standalone: true,
})
export class MenuEditDialogComponent implements OnInit {
  @Output() refreshTable = new EventEmitter<void>();

  constructor(private menuComponentService: MenuComponentService, private menuService: MenuService) {}




  menuComponents: MenuComponent[] = [];
  isLoading = true;
  errorMessage = '';
  protected startersList: MenuComponent[] = [];
  protected mainDishesList: MenuComponent[] = [];
  protected dessertsList: MenuComponent[] = [];
  protected drinksList: MenuComponent[] = [];



  private readonly dialogs = inject(TuiDialogService);
  public readonly context = injectContext<TuiDialogContext<Menu, Menu>>();

  protected readonly form = new FormGroup({
    name: new FormControl(this.context.data.name, Validators.required),
    date: new FormControl(
      new TuiDay(
        this.getYearFromDate(this.context.data.date),
        this.getMonthFromDate(this.context.data.date),
        this.getDayFromDate(this.context.data.date)
      ),
      Validators.required
    ),
    price: new FormControl(this.context.data.price, [Validators.required, Validators.min(0)]),
    stock: new FormControl(this.context.data.stock, [Validators.required, Validators.min(0)]),
    starter: new FormControl(findComponent(this.context.data.components, "STARTER")?.id,
    ),
    main_dish: new FormControl(findComponent(this.context.data.components, "MAIN_DISH")?.id,

    ),
    dessert: new FormControl(
      findComponent(this.context.data.components, "DESSERT")?.id
    ),
    drink: new FormControl(
      findComponent(this.context.data.components, "DRINK")?.id
    ),
    vegetarian: new FormControl(this.context.data.vegetarian),

  });

  protected value: Menu | null = null;
  protected name = '';
  protected items = [10, 50, 100];



  protected get hasValue(): boolean {
    return this.value !== null;
  }

  protected get data(): Menu {
    return this.context.data;
  }

  protected submit(): void {
    if (this.value !== null) {
      this.context.completeWith(this.value);
    }
  }

  protected showDialog(content: TemplateRef<TuiDialogContext>): void {
    this.dialogs.open(content, { dismissible: true }).subscribe();
  }

  private getYearFromDate(date: string): number {
    return parseInt(date.split('-')[2]); // Get the year
  }

  private getMonthFromDate(date: string): number {
    return parseInt(date.split('-')[1]) - 1; // Get the month (0-indexed)
  }

  private getDayFromDate(date: string): number {
    return parseInt(date.split('-')[0]); // Get the day
  }

  ngOnInit(): void {
    this.fetchMenuComponents();
    console.log(this.context.data.vegetarian);

  }

  fetchMenuComponents() : void {
    this.menuComponentService.getAllMenuComponents().subscribe({
      next: (menuComponents) => {
        console.log(menuComponents);
        this.menuComponents = menuComponents;
        this.startersList = findComponentList(menuComponents, "STARTER");
        this.mainDishesList = findComponentList(menuComponents, "MAIN_DISH");
        this.dessertsList = findComponentList(menuComponents, "DESSERT");
        this.drinksList = findComponentList(menuComponents, "DRINK");

        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    })
  }


  onSubmit(): void {

    const {name, date, price, stock, starter, main_dish, dessert, drink, vegetarian} = this.form.value;
    const formattedDate = `${date!.year}-${String(date!.month).padStart(2, '0')}-${String(date!.day).padStart(2, '0')}`;




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

    this.menuService.updateMenu(this.context.data.id!, menu).subscribe({
      next: (menu) => {
        this.value = menu;
        this.submit();
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });





  }


  @tuiPure
  protected stringifyMenuComponents(items: readonly MenuComponent[]): TuiStringHandler<TuiContext<number>> {
    // Create a Map from the MenuComponent items
    const map = new Map(items.map(({ id, name }) => [id, name] as [number , string]));

    return ({$implicit}: TuiContext<number>) => map.get($implicit) || '';


  }



}


