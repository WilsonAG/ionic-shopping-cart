import { Producto2 } from '../interfaces/producto.interface';
import { ProductosService } from '../services/productos.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isSearching = false;
  productos: Producto2[] = [];
  listaProductos: Producto2[] = [];

  constructor(
    private prodSv: ProductosService,
    private ac: AlertController,
    private toast: ToastController
  ) {}

  ngOnInit(): void {
    this.prodSv.getProductos().subscribe((productos) => {
      this.productos = productos;
      this.listaProductos = productos;
    });
  }

  cancelSearch() {
    this.isSearching = false;
    this.productos = this.listaProductos;
  }

  search(evt) {
    const str: string = evt.target.value;

    if (str.length < 1) {
      this.productos = this.listaProductos;
    } else {
      this.productos = this.listaProductos.filter((prod) => {
        if (prod.DESCRIPCION.toLowerCase().includes(str.toLowerCase())) {
          return prod;
        }
      });
    }
  }

  async showProduct(p: Producto2) {
    const alert = await this.ac.create({
      header: p.DESCRIPCION,
      subHeader: `$ ${p.PRECIO_UNIDAD}`,
      message: `
      <img src="assets/productos2/${p.IMG}" class="card-alert">
      <p>Unidades disponibles: ${p.STOCK}</p>
      <p>${p.MARCA}</p>
      `,
      inputs: [
        {
          name: 'cantidad',
          type: 'number',
          label: 'Cantidad',
          placeholder: 'Ingrese la cantidad',
          min: 0,
          max: p.STOCK,
        },
      ],
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          cssClass: 'danger',
        },
        {
          text: 'Agregar al carrito',
          handler: async (data) => {
            this.prodSv.setStorage(p, data.cantidad);
            const toast = await this.toast.create({
              message: 'Producto agregado',
              duration: 2000,
            });
            toast.present();
          },
        },
      ],
    });

    await alert.present();
  }
}
