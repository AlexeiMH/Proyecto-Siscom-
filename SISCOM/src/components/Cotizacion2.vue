<template>
  <div class="home-page">
    <div class="page-container">
      <header class="header">
        <nav class="menu">
          <RouterLink to="/Inicio">Inicio</RouterLink>
          <RouterLink to="/Cotizacion2" class="nav-link active">Cotizaciones</RouterLink>
          <RouterLink to="/CatalogoClientes">Catálogos</RouterLink>
          <RouterLink to="/ProductosClientes">Productos</RouterLink>
        </nav>
        <RouterLink to="/" class="login-btn" @click="logout">Cerrar Sesión</RouterLink>
      </header>

      <main class="main-content">
        <div class="content-header">
          <h1 class="page-title">COTIZACIÓN DE PRODUCTOS O SERVICIOS</h1>
          <h2 class="section-title">Datos del Solicitante</h2>
        </div>

        <div class="content-body">
          <form class="quotation-form" @submit.prevent="handleSubmit">
            <div class="products-section">
              <div class="products-table">
                <table>
                  <thead>
                    <tr>
                      <th>CANTIDAD</th>
                      <th>PRODUCTO O SERVICIO</th>
                      <th>PRECIO UNITARIO</th>
                      <th>SUBTOTAL</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="producto in productosCotizacion"
                      :key="producto.id"
                    >
                      <td>
                        <input
                          type="number"
                          v-model.number="producto.cantidad"
                          min="1"
                          @input="calcularSubtotal(producto)"
                        />
                      </td>
                      <td>{{ producto.nombre }}</td>
                      <td>{{ producto.precioUnitario.toFixed(2) }}</td>
                      <td>{{ producto.subtotal.toFixed(2) }}</td>
                      <td>
                        <button
                          type="button"
                          class="remove-product-button"
                          @click="eliminarProducto(producto.id)"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                class="add-product-button"
                @click="mostrarModal"
              >
                <span>Agregar Producto/Servicio</span>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/697dc3c0c8744d943a782ba94f0b244fa86f6a2d6f911dacd7bd1989e48c7486?placeholderIfAbsent=true&apiKey=1f87a0a071d64092ac793b0969808bca"
                  alt="Icono"
                  class="button-icon"
                />
              </button>
            </div>
            <div v-if="modalVisible" class="modal">
              <AgregarProductos
                @cerrar-modal="cerrarModal"
                @productos-agregados="agregarProductos"
              />
            </div>

            <div class="Totales">
                <table>
                  <thead>
                    <tr>
                      <td>SUBTOTAL</td>
                      <td>IVA (16%)</td>
                      <td>TOTAL</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ subtotalTotal.toFixed(2) }}</td>
                    <td>{{ iva.toFixed(2) }}</td>
                    <td>{{ total.toFixed(2) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>


            <!-- Datos del solicitante -->
            <div class="customer-info">
              <div class="form-group">
                <label for="fullName" class="form-label">Nombre Completo:</label>
                <input type="text" id="fullName" class="form-input" />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="email" class="form-label">Correo:</label>
                  <input type="email" id="email" class="form-input" />
                </div>
                <div class="form-group">
                  <label for="telefono" class="form-label">Teléfono:</label>
                  <input type="tel" id="telefono" class="form-input" />
                </div>
              </div>

              <div class="form-groupR">
                <label for="rfc" class="form-labelR">RFC:</label>
                <input type="text" id="rfc" class="form-inputR" />
              </div>

              <div class="form-actions">
                <!--<button type="button" class="action-button generate" @click="generarCotizacion">
                  <span>Generar Cotización</span>
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/697dc3c0c8744d943a782ba94f0b244fa86f6a2d6f911dacd7bd1989e48c7486?placeholderIfAbsent=true&apiKey=1f87a0a071d64092ac793b0969808bca" alt="Icono" class="button-icon" />
                </button>-->
                <button type="button" class="action-button email" @click="enviarCorreo">
                  <span>Enviar por Correo</span>
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/697dc3c0c8744d943a782ba94f0b244fa86f6a2d6f911dacd7bd1989e48c7486?placeholderIfAbsent=true&apiKey=1f87a0a071d64092ac793b0969808bca" alt="Icono" class="button-icon" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import AgregarProductos from './AgregarProductos.vue'; // Importar el componente del modal
import axios from 'axios'; // Importar axios para las solicitudes HTTP

export default {
  components: {
    AgregarProductos,
  },
  data() {
    return {
      modalVisible: false, // Controla si el modal está visible
      productosCotizacion: [], // Productos seleccionados para la cotización
      ivaPorcentaje: 0.16, // Porcentaje de IVA (16%)
      nombre: '', // Nombre del solicitante
      email: '', // Correo del solicitante
      telefono: '', // Teléfono del solicitante
      rfc: '' // RFC del solicitante
    };
  },
  computed: {
    // Subtotal total de todos los productos
    subtotalTotal() {
      return this.productosCotizacion.reduce((total, producto) => total + producto.subtotal, 0);
    },
    // IVA basado en el subtotal total
    iva() {
      return this.subtotalTotal * this.ivaPorcentaje;
    },
    // Total (subtotal + IVA)
    total() {
      return this.subtotalTotal + this.iva;
    },
  },
  methods: {
    mostrarModal() {
      this.modalVisible = true; // Muestra el modal
    },
    cerrarModal() {
      this.modalVisible = false; // Cierra el modal
    },
    agregarProductos(productosSeleccionados) {
      productosSeleccionados.forEach((producto) => {
        // Verificar si el producto ya está en la cotización
        const productoExistente = this.productosCotizacion.find(
            (p) => p.id === producto.id
        );

        if (productoExistente) {
          // Si ya existe, incrementar la cantidad
          productoExistente.cantidad += producto.cantidad;
          this.calcularSubtotal(productoExistente);
        } else {
          // Si no existe, agregarlo con cantidad y subtotal iniciales
          this.productosCotizacion.push({
            id: producto.id,
            nombre: producto.nombre,
            precioUnitario: producto.precioUnitario,
            cantidad: producto.cantidad || 1,
            subtotal: producto.precioUnitario * (producto.cantidad || 1),
          });
        }
      });
    },
    calcularSubtotal(producto) {
      producto.subtotal = producto.precioUnitario * producto.cantidad; // Calcula el subtotal basado en la cantidad
    },
    eliminarProducto(productoId) {
      // Eliminar un producto de la cotización
      this.productosCotizacion = this.productosCotizacion.filter(
          (producto) => producto.id !== productoId
      );
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.clear();
      this.$router.push('/');
    },
    async enviarCorreo() {
      try {
        // Construcción del cuerpo del correo
        const productosDetalle = this.productosCotizacion.map(producto =>
            `${producto.nombre} - Cantidad: ${producto.cantidad}, Subtotal: ${producto.subtotal.toFixed(2)}`
        ).join('\n');

        const mail = document.getElementById("email").value;
        const telef = document.getElementById("telefono").value;
        const name = document.getElementById("fullName").value;
        const rfc = document.getElementById("rfc").value;

        const cuerpoCorreo = `
          Detalles de la Cotización:
          ${productosDetalle}

          Totales:
          Subtotal: ${this.subtotalTotal.toFixed(2)}
          IVA (16%): ${this.iva.toFixed(2)}
          Total: ${this.total.toFixed(2)}

          Datos del Solicitante:
          Nombre: ${name}
          Correo: ${mail}
          Teléfono: ${telef}
          RFC: ${rfc}`;

        const token = localStorage.getItem("authToken");
        // Configuración de la solicitud fetch para enviar el correo
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            to: `${mail}`,
            subject: "Detalle de Cotización",
            body: `${cuerpoCorreo}`
          })
        };

        // Realizar la solicitud fetch para enviar el correo
        const response = await fetch("http://localhost:8080/api/v1/cotizar/mail", requestOptions);

        if (response.ok) {
          alert('Correo enviado con éxito');
        } else {
          const errorMessage = await response.text();
          console.error('Error al enviar el correo:', errorMessage);
          alert('Error al enviar el correo');
        }
      } catch (error) {
        console.error('Error en la solicitud fetch:', error);
        alert('Error al enviar el correo');
      }
    }
  },
};
</script>

