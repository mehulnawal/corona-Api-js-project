/*
100%
active 
recovered 
deaths 

Total cases - 704753890 - 95.87
Total active - 22123398 - 3.14
Total recovered - 675619811
Total deaths - 7010681 - 0.99
*/

const ctx = document.getElementById('distribution-chart').getContext('2d');

new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Recovered', 'Active', 'Deaths'],
        datasets: [{
            data: ["95.87", "3.14", "0.99"],
            backgroundColor: ['#10B981', '#FBBF24', '#EF4444'],
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