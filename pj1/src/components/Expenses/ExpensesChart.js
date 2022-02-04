import Chart from '../Chart/Chart';

const ExpensesChart = props => {
  const { expenses } = props;
  const chartDataPoints = [
    { label: 'Jan', value: 0 },
    { label: 'Feb', value: 0 },
    { label: 'Mar', value: 0 },
    { label: 'Apr', value: 0 },
    { label: 'May', value: 0 },
    { label: 'Jun', value: 0 },
    { label: 'Jul', value: 0 },
    { label: 'Aug', value: 0 },
    { label: 'Sep', value: 0 },
    { label: 'Oct', value: 0 },
    { label: 'Nov', value: 0 },
    { label: 'Dec', value: 0 },
  ];

  for (const expense of expenses) {
    const expenseMonth = expense.date.getMonth(); // starting at 0 => Jan => 0
    chartDataPoints[expenseMonth].value += expense.amount;
  }
  // expenseMonth 는 알맞은 dataPoint를 고르는 데 사용 (Jan => 0 in index)
  // 모든 expense 를 검토하고 각 달의 모든 비용을 합산
  // 그리고 알맞은 달, 알맞은 dataPoints에 값을 할당
  // for ... of 문이 끝나면 chartDataPoints 의 value 값도 달라져 있을 것임

  return <Chart dataPoints={chartDataPoints} />;
};

export default ExpensesChart;
