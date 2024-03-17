import React from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Bar } from '@consta/charts/Bar';

const BarChart = () => {
  const dataSimple = [
    { parameter: 'Параметр 1', number: 1234 },
    { parameter: 'Параметр 2', number: 1083 },
    { parameter: 'Параметр 3', number: 672 },
    { parameter: 'Параметр 4', number: 301 },
    { parameter: 'Параметр 5', number: 167 },
  ];

  return (
    <Theme preset={presetGpnDefault}>
      <div>
        <Bar
          style={{
            marginBottom: 'var(--space-m)',
            maxWidth: 300,
            maxHeight: 200,
          }}
          data={dataSimple}
          xField="number"
          yField="parameter"
        />
      </div>
      <div></div>
    </Theme>
  );
};

export default BarChart;
