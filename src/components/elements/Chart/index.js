/*eslint-disable react/prop-types*/
import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'leanui-framework/components';
import './style.css';

export default function Chart(props) {
  const { data, height, labelY, subtitle, title, width, xKey, yKey } = props;

  const yLength = labelY.length;
  const xLength = data.length;
  const yrange = (height) / (yLength);
  const xrange = (width) / xLength;

  const maxY = ((yLength * yrange) + 20) - (1 * yrange);
  const minY = (0 * yrange) + 20;
  const rangePerValue = (maxY - minY) / labelY[yLength - 1];

  const YAxis = () => {
    const yc = [];
    for (let point = 0; point < yLength; point++) {
      yc.push(
        <g>
          <path
            className="line-axis"
            d={`M30,${(point * yrange) + 20}H${width}`}
            fill="none" />
          <g>
            <text className="label-text-y" x="0" y={(point * yrange) + 25}>{labelY[yLength - point - 1]}</text>
          </g>
        </g>
      );
    }

    return (<g id="yLabel">{yc}</g>);
  };

  const XAxis = ({ dataKey }) => {
    const xc = [];
    data.map((item, id) => {
      xc.push(
        <g key={item[dataKey] + id}>
          <text className="label-text" x={(id * xrange) + 30} y={((yLength - 1) * yrange) + 35}>{item[dataKey]}</text>
        </g>
      );
    });
    return (<g id="xLabel">{xc}</g>);
  };

  const Line = ({ dataKey, stroke }) => {
    const coordinate = [];
    data.map((item, id) => {
      coordinate.push(`${(id * xrange) + 30}, ${maxY - ((item[dataKey] * rangePerValue))}`);
    });

    return (
      <g>
        <path
          d={`M${coordinate.join(',')}`}
          fill="none"
          stroke={stroke}
          strokeWidth={1.5}
        />
        <g>
          {data.map((item, id) => {
            return (
              <circle className="circle-dots"
                cx={(id * xrange) + 30}
                cy={maxY - ((item[dataKey] * rangePerValue))}
                dataValue={item[dataKey]}
                key={item[dataKey] + id}
                r="3" />);
          })}
        </g>
      </g>
    );
  };

  return (
    <section className="chart-container">
      <Typography bold variant="headline-medium">{title}</Typography>
      <Typography variant="body">{subtitle}</Typography>
      <section className="svg-container">
        <svg
          ariaLabelledby="title"
          className=""
          role="img"
          version="1.2"
          viewBox={`0 0 ${width} ${height}`}
          xmlns="http://www.w3.org/2000/svg">
          <YAxis />
          <XAxis dataKey={xKey} />
          <Line dataKey={yKey} stroke="#F04F41" />
        </svg>
      </section>
    </section>
  );
}

Chart.defaultProps = {
  data: [],
  dataKey: '',
  type: 'line',
};

Chart.propTypes = {
  data: PropTypes.array,
  dataKey: PropTypes.string,
  type: PropTypes.string,
};
