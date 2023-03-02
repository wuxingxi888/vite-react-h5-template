import React, { useState, useImperativeHandle } from 'react'
import { PasscodeInput, NumberKeyboard } from 'antd-mobile'

const CustomPasscodeInput = React.forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        getPwdStr,
        setErr
    }))

    const [error, setError] = useState(false)

    const [pwd, setPwd] = useState('')

    const getPwdStr = (): string => pwd

    const setErr = (status: boolean): void => setError(status)

    const onChange = (value: string) => {
        setError(false)
        setPwd(value)
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <div>请输入开发者密码</div>
            <PasscodeInput
                style={{
                    '--cell-size': '38px',
                    marginTop: '10px'
                }}
                seperated
                onChange={onChange}
                keyboard={<NumberKeyboard />}
                error={error}
            />
        </div>
    )
})

CustomPasscodeInput.displayName = 'CustomPasscodeInput'

export default CustomPasscodeInput
