import ChartBar from './ChartBar';
import './Chart.css';

const Chart = props => {
  const { dataPoints } = props;

  const dataPointValues = dataPoints.map(dataPoint => dataPoint.value); // 데이터 값을 새 숫자 배열(value)로 변환한다는 의미
  const totalMaximum = Math.max(...dataPointValues);

  return (
    <div className="chart">
      {dataPoints.map(dataPoint => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMaximum}
          label={dataPoint.label}
        /> // 모든 데이터 포인트는 value 속성이 있는 객체 형태
      ))}
    </div>
  );
};

export default Chart;
