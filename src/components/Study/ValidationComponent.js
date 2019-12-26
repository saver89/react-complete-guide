import React from 'react';

const validationComponent = (props) => {
    const length = props.length; 
    
    let displayText;
    if (length >= 5) {
        displayText = "Text is long enough";
    } else {
        displayText = "Text is too short";
    }

    return (<div>{displayText}</div>);
}

export default validationComponent;