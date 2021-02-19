import { Producto2 } from './../interfaces/producto.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  productos: Producto2[] = [];
  carrito = [];

  constructor(private http: HttpClient, private storage: Storage) {}

  getProductos() {
    return this.http.get<Producto2[]>('/assets/productos2.json').pipe(
      tap((prod) => {
        this.productos = prod;
      })
    );
  }

  setStorage(prod: Producto2, cantidad: number) {
    this.carrito.push({
      prod,
      cantidad,
    });

    this.storage.set('carrito', JSON.stringify(this.carrito));
    // this.storage.get(prod.CODIGO).then((cant: number) => {
    //   if (!cant) {
    //     this.storage.set(prod.CODIGO, Number(cantidad));
    //     return;
    //   }
    //   const total = Number(cantidad) + Number(cant);
    //   this.storage.set(prod.CODIGO, total);
    // });
  }

  async getStorage() {
    this.carrito = JSON.parse(await this.storage.get('carrito'));
    return this.carrito;
  }
}
