import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <App />
  ,document.getElementById('root')
);

// client -> npm ci -> npm run build -> build폴더를 server로 이동
// server -> npm ci -> tsc -> node app.js