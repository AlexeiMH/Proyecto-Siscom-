<template>
    <div class="home-page">
      <!-- Encabezado -->
      <header class="header">

<nav class="menu">
  <RouterLink to="/" class="nav-link active">Inicio</RouterLink>
  <RouterLink to="/Login">Cotizaciones</RouterLink>

</nav>

</header>

      <!-- Sección Principal -->
      <main>
        <section class="product-section">
          <div v-for="producto in productos" :key="producto.id" class="product-card">
            <img :src="producto.imagenUrl" :alt="producto.nombre" class="product-image" />
            <div class="product-info">
              <h3>${{ producto.precio }} <span class="original-price">${{ producto.precioOriginal }}</span></h3>
              <p>{{ producto.nombre }}</p>
              <div class="product-rating">
                <span>⭐⭐⭐⭐⭐ 26,134 ratings</span>
              </div>
              <div class="product-buttons">
                <button @click="cotizarProducto(producto)" class="buy-now">Cotizar</button>
              </div>
            </div>
          </div>
        </section>
      </main>
  
      <!-- Footer -->
      <footer class="footer">
        <div class="footer-column">
          <h3>Soporte</h3>
          <div class="soporte-icons">
            <a href="mailto:soporte@siscomalarmas.mx">
              <i class="fab fa-google"></i>
              <span> soporte@siscomalarmas.mx</span>
            </a>
          </div>
        </div>
        <div class="footer-column">
          <h3>Contacto</h3>
          <div class="contacto-icons">
            <a href="mailto:ventas@siscomalarmas.mx">
              <i class="fab fa-google"></i>
              <span> ventas@siscomalarmas.mx</span>
            </a>
          </div>
          <div class="contacto-icons">
            <a href="https://wa.me/2292102494" target="_blank">
              <i class="fab fa-whatsapp"></i>
              <span> 2292102494</span>
            </a>
          </div>
        </div>
        <div class="footer-column">
          <h3>Redes Sociales</h3>
          <div class="social-icons">
            <a href="https://facebook.com" target="_blank">
              <i class="fab fa-facebook"></i>
            </a>
            <a href="https://instagram.com" target="_blank">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="https://youtube.com" target="_blank">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
<script>
export default {
  data() {
    return {
      productos: [], // Almacena los productos obtenidos del backend
    };
  },

  mounted() {
    this.getProductos(); // Llamamos a la API cuando el componente se monta
  },

  methods: {
    // Función para obtener los productos desde la API
    async getProductos() {
      try {
        const response = await fetch("http://localhost:8080/auth/producto", {
          method: "GET",
          headers: {
            Accept: "*/*",
          },

        });

        if (response.ok) {
          const productosData = await response.json();
          if (Array.isArray(productosData)) {
            this.productos = productosData.map((producto) => ({
              ...producto,
              imagenUrl: producto.img_url || `/Img/${producto.nombre
                .toLowerCase()
                .replace(/ /g, "")}.png`, // Genera la URL de la imagen si no se proporciona
              precioOriginal: producto.precioOriginal || producto.precio, // Usamos un precio original si está disponible
            }));
          } else {
            console.error("La API no devolvió una lista válida de productos.");
            alert("Error en el formato de los datos del servidor.");
          }
        } else {
          console.error("Error al obtener los productos:", response.statusText);
          alert("Error al obtener los productos desde el servidor.");
        }
      } catch (error) {
        console.error("Error de conexión al obtener los productos:", error);
        alert("Error al conectar con el servidor.");
      }
    },

    // Función para manejar la cotización de un producto
    cotizarProducto(producto) {
      // Aquí podrías redirigir a la página de cotización, pasando el ID o información del producto
      this.$router.push({ path: '/Login', query: { productoId: producto.id } });
    },
  },
};
</script>
<style scoped>
/* Estilo general */
body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

.home-page {
  max-width: 1200px;
  margin: 0 auto;
}

/* Encabezado barra menu */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Sección de productos */
.product-section {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

.product-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 23%;
  padding: 10px;
  text-align: center;
  transition: transform 0.3s;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-image {
  width: 100%;
  max-width: 200px;
  height: auto;
  margin-bottom: 10px;
}

.original-price {
  text-decoration: line-through;
  color: #888;
}

.product-info h3 {
  font-size: 1.2rem;
  color: #333;
}

.product-info p {
  font-size: 1rem;
  color: #555;
}

.product-rating span {
  font-size: 1rem;
  color: #ff9900;
}

.product-buttons {
  margin-top: 10px;
}

.buy-now {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.buy-now:hover {
  background-color: #0056b3;
}

/* Footer */
.footer {
  background-color: #f9f9f9;
  padding: 20px;
  display: flex;
  justify-content: space-between;
}

.footer-column h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.footer-column a {
  text-decoration: none;
  color: #555;
}

.footer-column a:hover {
  color: #0056b3;
}

.social-icons a {
  margin: 0 10px;
  color: #555;
}

.social-icons a:hover {
  color: #007bff;
}

a {
  color: #007bff;
  text-decoration: none;
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

.footer {
  background-color: #0056b3;
  /* Fondo azul */
  color: white;
  /* Texto blanco */
  display: flex;
  /* Elementos en línea */
  justify-content: space-around;
  /* Espaciado equitativo */
  padding: 20px 0;
  /* Espaciado vertical */
}

/* Columnas del pie de página */
.footer-column h3 {
  margin-bottom: 10px;
  /* Espaciado inferior */
}

.footer-column p {
  margin: 5px 0;
  /* Espaciado vertical */
}

.soporte-icons,
.contacto-icons,
.social-icons {
  display: flex;
  /* Elementos en línea */
  gap: 15px;
  /* Espaciado entre iconos */
  margin-top: 10px;
  /* Espaciado superior */
}

/* Estilo de los iconos en el footer */
.soporte-icons a,
.contacto-icons a,
.social-icons a {
  color: white;
  /* Color blanco */
  font-size: 15px;
  /* Tamaño de fuente */
  text-decoration: none;
  /* Sin subrayado */
  transition: transform 0.3s, color 0.3s;
  /* Efecto de transformación */
}

/* Efecto hover en los iconos */
.soporte-icons a:hover,
.contacto-icons a:hover,
.social-icons a:hover {
  color: black;
  /* Color negro al pasar el cursor */
  transform: scale(1.2);
  /* Aumenta el tamaño */
}

/* Estilo base para todos los enlaces */
a {
  text-decoration: none;
  /* Sin subrayado */
  color: white;
  /* Color blanco */
}


</style>
