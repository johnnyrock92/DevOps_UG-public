import React, {useState, useEffect} from "react";
import axios from 'axios';

const GetRecipe = (props) => {

    const [recipe, setRecipe] = useState([]);



    useEffect(() => {
        axios.get(`api/przepisy/${props.id}`)
            .then(response => setRecipe(response.data))
            .catch(error => console.log(error));
    }, [props.id]);


    
    return (
        <>
        <h5 className="card-title">{recipe.nazwa}</h5>
        <h6 className="card-subtitle mb-2">ID: {props.id}</h6>
        
        <p className="card-text">Składniki: {recipe.skladniki}</p>
        <p className="card-text">Opis: {recipe.opis}</p>
        <small>Data dodania: {recipe.data}</small>
        </>
    );

    
}

export default GetRecipe;