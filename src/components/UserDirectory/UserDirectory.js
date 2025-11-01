import React, { useState, useEffect} from "react";
import './UserDirectory.css';

const UserDirectory = () => {
    //Estado para almacenar la lista de usuarios
    const [users, setUsers] = useState([]);
    //Estado para saber si está cargando o si hubo un error
    const [loading, setLoading] = useState(true);
    //Estado para guardar posibles errores
    const [error, setError] = useState(null);

    //uso de useEffect para realizar efectos secundarios (fetch de datos)
    useEffect(() => {
        //Usamos la API 'fetch' del navegador para hacer la petición
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red');
            }
            return response.json();
        })
        .then(data => {
            setUsers(data); //Guardamos los datos en el estado
            setError(null); //Reseteamos cualquier error previo
        })
        .catch(error => {
            setError(error.message); //Guardamos el mensaje de error
            setUsers([]); //Reseteamos la lista de usuarios
        })
        .finally(() => {
            setLoading(false); //Indicamos que ya no estamos cargando
        });
    }, []); //El array vacío indica que esto se ejecuta solo una vez al montar el componente

    //UI basada en los estados loading, error y users

    return(
        <div className="user-directory">
            <h2>Directorio de Usuarios</h2>
            {/*Contenido dinámico*/}
            {/*Si está cargando muestra mensaje*/}
            {loading && <p>Cargando usuarios...</p>}
            {/*Si hay error, muestra el error*/}
            {error && <p className="error-message">Error: {error}</p>}
            {/*Si no hay error y no está cargando, muestra la lista de usuarios*/}
            {!loading && !error && (
                <ul className="user-list">
                    {users.map(user => (
                        <li key={user.id} className="user-card">
                            <h3>{user.name}</h3>
                            <p>📧 {user.email}</p>
                            <p>🌐 {user.website}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserDirectory;