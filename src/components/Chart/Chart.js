import ChartBar from './ChartBar';
import './Chart.css';

const Chart = props => {
  return (
    <div className="chart">
      {props.dataPoints.map(dataPoint => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={null}
          label={dataPoint.label}
        /> // 모든 데이터 포인트는 value 속성이 있는 객체 형태
      ))}
    </div>
  );
};

export default Chart;
