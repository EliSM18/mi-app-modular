import './App.css';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <TodoList />
      </main>
    </div>
  );
}

export default App;
