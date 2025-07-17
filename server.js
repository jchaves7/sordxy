const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

const recursos = [
    { id: 1, title: "Grupo Facebook Sordos", description: "Comunidad en Facebook.", url: "https://facebook.com/groups/sordos", category: "facebook" },
    { id: 2, title: "Canal YouTube Señas para Todos", description: "Videos educativos en lengua de señas.", url: "https://youtube.com/channel/xxxx", category: "youtube" },
    { id: 3, title: "Cuenta Instagram Sordos Unidos", description: "Publicaciones inclusivas.", url: "https://instagram.com/sordosunidos", category: "instagram" },
    { id: 4, title: "TikTok Lengua de Señas", description: "Contenido divertido en lengua de señas.", url: "https://tiktok.com/@lenguadesenas", category: "tiktok" },
    { id: 5, title: "Accesibilidad web", description: "Cómo hacer páginas inclusivas.", url: "https://example.com/accesibilidad", category: "web" }
];

app.get('/api/search', (req, res) => {
    const q = req.query.q ? req.query.q.toLowerCase() : '';
    const filter = req.query.filter ? req.query.filter.toLowerCase() : 'all';

    // Filtrar por texto
    let results = recursos.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );

    // Filtrar por categoría (si no es 'all')
    if (filter !== 'all') {
        results = results.filter(item => item.category === filter);
    }

    res.json(results);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
