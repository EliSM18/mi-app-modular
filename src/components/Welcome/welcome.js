import React from "react";

const Welcome = ({ nombre }) => {
    if ( nombre === "Desarrollador" ) {
        return (
            <div>
                <h2>Bienvenido, {nombre}!</h2>
                <p>Eres un crack.</p>
            </div>
        );
    }
    return (
        <div>
            <h2>Bienvenido, {nombre}!</h2>
            <p>Este es un ejemplo de un componente modularizado.</p>
        </div>
    );
};

export default Welcome;
