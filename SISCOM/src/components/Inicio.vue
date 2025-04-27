<template>
  <div class="home-page">
    <!-- Encabezado -->
    <header class="header">

      <nav class="menu">
        <RouterLink to="/Inicio" class="nav-link active">Inicio</RouterLink>
        <RouterLink to="Cotizacion2">Cotizaciones</RouterLink>
        <RouterLink to="CatalogoClientes">Catálogos</RouterLink>
        <RouterLink to="ProductosClientes">Productos</RouterLink>
      </nav>
      <RouterLink to="/" class="login-btn" @click="logout">Cerrar Sesión</RouterLink>
    </header>

    <!-- Sección principal -->
    <main>
      <!-- Logo y Slogan -->
      <section class="main-banner">
        <img src="/Img/sispng.png" alt="Siscom Tecnología & Seguridad" />
      </section>

      <!-- Opciones principales -->
      <section class="main-options">
        <div class="option-card">
          <img src="/Img/camara2.png" alt="Cámaras de Seguridad" />
          <p>Cámaras de Seguridad</p>
        </div>
        <div class="option-card">
          <img src="/Img/alarma2.png" alt="Alarmas de Seguridad" />
          <p>Alarmas de Seguridad</p>
        </div>
        <div class="option-card">
          <img src="/Img/servicio.png" alt="Servicios" />
          <p>Servicios</p>
        </div>
        <div class="option-card">
          <img src="/Img/masproductos.png" alt="Más productos" />
          <p>Más productos</p>
        </div>
      </section>

      <!-- Imagen Central -->
      <section class="central-image">
        <img src="/Img/Frame 283.png" alt="Servicios de vigilancia 24/7" />

      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-icons">
        <h3>Soporte</h3>
        <div class="soporte-icons">
          <a :href="gmailLink" target="_blank">
            <i class="fab fa-google "></i>
            <span> soporte@siscomalarmas.mx</span>
          </a>
        </div>
      </div>
      <div class="footer-column">
        <h3>Contacto</h3>
        <div class="soporte-icons">
          <a :href="gmailLink2" target="_blank">
            <i class="fab fa-google "></i>
            <span>ventas@siscomalarmas.mx</span>
          </a>
        </div>

        <!-- Fila para WhatsApp -->
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
            <i class="fab fa-facebook "></i>
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
  name: "HomePage",

  data() {
    return {
      gmailLink: 'https://mail.google.com/mail/u/0/#inbox?compose=CllgCJvlHfBmSPFCJVWrQTMxsrCzLHxZZlVqZJJwTTsxsHnqvSdrZNSVtVjLjsNSpNfcdWdRxhL',
      gmailLink2: 'https://mail.google.com/mail/u/0/#inbox?compose=CllgCJvlHfBmSPFCJVWrQTMxsrCzLHxZZlVqZJJwTTsxsHnqvSdrZNSVtVjLjsNSpNfcdWdRxhL'
    };
  },

  methods: {
    logout() {
      // Elimina el token del localStorage
      localStorage.removeItem('token'); // Ajusta 'token' al nombre exacto que usas
      localStorage.clear(); // Opcional: Elimina todo el localStorage

      // Opcional: Redirige al usuario al login
      this.$router.push('/'); // Ajusta la ruta al login si es diferente
    }
  }
};
</script>

<style scoped>
/* ======== Estilos globales ======== */
/* Define el margen y la fuente general del documento */
body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

/* ======== Encabezado (Header) ======== */
/* Contenedor del encabezado, alineado horizontalmente con sombra */
.header {
  display: flex;
  justify-content: space-between;
  /* Alinea elementos a los extremos */
  align-items: center;
  /* Centra verticalmente */
  padding: 10px;
  background-color: #f9f9f9;
  /* Fondo claro */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Sombra ligera */
}

/* Logo del encabezado */
.logo {
  height: 50px;
  /* Altura fija para el logo */
}

/* Enlaces del menú dentro del encabezado */
.menu a {
  margin: 0 15px;
  /* Espaciado horizontal entre enlaces */
  text-decoration: none;
  /* Elimina subrayado */
  color: #000;
  /* Color negro */
  font-weight: bold;
  /* Negrita */
  font-family: 'Poppins', sans-serif;
  /* Fuente personalizada */
}

/* Efecto hover en enlaces del menú */
.menu a:hover {
  color: #0056b3;
  /* Color azul al pasar el cursor */
  transform: scale(1.2);
  /* Aumenta ligeramente el tamaño */
}

/* ======== Barra de navegación ======== */
/* Contenedor de los enlaces de navegación */
.nav-links {
  display: flex;
  /* Elementos en línea */
  gap: 40px;
  /* Espaciado entre los enlaces */
  font-size: 1.2rem;
  /* Tamaño de fuente */
  color: #000;
  /* Color del texto */
  font-weight: bold;
  /* Negrita */
}

