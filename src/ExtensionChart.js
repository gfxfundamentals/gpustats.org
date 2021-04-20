import React from 'react';
import { ResponsiveLine } from '@nivo/line';

export default function FeatureChart({
    data,
    apiName,
    extensionName
  }) {
  const totalDevicesByMonth = [];
  const extensionByMonth = [];
  data.categories.forEach(cat => {
    cat.count.forEach((count, i) => {
      totalDevicesByMonth[i] = (totalDevicesByMonth[i] || 0) + count;
    });
    const api = cat.api[apiName];
    if (api) {
      const countsByMonth = api.extensions[extensionName];
      if (countsByMonth) {
        countsByMonth.forEach((count, i) => {
          extensionByMonth[i] = (extensionByMonth[i] || 0) + count;
        });
      }
    }
  });

  const totals = [{
    'id': 'foo',
    data: extensionByMonth.map((total, i) => ({x: i, y: total / totalDevicesByMonth[i]})),
  }];

  return (
  <ResponsiveLine
      margin={{top: 20, right: 20, bottom: 60, left: 80}}
      animate={true}
      data={totals}
      curve={'monotoneX'}
      enablePoints={false}
      enableGridX={false}
      xScale={{
          type: 'linear',
      }}
      yScale={{
          type: 'linear',
          stacked: false,
          min: 0,
          max: 1,
      }}
     tooltip={(data) => {
          return (
              <div
                  style={{
                      background: 'white',
                      padding: '9px 12px',
                      border: '1px solid #ccc',
                  }}
              >
                  <div>{`${(data.point.data.y * 100).toFixed(0)}%`}</div>
              </div>
          )
      }}
      axisLeft={{
        format: v => `${v * 100}%`,
      }}
      axisBottom={{
          format: v => (new Date(2000, (v + data.startMonth) % 12)).toLocaleString('default', { month: 'short' }),
      }}
      enableArea={true}
      areaOpacity={1}
      enableSlices={false}
      useMesh={true}
      crosshairType="cross"
    />
  );
}