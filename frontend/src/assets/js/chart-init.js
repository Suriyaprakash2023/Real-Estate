// diagram
var ctx = document.getElementById("lineChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "line",
  backgroundColor:
    "#EE6742",
  data: {
    labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
    datasets: [
      {
        label: "Page views",
        data: [500, 640, 550, 600, 690, 900, 1000],
        backgroundColor: ["#ED2027"],
        // background: linear-gradient(180deg, rgba(255, 169, 32, 0.2) 0.26%, rgba(255, 169, 32, 0) 100%),

        borderColor: ["#ED2027"],
        borderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
