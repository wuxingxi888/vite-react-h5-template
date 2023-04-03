import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Space } from 'antd-mobile'

interface IProps {
    name: string
}

const MyComponent = (props: IProps) => {
    const [isHot, setIsHot] = useState(false)

    return (
        <div>
            <Space justify="center">
                <Button size="mini" color="primary" onClick={() => setIsHot(!isHot)}>
                    中文
                </Button>
            </Space>

            <h1>今天天气很{isHot ? '炎热' : '凉爽'}</h1>

            <h1>hello {props.name}</h1>
        </div>
    )
}

MyComponent.propTypes = {
    name: PropTypes.string.isRequired
}

MyComponent.defaultProps = {
    name: 'Taylor'
}

export default MyComponent
