import React, { useState } from 'react';
import './App.css';

function App() {
    const [inputText, setInputText] = useState('');
    const [potions, setPotions] = useState(['Оборотное зелье']);

    const onAdd = () => {
        setPotions([...potions, inputText]);
        setInputText('');
    };

    const onRemove = (index: number) => {
        setPotions([
            ...potions.slice(0, index),
            ...potions.slice(index+1),
        ]);
    };

    return (
        <div className="App">
            <h1>Список зелий:</h1>
            <div>
                {potions.map((potion, index) => {
                    return (
                        <div className="Row">
                            <div className="Row-Name">{potion}</div>
                            <button className="Row-Remove" onClick={() => onRemove(index)}>x</button>
                        </div>
                    )
                })}
            </div>
            <div className="Action">
                <input value={inputText} onChange={(e) => setInputText(e.target.value)}/>
                <button className="Add" onClick={onAdd}>добавить</button>
            </div>
        </div>
    );
}

export default App;
