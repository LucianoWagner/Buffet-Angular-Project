import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  /**
   * Crea un nuevo menú (requiere permiso `MENU_CREATE`).
   */
  createMenu(menuData: MenuUpdate): Observable<Menu> {
    return this.http.post<Menu>(this.apiUrl, menuData).pipe(
      catchError((error) => {
        console.error('Error al crear el menú:', error);
        return throwError(() => new Error('No se pudo crear el menú'));
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
