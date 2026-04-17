import React, { useEffect, useMemo, useRef } from 'react';

import type { EChartsOption } from 'echarts';

import { useECharts } from '@/hooks/useECharts';

const PieChart: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const { setOptions } = useECharts(chartRef);

    const chartOptions: EChartsOption = useMemo(
        () => ({
            tooltip: {
                trigger: 'item',
            },
            legend: {
                top: '1%',
                left: 'center',
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: ['50%', '60%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2,
                    },
                    label: {
                        show: false,
                        position: 'center',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold',
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' },
                    ],
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

export default PieChart;
