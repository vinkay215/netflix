import * as React from "react"
import Svg, { Circle, Rect, Path } from 'react-native-svg';


export function Home(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="22px"
            height="22px"
            viewBox="0,0,256,256"
            {...props}
        >
            <Path
                d="M39.5 43h-9a2.5 2.5 0 01-2.5-2.5v-9a2 2 0 00-2-2h-4a2 2 0 00-2 2v9a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 016 40.5V21.413a7.502 7.502 0 012.859-5.893L23.071 4.321a1.503 1.503 0 011.857 0L39.142 15.52A7.499 7.499 0 0142 21.411V40.5a2.5 2.5 0 01-2.5 2.5z"
                transform="scale(5.33333)"
                fill={props.isActive ? props.color : 'transparent'}
                stroke={props.isActive ? 'transparent' : props.color}
                strokeWidth={props.isActive ? 0 : 4}
                strokeMiterlimit={10}
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
            />
        </Svg>
    )
}

