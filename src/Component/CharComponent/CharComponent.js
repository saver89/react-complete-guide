import React from 'react';

const charComponent = (props) => {
    return <div className="char-compnent" onClick={props.clicked}>{props.letter}</div>;
};

export default charComponent;