export function Build({route, selectedCards, onBuild, onReset}) {
    const good = { color: 'green' };
    const bad = { color: 'red' };

    const isConstructable = () => {
        return selectedCards.length == route.elements.length ? good : bad;
    }

    const handleBuild = () => {
        if(route.elements.length === selectedCards.length) {
            onBuild();
        }
    }

    const handleReset = () => {
            onReset();
    }

    return (
        <div id='buildpanel'>
            <div id='selectedCards'>
                <p className='count'> Kiválasztott lapok: </p>
                <p style={isConstructable()}>[ {selectedCards.map(c => c+' ')}]</p>
            </div>
            <button id='build_btn' className='button' onClick={handleBuild}>
                Szakasz megépítése
            </button>
            <button id='reset_btn' className='button' onClick={handleReset}>
                X
            </button>
        </div>
    );
}