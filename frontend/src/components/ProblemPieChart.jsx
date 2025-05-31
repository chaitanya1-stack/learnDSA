import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#60a5fa', '#f87171'];

const ProblemPieChart = ({ total, solved }) => {
  const unsolved = total - solved;

  const data = [
    { name: 'Solved', value: solved },
    { name: 'Unsolved', value: unsolved },
  ];

  return (
    <>
      {/* Inline CSS to remove focus outline from pie slices */}
      <style>
        {`
          .recharts-wrapper * {
            outline: none !important;
          }
          .recharts-pie-sector {
            outline: none !important;
          }
          path:focus {
            outline: none !important;
          }
        `}
      </style>

      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
          isAnimationActive={false} // optional: remove animation if needed
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index]}
              tabIndex={-1} // prevent focus on click
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </>
  );
};

export default ProblemPieChart;
