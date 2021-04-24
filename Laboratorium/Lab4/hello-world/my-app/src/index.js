import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// ReactDOM.render(
//     <h1>Witaj, świecie!</h1>,
//     document.getElementById('root')
// );



// const name = 'Janusz';
// const element = <h1>Witaj, {name}</h1>;

// ReactDOM.render(
//     element,
//     document.getElementById('root')
// );



// function formatName(user) {
//     return user.firstName + ' ' + user.lastName;
// }

// function getGreeting(user) {
//     if (user) {
//         return <h1>Witaj, {formatName(user)}!!!</h1>;
//     }
//     return <h1>Witaj, nieznajomy.</h1>;
// }

// const user = {
//     firstName: 'Janusz',
//     lastName: 'Sch',
// };

// const element = (
//     <h1>
//         Witaj, {formatName(user)}!
//     </h1>
// );

// ReactDOM.render(
//     // element,
//     getGreeting(user),
//     document.getElementById('root')
// );



// function tick() {
//     const element = (
//         <div>
//             <h1>Witaj świecie!</h1>
//             <h2>Aktualny czas: {new Date().toLocaleTimeString()}.</h2>
//         </div>
//     )
//     ReactDOM.render(element, document.getElementById('root'));
// }

// setInterval(tick, 1000);



function WelcomeFunction(props) {
    return <h1>Cześć, {props.name}</h1>;
}

const element = <WelcomeFunction name="Janusz" />

function ManyWelcomeFunction() {
    return (
        <div>
            <WelcomeFunction name="Janusz" />
            <WelcomeFunction name="Marek" />
        </div>
    )
}

ReactDOM.render(
    <ManyWelcomeFunction />,
    document.getElementById('root')
);

// class WelcomeClass extends React.Component {
//     render() {
//         return <h1>Cześć, {this.props.name}</h1>;
//     }
// }
