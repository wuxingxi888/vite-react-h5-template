import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';

function Chart() {
    return (
        <div>
            <LineChart></LineChart>
            <BarChart></BarChart>
            <PieChart></PieChart>
        </div>
    );
}

export default Chart;