/* Estilo base para los enlaces de navegación */
.nav-link {
  text-decoration: none;
  /* Elimina subrayado */
  color: #111;
  /* Color gris oscuro */
}

/* Efecto hover en los enlaces */
.nav-link:hover {
  color: #0056b3;
  /* Azul al pasar el cursor */
  transform: scale(1.2);
  /* Aumenta ligeramente el tamaño */
}

/* Estilo para el enlace activo */
.nav-link.active {
  color: #0056b3;
  /* Azul para el enlace activo */
}

/* Contenedor derecho de navegación (para controles adicionales) */
.nav-right {
  display: flex;
  /* Elementos en línea */
  align-items: center;
  /* Centra verticalmente */
  gap: 24px;
  /* Espaciado entre elementos */
}

/* ======== Controles del usuario ======== */
/* Barra de búsqueda */
.search-bar {
  padding: 5px;
  /* Relleno interno */
  margin-right: 15px;
  /* Espaciado a la derecha */
  border: 1px solid #ccc;
  /* Borde gris claro */
  border-radius: 50px;
  /* Forma redondeada */
}

/* Botón de inicio de sesión */
.login-btn {
  margin-right: 10px;
  /* Espaciado a la derecha */
  background-color: white;
  /* Fondo blanco */
  color: black;
  /* Texto negro */
  border: 1px solid rgb(164, 159, 159);
  /* Borde gris */
  padding: 6px 15px;
  /* Relleno interno */
  border-radius: 50px;
  /* Botón redondeado */
  cursor: pointer;
  /* Cambia a puntero al pasar */
}

/* Botón de registro */
.register-btn {
  background-color: #0056b3;
  /* Fondo azul */
  color: #fff;
  /* Texto blanco */
  border: 1px solid rgb(164, 159, 159);
  /* Borde gris */
  padding: 8px 15px;
  /* Relleno interno */
  border-radius: 50px;
  /* Forma redondeada */
  cursor: pointer;
  /* Cambia a puntero al pasar */
}

/* ======== Sección principal ======== */
/* Contenedor central */
.home-page {
  max-width: 1200px;
  /* Ancho máximo */
  margin: 0 auto;
  /* Centrado horizontal */
}

/* Banner principal */
.main-banner {
  text-align: center;
  /* Centrado de texto */
  padding: 40px 0;
  /* Espaciado vertical */
}

/* Imagen dentro del banner principal */
.main-banner img {
  width: 500px;
  /* Tamaño fijo para la imagen */
}

/* Título del banner */
.main-banner h2 {
  font-size: 1.5rem;
  /* Tamaño de fuente */
  text-transform: uppercase;
  /* Texto en mayúsculas */
  color: #b4b6ab;
  /* Color gris claro */
  margin-top: 10px;
  /* Espaciado superior */
}

/* Opciones principales */
.main-options {
  display: flex;
  /* Elementos en línea */
  justify-content: space-around;
  /* Espaciado equitativo */
  padding: 20px 0;
  /* Espaciado vertical */
}

/* Tarjetas de las opciones */
.option-card {
  text-align: center;
  /* Centra texto */
  width: 200px;
  /* Ancho fijo */
  padding: 20px;
  /* Relleno interno */
  background: linear-gradient(to bottom, #8ab0e9, #0b5bd3);
  /* Gradiente de colores */
  border-radius: 12px;
  /* Bordes redondeados */
  transition: transform 0.2s;
  /* Suaviza el efecto hover */
}

/* Efecto al pasar el cursor sobre las tarjetas */
.option-card:hover {
  transform: scale(1.05);
  /* Aumenta ligeramente el tamaño */
}

/* Imagen dentro de cada tarjeta */
.option-card img {
  width: 100px;
  /* Tamaño fijo */
  height: 100px;
  /* Tamaño fijo */
  margin-bottom: 10px;
  /* Espaciado inferior */
}

/* Imagen central */
.central-image {
  text-align: center;
  /* Centrado de texto */
  margin: 20px 0;
  /* Espaciado vertical */
}

/* Estilo de la imagen central */
.central-image img {
  width: 60%;
  /* Ancho proporcional */
  max-width: 800px;
  /* Ancho máximo */
  border-radius: 15px;
  /* Bordes redondeados */
}

/* Pie de foto */
.caption {
  font-size: 1.2rem;
  /* Tamaño de fuente */
  font-weight: bold;
  /* Negrita */
  margin-top: 10px;
  /* Espaciado superior */
}

/* ======== Pie de página (Footer) ======== */
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

/* Iconos de soporte */
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
