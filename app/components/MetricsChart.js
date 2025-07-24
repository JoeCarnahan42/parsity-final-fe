import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export const PieChart = ({ used, budgeted, title }) => {
  let labels, dataValues, colors;

  if (used <= budgeted) {
    // Under budget: show Used and Remaining
    labels = ["Used", "Remaining"];
    dataValues = [used, budgeted - used];
    colors = ["#f87171", "#60a5fa"];
  } else {
    // Over budget: show Budgeted and Over Budget
    labels = ["Budgeted", "Over Budget"];
    dataValues = [budgeted, used - budgeted];
    colors = ["#60a5fa", "#facc15"];
  }

  const total = dataValues.reduce((sum, val) => sum + val, 0);

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: colors,
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: {
        display: !!title,
        text: title,
      },
      datalabels: {
        formatter: (value) => {
          if (total === 0) return "0 (0%)";
          const percent = ((value / total) * 100).toFixed(1);
          return `${value} (${percent}%)`;
        },
        color: "black",
        font: { weight: "bold" },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            if (total === 0) return `${context.label}: 0 (0%)`;
            const percent = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} (${percent}%)`;
          },
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};
