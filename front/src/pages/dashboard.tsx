import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

export default function Dashboard() {
    const [username, setUsername] = useState('');
    const [newName, setNewName] = useState('');

    const history = useHistory();
    const myId = localStorage.getItem("id");

    if (!myId) {
        alert("Você não deveria está aqui, tente se cadastrar primeiro!");
        history.push("/");
    }
    
    useEffect(() => {
        api.get(`user/${myId}`).then((response) => {
            setUsername(response.data.name);
        });
    }, [myId]);

    function logOut() {
        localStorage.clear();
        alert(localStorage.getItem('id'));
        history.push('/');
    }

    async function formSubmit(e: FormEvent) {
        e.preventDefault();

        const data = {
            id: myId,
            username: newName,
        }

        await api.put('user', data);

        alert("Usuário alteraro!");
        window.location.reload();
    }

    return (
        <div id="page-dashboard">
            <header>
                <h1>Bem-vindo, {username}</h1>

                <div className="input-block">
                    <input onClick={logOut} type="button" value="Sair"/>
                </div>
            </header>
            <main>
                <div className="input-block">
                    <label htmlFor="delete-btn">Deletar este usuário: </label>
                    <input type="button" id="delete-btn" value="Delete"/>
                </div>

                <form onSubmit={formSubmit}>
                    <div className="input-block">
                        <label htmlFor="alterar">Novo nome: </label>
                        <input
                            required
                            type="text"
                            id="alterar"
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                        />
                    </div>

                    <div className="input-block">
                        <button type="submit">Alterar</button>
                    </div>
                </form>
            </main>
        </div>
    )
}