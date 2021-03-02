import logo from './logo.svg';
import './App.css';
import Register from './pages/Register';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Hello world</h1>
            </header>
            <Register />
        </div>
    );
}

export default App;
