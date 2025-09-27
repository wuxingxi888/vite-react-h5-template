import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';

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
