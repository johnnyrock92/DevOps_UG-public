import React, {useState, useEffect} from 'react';

function Hooktest() {

    const [count, setCount] = useState(0);

    

    useEffect(() => {
        document.title = `Naciśnięto ${count} razy`;
    });
    

    const AddButton = () => {
        return (
            <>
                <button onClick={() => setCount(count + 1)}>Dodaj 1 do obecnej liczby</button>
            </>
        )
        
    }


    return (
        <>
            <p>Naciśnięto {count} razy</p>
            <AddButton />
        </>
    );
}




export default Hooktest;