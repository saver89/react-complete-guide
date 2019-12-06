import React from 'react';

class UserOutput extends React.Component {
    render() {
        return <div className="user-output">
            <p>{this.props.username}</p>
            <p>Output 2</p>
        </div>
    }
}

export default UserOutput;