<style scoped>
.nav-links {
  display: flex;
  gap: 40px;
  font-size: 1.2rem;
  color: #000;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
}

.nav-link {
  text-decoration: none;
  color: #111;
}

.nav-link:hover {
  color: #0056b3;
  transform: scale(1.2);
}

.nav-link.active {
  color: #0056b3;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.login-btn {
  margin-right: 10px;
  background-color: white;
  color: black;
  border: 1px solid rgb(164, 159, 159);
  padding: 6px 15px;
  border-radius: 50px;
  cursor: pointer;
  text-decoration: none;
}

.login-btn:hover {
  background-color: #f0f0f0;
  transform: scale(1.05);
}
/* Estilo general */
body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

.home-page {
  max-width: 1200px;
  margin: 0 auto;
}

/* Encabezado barra menu*/
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Logo superior*/
.logo {
  height: 50px;
}

.menu a {
  margin: 0 15px;
  text-decoration: none;
  color: #000;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
}

.menu a:hover {
  color: #0056b3;
  transform: scale(1.2);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.page-container {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0 8px 164px 0;
  font-family: 'Poppins', sans-serif;

}

.header {
  width: 100%;
  font-family: 'Poppins', sans-serif;

}

.nav-container {
  background-color: #fff;
  border-bottom: 1px solid rgba(102, 102, 102, 0.25);
  display: flex;
  justify-content: space-between;
  padding: 5px 5px
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 54px;
}

.logo {
  width: 190px;
  height: auto;
}

.nav-links {
  display: flex;
  gap: 40px;
  font-size: 1.2rem;
  color: #000;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.dropdown-icon {
  width: 24px;
  height: 24px;
}

.auth-buttons {
  display: flex;
  gap: 25px;
  margin-top: 20px;
}

.main-content {
  width: 100%;
  max-width: 1500px;
  margin: 50px 0 0 46px;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0px;
}

/* configuraion del titulo cotizacion*/
.page-title {
  padding-left: 20%;
  font-size: 20px;
  color: #000;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  margin-top: 40px;
  margin-bottom: 40px;
}

/* configuraion del titulo datos*/
.section-title {
  padding-right: 3%;
  text-transform: uppercase;
  font-size: 20px;
  color: #000;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;

}

/* configuraion pocision de datos*/
.quotation-form {
  display: flex;
  gap: 70px;
}

.products-section {
  flex: 0 0 70%;
}

.products-table {
  border: 2px solid #060101;
  border-radius: 20px;
  padding: 10px 5px;
  margin-top: 15%;
  margin-bottom: 25px;
  width: 90%;
  height: 500px; /* Ajusta la altura de la tabla principal */
  max-width: 1000px;
  font-size: 18px;
  overflow-y: auto; /* Agrega scroll vertical */

}

.Totales {
  position: absolute; /* Flota debajo de la tabla principal */
  bottom: 0; /* Colócalo en la parte inferior de la pantalla */
  width: 90%; /* Asegúrate de que tenga el mismo ancho que la tabla principal */
  margin-top: 75%; /* Separación con respecto a la tabla principal */
  border: 2px solid #060101;
  border-radius: 20px;
  padding: 5px;
  background-color: #fff;
  margin-left: 50%;
  width: 250px;
}

/* Tabla titulo columna */
.table-header {
  text-transform: uppercase;
  display: flex;
  font-size: 20px;
  color: #000;
  font-family: 'Poppins', sans-serif;

}

.header-quantity {
  width: 16%;
  text-align: center;


}

.header-product {
  width: 37%;
  text-align: center;
}

.header-price {
  width: 23%;
  text-align: center;
}

.header-subtotal {
  width: 24%;
  text-align: center;
}

.products-section {
  flex: 0 0 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Centra el contenido horizontalmente */
  justify-content: center;
  margin-top: -150px;
}

/* Boton de agregar producto */
.add-product-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 12px 24px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 20px;
  /* Agrega un margen superior si deseas espacio adicional */
}

