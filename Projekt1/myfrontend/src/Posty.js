import React, {useState, useEffect} from "react";
import axios from 'axios'

const Post = (props) => {

    const [posts, setPosts] = useState([]);
    const [number, setNumber] = useState(-1);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.log(error));
    }, []);

    const handlePostClick = (event) => {
        console.log(event.target)
    }

    const handleNumberChange = (event) => {
        setNumber(event.target.value);
        props.changeParentHandler(event.target.value);
    };

    function Wiersz(props) {
        console.log(`ID: ${props.post.id}\n`+
                    `Tytuł: ${props.post.title}\n`+
                    `Opis: ${props.post.body}`);
        return (
            <div onClick={props.onClick}>
                <h3>{props.post.id}. {props.post.title}</h3>
                {props.post.body}
            </div>
        );
    }

    return (
        <>
            <h2>Metoda GET</h2>
            <div>
                {posts.map(post => (<Wiersz post={post} key={post.id} onClick={handlePostClick}></Wiersz>)).slice(0, props.noPosts)}
            </div>
            <div>
                <div>Ilość wyświetlonych wierszy: {number}</div>
                Liczba wierszy do wyświetlenia: <input onChange={handleNumberChange} />
            </div>
        </>
    );

}

export default Post;