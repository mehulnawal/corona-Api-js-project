const ctx = document.getElementById('distribution-chart').getContext('2d');

new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Active', 'Recovered', 'Deaths'],
        datasets: [{
            data: [300, 500, 200],
            backgroundColor: ['#FBBF24', '#10B981', '#EF4444'],
            hoverOffset: 4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});