import axios from 'axios';

const instance = axios.create({
    baseURL: "https://react-my-burger-f209f.firebaseio.com/"
});

export default instance;