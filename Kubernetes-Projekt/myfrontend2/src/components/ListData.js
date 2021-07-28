import React, {useState, useEffect} from "react";
import axios from 'axios';

const ListData = (props) => {

    const [dane, setData] = useState([]);

    useEffect(() => {
        axios.get('api2/app/')
            .then(response => setData(response.data))
            .catch(error => console.log(error));
    }, []);

    const Wiersz = (props) => {
        return (
            <>
                <tr>
                    <td>{props.recipe.id}</td>
                    <td>{props.recipe.nazwa}</td>
                </tr>
            </>
        );
    }


    return (
        <>
        <h5>Dane (GET)</h5>
        <table className="table border-brown">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nazwa</th>
                </tr>
            </thead>
            <tbody>
                {dane.map(dana => (<Wiersz dana={dana} key={dana.id}></Wiersz>))}
            </tbody>
        </table>
        </>
    );

}

export default ListData;