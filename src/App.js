import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Welcome from './components/Welcome/welcome';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Welcome nombre="Usuario" />
        <Welcome nombre="Desarrollador" />
      </main>
    </div>
  );
}

export default App;
