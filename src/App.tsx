import React, { useState } from 'react';
import './App.css';

type AppProps = {
    initPotions?: string[];
}

function App(props: AppProps) {
    const { initPotions = [] } = props;

    const [inputText, setInputText] = useState('');
    const [potions, setPotions] = useState(initPotions);

    const onAdd = () => {
        setPotions([...potions, inputText]);
        setInputText('');
    };

    const onRemove = (index: number) => {
        setPotions([
            ...potions.slice(0, index),
            ...potions.slice(index + 1),
        ]);
    };

    return (
        <div className="App">
            <h1>Список зелий:</h1>
            <div>
                {potions.map((potionName, index) => {
                    return (
                        <div
                            key={potionName}
                            className="Row"
                        >
                            <div className="Row-Name">{potionName}</div>
                            <button className="Row-Remove" onClick={() => onRemove(index)}>x</button>
                        </div>
                    )
                })}
            </div>
            <div className="Action">
                <input className="Input" value={inputText} onChange={(e) => setInputText(e.target.value)}/>
                <button className="Add" onClick={onAdd}>добавить</button>
            </div>
        </div>
    );
}

export default App;
