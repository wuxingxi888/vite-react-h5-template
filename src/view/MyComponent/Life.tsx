import React from 'react'

interface IProps {
    name: string
}

class Life extends React.Component<IProps, { count: number }> {
    constructor(props: IProps) {
        console.log('constructor 构造器先调用')
        super(props)
        this.state = {
            count: 0
        }
    }

    //组件挂载完成调用
    componentDidMount() {
        console.log('componentDidMount 组件完成挂载调用')
    }

    // 组件将要卸载调用
    componentWillUnmount() {
        console.log('componentWillUnmount 组件卸载之前调用')
    }

    // 控制组件是否需要更新
    shouldComponentUpdate() {
        console.log('shouldComponentUpdate 组件是否需要更新')
        return true
    }

    // 组件更新完成
    componentDidUpdate() {
        console.log('componentDidUpdate 组件更新完成')
    }

    render() {
        console.log('render 调用')
        const { count } = this.state

        return (
            <div>
                <p>LifeCycle</p>
                <button
                    onClick={() => {
                        this.setState({
                            count: this.state.count + 1
                        })
                    }}
                >
                    点击{count}
                </button>

                <p>{this.props.name}</p>
            </div>
        )
    }
}

export default Life
