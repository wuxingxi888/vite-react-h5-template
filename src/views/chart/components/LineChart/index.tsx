import React, { useEffect, useMemo, useRef } from 'react';

import type { EChartsOption } from 'echarts';

import { useECharts } from '@/hooks/useECharts';

const LineChart: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const { setOptions } = useECharts(chartRef);

    const chartOptions: EChartsOption = useMemo(
        () => ({
            title: {
                text: 'Stacked Area Chart',
                top: '1%',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985',
                    },
                },
            },
            legend: {
                data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
                top: '10%',
            },
            toolbox: {
                feature: {
                    saveAsImage: {},
                },
            },
            grid: {
                top: '30%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                },
            ],
            yAxis: [
                {
                    type: 'value',
                },
            ],
            series: [
                {
                    name: 'Email',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series',
                    },
                    data: [120, 132, 101, 134, 90, 230, 210],
                },
                {
                    name: 'Union Ads',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series',
                    },
                    data: [220, 182, 191, 234, 290, 330, 310],
                },
                {
                    name: 'Video Ads',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series',
                    },
                    data: [150, 232, 201, 154, 190, 330, 410],
                },
                {
                    name: 'Direct',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series',
                    },
                    data: [320, 332, 301, 334, 390, 330, 320],
                },
                {
                    name: 'Search Engine',
                    type: 'line',
                    stack: 'Total',
                    label: {
                        show: true,
                        position: 'top',
                    },
                    areaStyle: {},
                    emphasis: {
                        focus: 'series',
                    },
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                },
            ],
        }),
        [],
    );

    useEffect(() => {
        if (chartRef.current) {
            setOptions(chartOptions);
        }
    }, [chartOptions, setOptions]);

    return (
        <div className="my-card m-20px rounded-2xl p-10px shadow-xl">
            <div ref={chartRef} style={{ height: '350px' }} />
        </div>
    );
};

export default LineChart;
