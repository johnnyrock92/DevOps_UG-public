import React, {useState} from "react";
import axios from 'axios';

const AddRecipe = (props) => {

    const [nazwa, setNazwa] = useState("");
    const [skladniki, setSkladniki] = useState("");
    const [opis, setOpis] = useState("");

    
    
    const handleSubmit = (event) => {
        console.log(`Dane do wysłania ${nazwa} ${skladniki} ${opis}`);

        axios.post('http://localhost:8000/przepisy/dodaj', {
            nazwa: nazwa,
            skladniki: skladniki,
            opis: opis
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
            <h5 className="card-title">Dodaj przepis kulinarny (POST)</h5>
            <form>
                <div className="mb-3">
                    <label className="form-label">Nazwa:</label>
                    <input type="text" className="form-control" placeholder='Nazwa' value={nazwa} onChange={event => setNazwa(event.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Składniki</label>
                    <textarea type="text" className="form-control" placeholder='Skladniki' value={skladniki} onChange={event => setSkladniki(event.target.value)} rows="3"></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Opis</label>
                    <textarea className="form-control" placeholder='Opis' value={opis} onChange={event => setOpis(event.target.value)} rows="3"></textarea>
                </div>
                
                <input type='submit' className="btn btn-light" value='Dodaj przepis' onClick={handleSubmit} />
            </form>
         
        </>
    );
};

export default AddRecipe;