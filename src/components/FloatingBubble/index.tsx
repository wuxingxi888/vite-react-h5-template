import { FloatingBubble } from 'antd-mobile'
import { MessageFill } from 'antd-mobile-icons'

const CustomFloatingBubble = () => {
    const onClick = () => {
        console.log('点击悬浮球')
    }
    return (
        <div>
            <FloatingBubble
                axis="xy"
                magnetic="x"
                style={{
                    '--initial-position-bottom': '24px',
                    '--initial-position-right': '24px',
                    '--edge-distance': '8px',
                    '--background': 'transition'
                }}
                onClick={onClick}
            >
                <MessageFill style={{ color: '#1677ff' }} fontSize={30} />
            </FloatingBubble>
        </div>
    )
}

export default CustomFloatingBubble
