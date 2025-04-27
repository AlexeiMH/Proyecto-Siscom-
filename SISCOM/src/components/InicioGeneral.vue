<template>
  <div class="home-page">
    <!-- Encabezado -->
    <header class="header">

      <nav class="menu">
        <RouterLink to="/" class="nav-link active">Inicio</RouterLink>
        <RouterLink to="ProductosC">Productos</RouterLink>
      </nav>
      <div class="user-controls">

        <RouterLink to="Login" class="login-btn">Iniciar Sesión</RouterLink>
        <RouterLink to="CrearUsuario" class="register-btn">Registrarme</RouterLink>
      </div>
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
      /*mailtoLink: 'mailto:ventas@siscomalarmas.mx?subject=Consulta%20sobre%20productos&body=Estimados,%0A%0AMe%20interesa%20obtener%20más%20información%20sobre%20sus%20productos%20de%20alarmas.%0A%0AAtentamente,%0A[Tu%20nombre]',*/
    };
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

.user-controls {
  display: flex;
  align-items: center;
}

.search-bar {
  padding: 5px;
  margin-right: 15px;
  border: 1px solid #ccc;
  border-radius: 50px;
}

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

.login-btn {
  margin-right: 10px;
  background-color: white;
  color: black;
  border: 1px solid rgb(164, 159, 159);
  padding: 6px 15px;
  border-radius: 5px;
  cursor: pointer;
  border-radius: 50px;
  text-decoration: none;
}

.register-btn {
  background-color: #0056b3;
  color: #fff;
  border: 1px solid rgb(164, 159, 159);
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  border-radius: 50px;
}

/* Sección principal */
.main-banner {
  text-align: center;
  padding: 40px 0;

}

.main-banner img {
  width: 500px;
}

.main-banner h2 {
  font-size: 1.5rem;
  text-transform: uppercase;
  color: #b4b6ab;
  margin-top: 10px;
}

/* Opciones principales  carmara/alarmas/ect*/
.main-options {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;

}

.option-card {
  text-align: center;
  width: 200px;
  padding: 20px;
  background: linear-gradient(to bottom, #8ab0e9, #0b5bd3);
  border-radius: 12px;
  transition: transform 0.2s;
  font-family: 'Poppins', sans-serif;
}

.option-card:hover {
  transform: scale(1.05);
}

.option-card img {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}

/* Imagen central */
.central-image {
  text-align: center;
  margin: 20px 0;
}

.central-image img {
  width: 60%;
  max-width: 800px;
  border-radius: 15px;
}

.caption {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 10px;
}

/* Footer */
.footer {
  background-color: #0056b3;
  color: white;
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
  font-family: 'Poppins', sans-serif;

}

.footer-column h3 {
  margin-bottom: 10px;
}

.footer-column p {
  margin: 5px 0;
}

.soporte-icons {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.soporte-icons a {
  color: white;
  font-size: 15px;
  text-decoration: none;
  transition: transform 0.3s, color 0.3s;

}

.soporte-icons a:hover {
  color: black;
  transform: scale(1.2);
}

.contacto-icons {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.contacto-icons a {
  color: white;
  font-size: 15px;
  text-decoration: none;
  transition: transform 0.3s, color 0.3s;

}

.contacto-icons a:hover {
  color: black;
  transform: scale(1.2);
}

.social-icons {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.social-icons a {
  color: white;
  font-size: 24px;
  text-decoration: none;
  transition: transform 0.3s, color 0.3s;
}

.social-icons a:hover {
  color: black;
  transform: scale(1.2);
}

a {
  text-decoration: none;
  color: white;
}
</style>