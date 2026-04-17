import React, { useEffect, useMemo, useRef } from 'react';

import type { EChartsOption } from 'echarts';

import { useECharts } from '@/hooks/useECharts';

const BarChart: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const { setOptions } = useECharts(chartRef);

    const chartOptions: EChartsOption = useMemo(
        () => ({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    // Use axis to trigger tooltip
                    type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
                },
            },
            legend: {
                top: '1%',
                left: 'center',
            },
            grid: {
                left: '1%',
                right: '7%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: {
                type: 'value',
            },
            yAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: 'series',
                    },
                    data: [320, 302, 301, 334, 390, 330, 320],
                },
                {
                    name: 'Mail Ad',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: 'series',
                    },
                    data: [120, 132, 101, 134, 90, 230, 210],
                },
                {
                    name: 'Affiliate Ad',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: 'series',
                    },
                    data: [220, 182, 191, 234, 290, 330, 310],
                },
                {
                    name: 'Video Ad',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: 'series',
                    },
                    data: [150, 212, 201, 154, 190, 330, 410],
                },
                {
                    name: 'Search Engine',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: 'series',
                    },
                    data: [820, 832, 901, 934, 1290, 1330, 1320],
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

export default BarChart;
