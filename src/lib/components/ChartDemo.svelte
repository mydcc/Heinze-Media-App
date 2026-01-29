<script lang="ts">
  import { Line } from 'svelte-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from 'chart.js';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Performance',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: '#0da49a',
        tension: 0.1,
      },
    ],
  };

  const options = {
      responsive: true,
      plugins: {
          legend: {
              labels: {
                  color: 'white'
              }
          }
      },
      scales: {
          y: {
              ticks: { color: 'white' },
              grid: { color: 'rgba(255,255,255,0.1)' }
          },
          x: {
              ticks: { color: 'white' },
              grid: { color: 'rgba(255,255,255,0.1)' }
          }
      }
  };
</script>

<div class="bg-black/50 p-4 rounded-lg border border-white/10 w-full h-64">
    <Line {data} {options} />
</div>
