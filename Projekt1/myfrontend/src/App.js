// import './App.css';
import {useState} from "react";
import ListRecipes from './ListRecipes';
import GetRecipe from './GetRecipe';
import AddRecipe from './AddRecipe';
import EditRecipe from './EditRecipe';

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
    <div className="container-fluid">
    <h1>React - Frontend</h1>
      <div className="row">
        <div className="col-7">
          <div className="card">
            <div className="card-body">
              <ListRecipes changeParentHandler={setId} changeParentHandlerEdit={setIdEdit}/>
            </div>
          </div>
        </div>
        <div className="col-5">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <Recipe id={id} />
            </div>
          </div>
          <br/>
          <div className="card bg-warning">
            <div className="card-body">
              <ERecipe id={idEdit}/>
            </div>
          </div>
          <br/>
          <div className="card bg-success text-white">
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