import React, {useState, useEffect} from "react";
import axios from 'axios';

const EditRecipe = (props) => {

    const [nazwa, setNazwa] = useState("");
    const [skladniki, setSkladniki] = useState("");
    const [opis, setOpis] = useState("");
    
    useEffect(() => {
        axios.get(`api/przepisy/${props.id}`)
            .then(response => {
                setNazwa(response.data.nazwa);
                setSkladniki(response.data.skladniki);
                setOpis(response.data.opis);
            })
            .catch(error => console.log(error));
    }, [props.id]);

    const handleSubmit = (event) => {
        console.log(`Dane do aktualizacji ${props.id} ${nazwa} ${skladniki} ${opis}`);

        axios.put(`api/przepisy/edytuj/${props.id}`, {
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
    }


    return (
        <>
        <h5 className="card-title">Edytuj przepis kulinarny (PUT)</h5>
        <h6 className="card-subtitle mb-2">ID: {props.id}</h6>
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
                
                <input type='submit' className="btn btn-sm btn-brown" value='Aktualizuj przepis' onClick={handleSubmit} />
                
            </form>
        </>
    );
}

export default EditRecipe;