import React from 'react';

const userInput = (props) => {
    return <div style={{background: "green"}}>
            <input value={props.currentName} onChange={props.onChange}/>
        </div>;
}

export default userInput;