.action-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 12px 24px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

}

/* Configuracion cuadro de texto nombre */
.customer-info {
  flex: 0 0 20%;
  font-weight: bold;
}

.form-group {
  margin-bottom: 20px;
  margin-left: 30px;
}

/* Configuracion de la etiqueta */
.form-label {
  display: block;
  font-size: 20px;
  color: #000;
  margin-bottom: 5px;
}

.form-group {
  margin-bottom: 20px;
  margin-left: 30px;
}

.form-input {
  width: 100%;
  border: 1px solid rgba(35, 42, 54, 0.4);
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(66, 80, 102, 0.1);
}

/* Configuracion de la etiqueta */
.form-labelR {
  display: block;
  font-size: 20px;
  color: #000000;
  margin-bottom: 5px;
}

.form-groupR {
  margin-bottom: 20px;
  margin-left: 30px;
}

.form-inputR {
  width: 100%;
  border: 1px solid rgba(66, 80, 102, 0.4);
  border-radius: 5px;
  padding: 12px;
  box-shadow: 0 2px 4px rgba(66, 80, 102, 0.1);
}

.form-row {
  display: flex;
  gap: 17px;
  margin-bottom: 20px;
}

.form-actions {
  display: flex;
  gap: 72px;
  margin-top: 78px;
}

