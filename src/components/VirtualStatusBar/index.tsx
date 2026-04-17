import React from 'react';

import styles from './index.module.scss';

interface VirtualStatusBarProps {
    className?: string;
}

const VirtualStatusBar: React.FC<VirtualStatusBarProps> = ({ className = '' }) => {
    // 获取当前时间
    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // 获取电池电量百分比
    const getBatteryLevel = () => {
        // 这里可以集成真实的电池API，目前返回模拟值
        return 100;
    };

    // 获取信号强度
    const getSignalStrength = () => {
        // 这里可以集成真实的信号API，目前返回模拟值
        return 4; // 1-4格信号
    };

    const batteryLevel = getBatteryLevel();
    const signalStrength = getSignalStrength();

    return (
        <div className={[styles.virtualStatusBar, className].filter(Boolean).join(' ')}>
            <div className="content">
                <div className="left">
                    <span className="time">{getCurrentTime()}</span>
                </div>

                <div className="right">
                    {/* 信号强度 */}
                    <div className="signal">
                        <div className="signal-bars">
                            {Array.from({ length: 4 }, (_, index) => (
                                <div
                                    key={index}
                                    className={`signal-bar ${
                                        index < signalStrength ? 'active' : ''
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* 电池 */}
                    <div className="battery">
                        <div className="battery-container">
                            <div className="battery-level">
                                <div
                                    className="battery-fill"
                                    style={{ width: `${batteryLevel}%` }}
                                />
                            </div>
                            <div className="battery-tip" />
                        </div>
                        <span className="battery-percentage">{batteryLevel}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VirtualStatusBar;
