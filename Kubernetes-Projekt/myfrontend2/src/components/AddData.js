import React, {useState} from "react";
import axios from 'axios';

const AddData = (props) => {

    const [nazwa, setNazwa] = useState("");

    
    
    const handleSubmit = (event) => {
        console.log(`Dane do wysłania ${nazwa}`);

        axios.post('api2/app/dodaj', {
            nazwa: nazwa
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        
        // event.preventDefault();
        
    };



    return (
        <>
            <h5 className="card-title">Dodaj dane (POST)</h5>
            <form>
                <div className="mb-3">
                    <label className="form-label">Nazwa:</label>
                    <input type="text" className="form-control" placeholder='Nazwa' value={nazwa} onChange={event => setNazwa(event.target.value)}/>
                </div>
                
                <input type='submit' className="btn btn-sm btn-brown" value='Dodaj dane' onClick={handleSubmit} />
            </form>
         
        </>
    );
};

export default AddData;