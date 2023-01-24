import logo from './logo.svg';
//import './App.css';

import Menu from './components/Menu.js';

function App() {
  return (
    <div>
      <header>
        <div className="bg-gray-100 mx-auto p-4">
          <img
            src={window.location.origin + '/logo192.png'}
            alt="Sirept"
            className="mx-auto"
            width="50px"
          />
          <h1 className="text-center font-semibold text-xl">Sirept 1.0</h1>
        </div>
      </header>

      <main>
        <div className="container mx-auto p-4">
          <Menu />
        </div>
      </main>
    </div>
  );
}

export default App;
