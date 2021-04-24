import React, {useState, useEffect} from "react";
import axios from 'axios';
import DeleteRecipe from './DeleteRecipe';

const ListRecipes = (props) => {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8090/')
            .then(response => setRecipes(response.data))
            .catch(error => console.log(error));
    }, []);


    const changeParentID = (event) => {
        props.changeParentHandler(event.target.name);
    }

    const changeParentIDEdit = (event) => {
        props.changeParentHandlerEdit(event.target.name);
    }

    const DetailButton = (props) => {
        return (
            <>
                <button type="button" className="btn btn-primary" onClick={changeParentID} name={props.id}>Szczegóły</button>
            </>
        ) 
    }

    const EditButton = (props) => {
        return (
            <>
                <button type="button" className="btn btn-warning" onClick={changeParentIDEdit} name={props.id}>Edytuj</button>
            </>
        ) 
    }


    const Wiersz = (props) => {
        return (
            <>
                <tr>
                    <td>{props.recipe.id}</td>
                    <td>{props.recipe.nazwa}</td>
                    <td>
                        <form>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <DetailButton id={props.recipe.id}/>
                                <EditButton id={props.recipe.id}/>
                                <DeleteRecipe id={props.recipe.id}/>
                            </div>
                        </form>
                    </td>
                </tr>
            </>
        );
    }


    return (
        <>
        <h2>Przepisy kulinarne (GET)</h2>
        <table className="table table-bordered table-warning border-primary">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nazwa</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {recipes.map(recipe => (<Wiersz recipe={recipe} key={recipe.id}></Wiersz>))}
            </tbody>
        </table>
        </>
    );

}

export default ListRecipes;