import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { enviorment } from '../../../enviorments/enviorments';

export interface MenuComponent {
  id?: number;
  name: string;
  imageUrl?: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class MenuComponentService {
  private apiUrl = `${enviorment.apiUrl}/menu-components`;

  constructor(private http: HttpClient) {}

  /**
   * Crea un nuevo componente de menú.
   * @param component Datos del componente a agregar.
   */
  addMenuComponent(component: MenuComponent): Observable<MenuComponent> {
    return this.http.post<MenuComponent>(this.apiUrl, component).pipe(
      catchError((error) => {
        if (error.error) {
          const message = error.error.message || 'Error al crear el componente';
          return throwError(() => new Error(message));
        }
        return throwError(() => new Error('Error al crear el componente'));
      }),
    );
  }

  /**
   * Actualiza un componente de menú existente.
   * @param id ID del componente a actualizar.
   * @param component Datos actualizados.
   */
  updateMenuComponent(
    id: number,
    component: MenuComponent,
  ): Observable<MenuComponent> {
    return this.http.put<MenuComponent>(`${this.apiUrl}/${id}`, component).pipe(
      catchError((error) => {
        if (error.error.code === 'RECURSO_YA_EXISTENTE') {
          return throwError(
            () => new Error('Ya existe un componente con ese nombre'),
          );
        }
        return throwError(() => new Error('Error al actualizar el componente'));
      }),
    );
  }

  /**
   * Elimina un componente de menú por su ID.
   * @param id ID del componente a eliminar.
   */
  deleteMenuComponent(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(() =>
          throwError(() => new Error('Error al eliminar el componente')),
        ),
      );
  }

  /**
   * Obtiene todos los componentes de menú.
   */
  getAllMenuComponents(): Observable<MenuComponent[]> {
    return this.http.get<MenuComponent[]>(this.apiUrl);
  }
}
