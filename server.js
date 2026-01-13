const express = require('express');
const path = require('path');

const app = express();

// Puerto dinámico para Railway o 3000 para desarrollo local
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Servir imágenes desde la carpeta 'images'
app.use('/images', express.static(path.join(__dirname, 'images')));

// Ruta principal - servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rutas para las páginas principales
app.get('/nosotros', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'nosotros.html'));
});

app.get('/productos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'productos.html'));
});

app.get('/servicios', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'servicios.html'));
});

app.get('/contacto', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contacto.html'));
});

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Man-Ser corriendo en puerto ${PORT}`);
    console.log(`📍 Local: http://localhost:${PORT}`);
});
