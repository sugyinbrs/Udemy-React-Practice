import './ChartBar.css';

const ChartBar = props => {
  const { label, max, value, maxValue } = props;

  let barFillHeight = '0%';

  if (max > 0) {
    barFillHeight = Math.round((value / maxValue) * 100);
    +'%';
  }

  return (
    <div className="chart-bar">
      <div className="chart-bar__inner">
        <div className="chart-bar__fill" style={{ height: barFillHeight }} />
      </div>
      <div className="chart-bar__label">{label}</div>
    </div>
  );
};

export default ChartBar;
