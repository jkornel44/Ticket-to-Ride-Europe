import { useSpring, animated } from 'react-spring'

export function Message({ content }) {
    
    const styles = useSpring({
        config: { duration: 500, velocity: 1},
        to: { opacity: 1},
        from: { opacity: 0},
    });
    return (
            <animated.p style={styles}>
                <span>@Játék:</span> 
                {content}
            </animated.p>
    );
}