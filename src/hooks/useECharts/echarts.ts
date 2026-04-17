import { BarChart, LineChart, PieChart } from 'echarts/charts';
import {
    GridComponent,
    LegendComponent,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { SVGRenderer } from 'echarts/renderers';

echarts.use([
    LegendComponent,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    BarChart,
    LineChart,
    PieChart,
    SVGRenderer,
    ToolboxComponent,
]);

export default echarts;
