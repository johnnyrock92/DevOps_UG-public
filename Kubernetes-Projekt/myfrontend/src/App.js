// import './App.css';
import {useState} from "react";
import ListRecipes from './components/ListRecipes';
import GetRecipe from './components/GetRecipe';
import AddRecipe from './components/AddRecipe';
import EditRecipe from './components/EditRecipe';

function App() {

  const [id, setId] = useState(0);
  const [idEdit, setIdEdit] = useState([]);

  const Recipe = (props) => {
    return <GetRecipe id={props.id}/>;
  }

  const ERecipe = (props) => {
    return <EditRecipe id={props.id} />;
  }

  return (
    <div className="container bg-image">
    <header className="cutting-board">
    <h5 className="text-center">
    <span>
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
        <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
      </svg>
    </span>
    <br></br>
    <span>przepisykulinarne.pl</span>
    
    
    </h5>
    </header>
      <div className="row">
        <div className="col-7">
          <div className="card cutting-board">
            <div className="card-body">
              <ListRecipes changeParentHandler={setId} changeParentHandlerEdit={setIdEdit}/>
            </div>
          </div>
        </div>
        <div className="col-5">
          <div className="card bg-primary cutting-board">
            <div className="card-body">
              <Recipe id={id} />
            </div>
          </div>
          <br/>
          <div className="card bg-warning cutting-board">
            <div className="card-body">
              <ERecipe id={idEdit}/>
            </div>
          </div>
          <br/>
          <div className="card bg-success cutting-board">
            <div className="card-body">
              <AddRecipe />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;