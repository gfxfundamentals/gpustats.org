import React, {useContext} from 'react';
import DataContext from './DataContext.js';
import { ResponsiveContainer ,AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';

const getPercent = (value, total) => {
  const ratio = total > 0 ? value / total : 0;
  return toPercent(ratio);
};

function Circle(props) {
  const {color} = props;
  return (
    <svg style={{width: '1em', height: '1em'}} viewBox="0 0 40 40" >
      <circle cx="20" cy="20" r="20" fill={color}/>
    </svg>
  );
}

const toMonth = startMonth => v => (new Date(2000, (v + startMonth) % 12)).toLocaleString('default', { month: 'short' });
const toPercent = (decimal) => `${(decimal * 100).toFixed(0)}%`;
const renderTooltipContentImpl = valueFormatter => (o) => {
  const { payload /*, label*/ } = o;
  if (!payload) {
    return [];
  }
  const total = payload.reduce((result, entry) => (result + entry.value), 0);
  return (
    <div className="tooltip-content legend">
        {
          payload.reverse().map((entry, index) => (
            <>
              <div key={`item1-${index}`} className="color"><Circle color={entry.color}/></div>
              <div key={`item2-${index}`} className="value">{entry.name}</div>
              <div key={`item3-${index}`} className="percent">{valueFormatter(entry.value, total)}</div>
           </>
          ))
        }
    </div>
  );
};
const renderTooltipContentPercentOfTotal = renderTooltipContentImpl(getPercent);
const renderTooltipContentPercent = renderTooltipContentImpl(v => `${(v * 100).toFixed(0)}%`);

function Legend(props) {
  const {data, colors , percentOfTotal} = props;
  const categories = data.length
      ? Object.keys(data[0]).filter(k => k !== 'month')
      : [];
  const last = data[data.length - 1];
  const total = categories.reduce((sum, category) => sum + last[category], 0);
  return (
    <div className="legend">
      {
        categories.reverse().map((category, i, array) => {
          const percent = percentOfTotal
              ? last[category] / total * 100
              : last[category] * 100;
          return (
            <>
              <div key={`l1-${i}`} className="color"><Circle color={colors(array.length - i - 1)}/></div>
              <div key={`l2-${i}`} className="value">{category}</div>
              <div key={`l3-${i}`} className="percent">{percent.toFixed(0)}%</div>
            </>
          );
        })
      }
    </div>
  );
}

const byNumber = (a, b) => Math.sign(parseFloat(b) - parseFloat(a));

function dataToFeatureChartData(data, apiName, featureName, filter) {
  const valuesToAmountsPerMonthMap = new Map();
  data.categories.filter(filter).forEach(category => {
    const api = category.api[apiName];
    if (api) {
      const feature = api.features[featureName];
      if (feature) {
        for (const [value, amountForEachMonth] of Object.entries(feature)) {
          const amountsPerMonth = valuesToAmountsPerMonthMap.get(value) || [];
          valuesToAmountsPerMonthMap.set(value, amountsPerMonth);
          amountForEachMonth.forEach((amountForMonth, i) => {
            amountsPerMonth[i] = (amountsPerMonth[i] || 0) + amountForMonth;
          });
        }
      }
    }
  });
  const values = [...valuesToAmountsPerMonthMap.keys()];
  if (!values.length) {
    return [];
  }
  const sortedValues = values.sort(byNumber);
  const numMonths = valuesToAmountsPerMonthMap.get(values[0]).length;
  const chartData = [];
  for (let i = 0; i < numMonths; ++i) {
    const column = Object.fromEntries([
      ['month', i],
      ...sortedValues.map(value => [value, valuesToAmountsPerMonthMap.get(value)[i]]),
    ]);
    chartData.push(column);
  }

  return chartData;
}

function dataToExtensionChartData(data, apiName, extensionName, filter) {
  const totalDevicesByMonth = [];
  const extensionByMonth = [];
  data.categories.filter(filter).forEach(cat => {
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

  const chartData = extensionByMonth.map((numExtension, i) => {
    const column = Object.fromEntries([
      ['month', i],
      ['ext', numExtension / totalDevicesByMonth[i]],
    ]);
    return (column);
  });

  return chartData;
}

function dataToAPIChartData(data, apiName, filter) {
  const totalDevicesByMonth = [];
  const apiByMonth = [];
  data.categories.filter(filter).forEach(cat => {
    cat.count.forEach((count, i) => {
      totalDevicesByMonth[i] = (totalDevicesByMonth[i] || 0) + count;
    });
    const api = cat.api[apiName];
    if (api) {
      api.availability.forEach((count, i) => {
        apiByMonth[i] = (apiByMonth[i] || 0) + count;
      });
    }
  });

  const chartData = apiByMonth.map((numAPI, i) => {
    const column = Object.fromEntries([
      ['month', i],
      ['api', numAPI / totalDevicesByMonth[i]],
    ]);
    return (column);
  });

  return chartData;
}

export default function FooChart(props) {
  const {
    apiName,
    colors,
    data,
    extensionName,
    featureName,
    filter,
    showFeature,
  } = useContext(DataContext);
  const justAPI = !(featureName || extensionName);
  const chartData = justAPI
      ? dataToAPIChartData(data, apiName, filter)
      : showFeature
          ? dataToFeatureChartData(data, apiName, featureName, filter)
          : dataToExtensionChartData(data, apiName, extensionName, filter);
  const categories = chartData.length
      ? Object.keys(chartData[0]).filter(k => k !== 'month')
      : [];
  const stackOffset = justAPI
      ? 'none'
      : showFeature ? 'expand' : 'none';
  const percentOfTotal = stackOffset === 'expand';

  return (
    <div className="chart-holder">
      <div className="chart-heading">
        {`${apiName}${justAPI ? '' : `: ${showFeature ? featureName : extensionName}`}`}
      </div>
      <div className="chart">
        <div className="graph-area">
          <ResponsiveContainer>
            <AreaChart
              data={chartData}
              stackOffset={stackOffset}
              margin={{
                top: 0, right: 20, left: 0, bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickFormatter={toMonth(5)} 
                tick={{ fill: 'var(--main-fg-color)' }}
               />
              <YAxis
                tickFormatter={toPercent}
                tick={{ fill: 'var(--main-fg-color)' }}
                domain={percentOfTotal ? [0, 'dataMax'] : [0, 1]}
              />
              <Tooltip content={percentOfTotal ? renderTooltipContentPercentOfTotal : renderTooltipContentPercent} animationDuration={0} />
              {categories.map((category, i) => {
                const color = colors(i);
                return <Area key={`c${i}`} type="monotoneX" dataKey={category} stackId="1" stroke={color} fillOpacity={1} fill={color} />;
              })}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div class="legend-area">
          <Legend data={chartData} colors={colors} percentOfTotal={percentOfTotal} />
        </div>
      </div>
    </div>
  );
}

