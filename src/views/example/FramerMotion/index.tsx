import type React from 'react';

import { Card } from 'antd-mobile';
import { motion } from 'framer-motion';

import CustomNavBar from '@/components/CustomNavBar';

const FramerMotionExample: React.FC = () => {
    return (
        <div className="w-full h-full">
            <CustomNavBar></CustomNavBar>

            <div className="p-4 space-y-4">
                {/* 基础动画示例 */}
                <Card title="基础动画">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: 'reverse',
                        }}
                        className="w-20 h-20 bg-blue-500 rounded-lg flex items-center justify-center text-white"
                    >
                        动画
                    </motion.div>
                </Card>

                {/* 悬停效果 */}
                <Card title="悬停效果">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                    >
                        悬停我
                    </motion.button>
                </Card>

                {/* 列表动画 */}
                <Card title="列表动画">
                    <motion.ul
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.1,
                                },
                            },
                        }}
                    >
                        {[1, 2, 3, 4].map((item) => (
                            <motion.li
                                key={item}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                className="p-2 mb-2 bg-gray-100 rounded"
                            >
                                列表项 {item}
                            </motion.li>
                        ))}
                    </motion.ul>
                </Card>

                {/* 拖拽动画 */}
                <Card title="拖拽效果">
                    <motion.div
                        drag
                        dragConstraints={{
                            top: -50,
                            left: -50,
                            right: 50,
                            bottom: 50,
                        }}
                        whileDrag={{ scale: 1.1 }}
                        className="w-16 h-16 bg-red-500 rounded-full cursor-grab"
                    />
                </Card>

                {/* 路径动画 */}
                <Card title="路径动画">
                    <motion.svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto">
                        <motion.path
                            d="M20,50 a30,30 0 1,0 60,0 a30,30 0 1,0 -60,0"
                            fill="none"
                            stroke="#ff6b6b"
                            strokeWidth="5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.svg>
                </Card>

                {/* 页面切换动画 */}
                <Card title="页面切换动画">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.5 }}
                        className="p-4 bg-yellow-100 rounded"
                    >
                        <p>这是一个带有进入和退出动画的组件</p>
                    </motion.div>
                </Card>

                {/* 弹簧动画 */}
                <Card title="弹簧效果">
                    <motion.div
                        whileHover={{
                            position: 'relative',
                            zIndex: 1,
                            scale: 1.2,
                            transition: {
                                type: 'spring',
                                stiffness: 300,
                                damping: 10,
                            },
                        }}
                        className="inline-block p-3 bg-purple-500 text-white rounded"
                    >
                        弹簧效果
                    </motion.div>
                </Card>

                {/* 循环动画 */}
                <Card title="循环动画">
                    <motion.div
                        animate={{
                            rotate: 360,
                            borderRadius: ['0%', '50%', '0%'],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        className="w-20 h-20 bg-pink-500 mx-auto"
                    />
                </Card>
            </div>
        </div>
    );
};

export default FramerMotionExample;
