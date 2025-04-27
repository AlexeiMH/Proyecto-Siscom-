<template>
  <div class="container">
    <!-- Barra Lateral -->
    <aside class="sidebar">
      <ul class="menu">
        <RouterLink to="/CatalogoClientes" class="menu-item">
          <img src="/Img/Clientes.png" alt="icoCliente" class="menu-icon" />
          Clientes
        </RouterLink>
        <RouterLink to="/CatalogoProductos" class="menu-item active">
          <img src="/Img/Productos.png" alt="icoProductos" class="menu-icon" />
          Productos
        </RouterLink>
        <RouterLink to="/CatalogoServicios" class="menu-item">
          <img src="/Img/Servicios.png" alt="icoServicios" class="menu-icon" />
          Servicios
        </RouterLink>
      </ul>
    </aside>

    <!-- Contenido Principal -->
    <main class="content">
      <header class="header">
        <img src="/Img/sispng.png" alt="Logo Siscom" class="nav-brands" />
        <h1>Productos</h1>

        <div class="buttons-container">
          <RouterLink to="/Inicio" class="home-button">
            <img src="/Img/home.png" alt="Home" />
          </RouterLink>

          <!-- Botón para abrir el modal -->
          <button type="button" class="add-product-button" @click="mostrarModal">
            <span>Agregar Producto</span>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/697dc3c0c8744d943a782ba94f0b244fa86f6a2d6f911dacd7bd1989e48c7486?placeholderIfAbsent=true&apiKey=1f87a0a071d64092ac793b0969808bca"
              alt="Icono Agregar Producto"
              class="button-icon"
            />
          </button>
        </div>
      </header>

      <!-- Tabla de productos -->
      <table class="table">
        <thead>
          <tr>
            <th>Seleccionar</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Modelo</th>
            <th>Precio</th>
            <th>Fabricante</th>
            <th>Inventario</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productos" :key="producto.id">
            <td>
              <input type="checkbox" v-model="producto.selected" />
            </td>
            <td>
              <img
                :src="producto.imagenUrl"
                alt="Imagen del producto"
                width="50"
                height="50"
              />
            </td>
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.modelo }}</td>
            <td>{{ producto.precio }}</td>
            <td>{{ producto.marca }}</td>
            <td>{{ producto.cantidad }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Modal -->
      <div v-if="modalVisible" class="modal-overlay">
        <div class="modal-content">
          <CrearProducto @cerrar-modal="cerrarModal" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import CrearProducto from "./CrearProducto.vue";

export default {
  components: {
    CrearProducto,
  },
  data() {
    return {
      modalVisible: false,
      productos: [], // Lista para almacenar los productos obtenidos
    };
  },
  mounted() {
    this.getProductos();
  },
  methods: {
    async getProductos() {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("No se encontró un token de autenticación.");
          return;
        }

        const response = await fetch("http://localhost:8080/api/v1/producto", {
          method: "GET",
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Productos obtenidos:", data);

          this.productos = data.map((producto) => ({
            ...producto,
            seleccionado: false, // Checkbox desmarcado por defecto
            imagenUrl: producto.img_url || `/Img/${producto.nombre
                .toLowerCase()
                .replace(/ /g, "")}.png`, // Generar la URL de la imagen si no se proporciona
            }));
        } else {
          console.error("Error al obtener los productos", response.status);
          alert("No se pudieron obtener los productos.");
        }
      } catch (error) {
        console.error("Error en la conexión:", error);
        alert("Hubo un error al conectar con el servidor.");
      }
    },

    mostrarModal() {
      this.modalVisible = true;
    },

    cerrarModal() {
      this.modalVisible = false;
    },

    getImageUrl(path) {
      // Si la URL es relativa, se añadirá '/Img/' antes de la ruta
      return path.startsWith('http') ? path : `/Img/${path}`;
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 1000px;
  max-width: 90%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* Otros estilos */
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th,
.table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

body {
  font-family: 'Poppins', sans-serif;
}

/* Estilos de la barra lateral */
.sidebar {
  background: linear-gradient(180deg, #f7f7f7, #eaeaea);
  width: 250px;
  /* Reducir el ancho de la barra lateral */
  height: 100vh;
  padding: 20px;
  box-shadow: 2px 0 10px gray;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  /* Fijar la barra lateral */
}

.profile-section {
  text-align: center;
  margin-bottom: 10px;
}

.profile-pic {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.profile-info h3 {
  font-size: 15px;
  margin: 0;
}

.profile-info p {
  font-size: 14px;
  color: gray;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  width: 100%;
}

.menu-item {
  display: flex;
  align-items: center;
  background: white;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 80%;
}

.menu-item:hover {
  background: #0056b3;
  color: white;
  transform: scale(1.05);
}

.menu-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.menu-item.active {
  background: linear-gradient(90deg, #007bff, #003d99);
  color: white;
  font-weight: bold;
}

.menu-item:hover {
  background: #0056b3;
  color: white;
  transform: scale(1.05);
}

.menu-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.container {
  display: flex;
  margin-left: 0;
  /* Eliminar el margen para mover hacia la izquierda */
}

.content {
  margin-left: 300px;
  /* Ajuste para que el contenido se muestre correctamente */
  padding: 20px;
  width: 100%;
}

.header h1 {
  text-align: center;
  font-size: 24px;
  font-family: 'Poppins', sans-serif;
  color: black;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border: 2px solid #ddd;
}

.table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.table th {
  text-align: center;
  background: none;
  color: black;
  font-family: 'Poppins', sans-serif;
}

.table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table tr:hover {
  background-color: #e6f7ff;
}

.table td {
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

.nav-brands {
  width: 500px;
  display: block;
  margin: auto;
  text-align: center;
}

.buttons-container {
  position: absolute;
  top: 10px;
  /* Ajusta la distancia desde la parte superior */
  right: 10px;
  /* Ajusta la distancia desde la parte derecha */
  display: flex;
  /* Usamos flexbox para alinear los botones */
  gap: 10px;
  /* Espacio entre los botones */
}

.home-button {
  position: fixed; /* Hace que el botón sea fijo en la ventana */
  top: 20px; /* Ajusta la distancia desde la parte superior */
  left: 350px; /* Ajusta la distancia desde la izquierda */
  z-index: 1001; /* Asegura que esté encima del resto del contenido */
  width: 40px; /* Ajusta el tamaño del botón */
  height: 40px; /* Ajusta el tamaño del botón */
  display: flex; /* Centrar la imagen */
  justify-content: center;
  align-items: center;
  background-color: #007bff; /* Color de fondo */
  border-radius: 50%; /* Hace que el botón sea redondo */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Sombra para efecto flotante */
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.home-button img {
  width: 20px; /* Ajusta el tamaño de la imagen */
  height: 20px;
}

.home-button:hover {
  transform: scale(1.1); /* Efecto de escala al pasar el mouse */
  background-color: #0056b3; /* Cambio de color al pasar el mouse */
}

a {
  text-decoration: none;
  color: #333;
}

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
</style>
