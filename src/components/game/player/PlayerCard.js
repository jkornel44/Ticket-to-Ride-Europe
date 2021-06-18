import { useSpring, animated } from 'react-spring'

export function PlayerCard({number, color, handleClick, handleContext}) {
    
    const setCardNumber = (number) =>
    {
        switch(number) {
            case 1: return <span>&#10122;</span>;
            case 2: return <span>&#10123;</span>;
            case 3: return <span>&#10124;</span>;
            case 4: return <span>&#10125;</span>;
            case 5: return <span>&#10126;</span>;
            case 6: return <span>&#10127;</span>;
            case 7: return <span>&#10128;</span>;
            case 8: return <span>&#10129;</span>;
            case 9: return <span>&#10130;</span>;
            case 10: return <span>&#10131;</span>;
            default: return  '';
        }  
    }

    const styles = useSpring({
        config: { duration: 500, velocity: 1},
        to: { opacity: 1},
        from: { opacity: 0},
    });


    const drawCard = (card) => {
        handleClick(card)
    } 

    return (
        <animated.li className="card" id={color} style={styles} onClick={() => drawCard(color)} onContextMenu={() => handleContext(color)}>
            {setCardNumber(number)}
        </animated.li>
    );
}