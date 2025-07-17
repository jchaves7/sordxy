let currentFilter = "all";

// Escuchar clics en los botones de filtro
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentFilter = btn.getAttribute('data-filter');
        runSearch();
    });
});

// Escuchar clic en botón Buscar
document.getElementById('searchBtn').addEventListener('click', runSearch);

function runSearch() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();

    fetch(`/api/search?q=${encodeURIComponent(query)}&filter=${currentFilter}`)
        .then(res => res.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            if (data.length === 0) {
                resultsDiv.innerHTML = "<p>No se encontraron resultados.</p>";
            } else {
                resultsDiv.innerHTML = data.map(item => `
                    <div class="result-item">
                        <h3><a href="${item.url}" target="_blank">${item.title}</a></h3>
                        <div class="url"><a href="${item.url}" target="_blank">${item.url}</a></div>
                        <p>${item.description}</p>
                    </div>
                `).join('');
            }
        })
        .catch(err => {
            console.error('Error:', err);
            document.getElementById('results').innerHTML = "<p>Error al buscar.</p>";
        });
}
