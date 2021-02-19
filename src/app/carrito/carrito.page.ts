import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  carrito = [];
  subtotal: number = 0;
  iva: number = 0;
  constructor(private prodSV: ProductosService) {}

  ngOnInit() {
    this.prodSV.getStorage().then((carrito) => {
      this.carrito = carrito;
      this.carrito.forEach((item) => {
        const totalProd = Number(item.cantidad) * item.prod.PRECIO_UNIDAD;
        this.subtotal += totalProd;
      });
      this.iva = 0.12 * this.subtotal;
      console.log(this.carrito);
    });
  }
}
