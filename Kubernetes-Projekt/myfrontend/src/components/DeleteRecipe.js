import React from "react";
import axios from 'axios';

const DeleteRecipe = (props) => {

    const handleDelete = (event) => {
        axios.delete(`/api/przepisy/usun/${props.id}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

            // event.preventDefault();
    }

    return (
        <>
            
                <button type="submit" className="btn btn-danger" onClick={handleDelete}>Usuń (DELETE)</button>
                {/* <input type='submit' value='Usuń (DELETE)' onClick={handleDelete} /> */}
            
        </>
    );

}

export default DeleteRecipe;