import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { enviorment } from '../../../enviorments/enviorments';
import { Menu, MenuUpdate } from '../../models/menu.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl = `${enviorment.apiUrl}/menus`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los menús (requiere permiso `MENU_READ`).
   */
  getAllMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener los menús:', error);
        return throwError(() => new Error('No se pudieron obtener los menús'));
      }),
    );
  }

  getByDate(date: string): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiUrl}?date=${date}`).pipe(
      catchError((error) => {
        console.error('Error al obtener los menús:', error);
        return throwError(() => new Error('No se pudieron obtener los menús'));
      }),
    );
  }

  /**
   * Crea un nuevo menú (requiere permiso `MENU_CREATE`).
   */
  createMenu(menuData: MenuUpdate): Observable<Menu> {
    return this.http.post<Menu>(this.apiUrl, menuData).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'No se pudo crear el menú';

        if (error?.error?.errorCode === 'RECURSO_YA_EXISTENTE') {
          errorMessage = menuData.isVegetarian
            ? 'Ya existe un menú vegetariano para la fecha seleccionada'
            : 'Ya existe un menú no vegetariano para la fecha seleccionada';
        }

        return throwError(() => new Error(errorMessage));
      }),
    );
  }

  /**
   * Actualiza un menú por su ID (requiere permiso `MENU_UPDATE`).
   */
  updateMenu(id: number, menuData: MenuUpdate): Observable<Menu> {
    return this.http.put<Menu>(`${this.apiUrl}/${id}`, menuData).pipe(
      catchError((error) => {
        console.error('Error al actualizar el menú:', error);
        return throwError(() => new Error('No se pudo actualizar el menú'));
      }),
    );
  }

  deleteMenu(menuId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${menuId}`);
  }
}
