import { useState } from 'react'

export type Callback = () => void

const useSystem = () => {
    const [count, setCount] = useState(1) // 点击次数
    const [countN] = useState(15) // 需要点击的次数
    const [second] = useState(5) // 规定时间（秒）
    const [startTime, setStartTime] = useState(0) // 第一次点击的时间
    const [endTime, setEndTime] = useState(0) // 规定时间内最后一次点击的时间

    const execute = (fun: Callback) => {
        setCount(count + 1)

        if (count === 1) {
            setStartTime(new Date().getTime() / 1000)
        }

        if (count === countN) {
            setEndTime(new Date().getTime() / 1000)

            if (endTime - startTime <= second) {
                // 条件符合的逻辑
                fun()
                setCount(0)
            } else {
                setCount(0)
            }
        }
    }

    return { execute, countN, second }
}

export default useSystem
