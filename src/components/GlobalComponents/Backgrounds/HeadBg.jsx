import React, { useState } from 'react'
import { animated, useSpring } from 'react-spring'

const HeadBg = () => {
    const [active, setActive] = useState(true)
    const { x } = useSpring({config: {duration: 200},  x: active ? 1 : 0 })

    return (
        <svg width="375" height="500" viewBox="0 0 375 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
            <animated.path
                d={x.to({
                    range: [0, 1],
                    output: [
                        "M375 0H0V230.379C55.9668 200.768 119.775 184 187.5 184C255.225 184 319.033 200.768 375 230.379V0Z",
                        "M375 0H0V180.379C55.9668 220.768 119.775 230 187.5 230C255.225 230 319.033 220.768 375 180.379V0Z"
                    ]
                })}
            fill="url(#paint0_linear)"
            />
            {/* <path fill-rule="evenodd" clip-rule="evenodd" d="M375 0H0V180.379C55.9668 220.768 119.775 230 187.5 230C255.225 230 319.033 220.768 375 180.379V0Z" fill="url(#paint0_linear)"/> */}
            {/* <path fill-rule="evenodd" clip-rule="evenodd" d="M375 0H0V230.379C55.9668 200.768 119.775 184 187.5 184C255.225 184 319.033 200.768 375 230.379V0Z" fill="url(#paint0_linear)"/> */}
            <defs>
            <linearGradient id="paint0_linear" x1="-193.359" y1="-161.266" x2="134.684" y2="329.56" gradientUnits="userSpaceOnUse">
            <stop offset="0.362709" stopColor="#8EFF66"/>
            <stop offset="0.952851" stopColor="#45D9E2"/>
            </linearGradient>
            </defs>
        </svg>
    )
}

export default HeadBg
