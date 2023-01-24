import FuncionarioPage from './components/FuncionarioPage.js';
import logo from './logo.svg';
//import './App.css';

function App() {
  return (
    <div>
      <header>
        <div className="bg-gray-100 mx-auto p-4">
          <h1 className="text-center font-semibold text-xl">Sirept</h1>
        </div>
      </header>

      <main>
        <div className="container mx-auto p-4">
          <FuncionarioPage />
        </div>
      </main>
    </div>
  );
}

export default App;
