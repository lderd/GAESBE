import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      display: false,
      max: 11,
    },
  },
};

const labels = ['1', '2', '3', '4'];

export const data = {
  labels,
  datasets: [
    {
      barThickness: 50,
      data: [1, 2, 3, 10],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)', // Bar 1
        'rgba(54, 162, 235, 0.2)', // Bar 2
        'rgba(255, 206, 86, 0.2)', // Bar 3
        'rgba(75, 192, 192, 0.2)',
      ],
    },
  ],
};

const CSMiddleChart = () => {
  return <Bar options={options} data={data} />;
};

export default CSMiddleChart;
