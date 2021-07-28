// import './App.css';

import ListData from './components/ListData';
import AddData from './components/AddData';
function App() {

  return (
    <div className="container bg-image">
    <header className="cutting-board">
    <h5 className="text-center">
    <span>App</span>
    
    </h5>
    </header>
      <div className="row">
        <div className="col-7">
          <div className="card cutting-board">
            <div className="card-body">
              <ListData />
            </div>
          </div>
        </div>
        <div className="col-5">
          <div className="card bg-success cutting-board">
            <div className="card-body">
              <AddData />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;