.button-icon {
  width: 16px;
  height: 16px;
}

@media (max-width: 991px) {
  .page-container {
    padding: 0 20px 100px;
  }

  .nav-container {
    padding: 0 20px;
    flex-direction: column;
    gap: 20px;
  }

  .nav-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .nav-right {
    flex-direction: column;
    align-items: stretch;
  }

  .search-form {
    width: 100%;
  }

  .main-content {
    margin-top: 40px;
  }

  .content-header {
    flex-direction: column;
    gap: 20px;
  }

  .page-title {
    font-size: 40px;
  }

  .quotation-form {
    flex-direction: column;
  }

  .products-section,
  .customer-info {
    width: 80%;
  }

  .products-table {
    padding: 20px;
  }

  .form-row {
    flex-direction: column;
    gap: 20px;
  }

  .form-actions {
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
  }

  .buttons-container {
    position: absolute;
    top: 20px;
    /* Ajusta la distancia desde la parte superior */
    right: 50px;
    /* Ajusta la distancia desde la parte derecha */
    display: flex;
    /* Usamos flexbox para alinear los botones */
    gap: 10px;
    /* Espacio entre los botones */
  }

  .home-button {
    width: 40px;
    /* Ajusta el tamaño del botón Home */
    height: 40px;
    /* Ajusta el tamaño del botón Home */
  }


  .home-button img {
    width: 100%;
    /* Hace que la imagen ocupe todo el tamaño del contenedor */
    height: 100%;
    /* Hace que la imagen ocupe todo el tamaño del contenedor */
  }
}

.Sislog {
  width: 100px;
  height: auto;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border: 2px solid #ddd;
}


.products-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.products-table th {
  padding: 10px 60px;
  margin-left: 5%;
  margin: 20%;
  text-align: center;
  background: none;
  color: rgb(0, 0, 0);
  font-family: 'Poppins', sans-serif;
}

.products-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.products-table td {
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

a {
  text-decoration: none;
  color: white;
}
</style>