import { createApp } from "vue";
import App from "./App.vue";
import router from "./Direccionamientos.js";

const app = createApp(App);

app.use(router); // Usa el router configurado
app.mount("#app"); // Asocia la aplicación al elemento #app en index.html
