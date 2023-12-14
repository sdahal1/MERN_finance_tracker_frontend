import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ myExpenses, total }) => {
  console.log("my expenses from chart component", myExpenses);
  const categoriesOptions = [
    "rent_and_utilities",
    "investing",
    "grocery",
    "gas",
    "dining",
    "car",
    "social",
    "education",
    "health",
    "transportation",
    "travel",
    "entertainment",
    "insurance",
    "style",
    "other",
  ]

  // const generateCategoryColors = (numCategories) => {
  //   const colors = [];
  //   const saturation = 70; // Adjust as needed
  //   const lightness = 60; // Adjust as needed

  //   for (let i = 0; i < numCategories; i++) {
  //     const hue = (i * 360) / numCategories;
  //     const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.2)`;
  //     colors.push(color);
  //   }

  //   return colors;
  // };
  // const categoriesOnly = [... new Set(myExpenses.map(expObj=>expObj.category).sort((a,b)=>{
  //   return a.toLowerCase() < b.toLowerCase() ? -1 : 1
  // }))];

  const groupCategories = myExpenses.reduce((acc, expObj) => {
    const { category, price } = expObj;
    if (acc[category] === undefined) {
      acc[category] = price;
    } else {
      acc[category] += price;
    }
    return acc;
  }, {})

  // console.log(groupCategories)
  const pricePercentageData = categoriesOptions.map(category=>{
    if(groupCategories[category] !== undefined){
      return groupCategories[category];
    }else{
      return 0;
    }
  })
  // console.log(pricePercentageData)

  const data = {
    // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    labels: categoriesOptions,

    datasets: [
      {
        label: '% of expenses',
        data: pricePercentageData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(128, 0, 0, 0.2)',
          'rgba(0, 128, 0, 0.2)',
          'rgba(0, 0, 128, 0.2)',
          'rgba(128, 128, 0, 0.2)',
          'rgba(128, 0, 128, 0.2)',
          'rgba(0, 128, 128, 0.2)',
          'rgba(255, 0, 255, 0.2)',
          'rgba(255, 255, 0, 0.2)',
          'rgba(0, 255, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(128, 0, 0, 1)',
          'rgba(0, 128, 0, 1)',
          'rgba(0, 0, 128, 1)',
          'rgba(128, 128, 0, 1)',
          'rgba(128, 0, 128, 1)',
          'rgba(0, 128, 128, 1)',
          'rgba(255, 0, 255, 1)',
          'rgba(255, 255, 0, 1)',
          'rgba(0, 255, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className='pie_container'>
      <Pie data={data}></Pie>
    </div>
  )
}

export default ExpenseChart;