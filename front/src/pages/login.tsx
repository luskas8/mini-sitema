import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function formSubmit(e: FormEvent) {
        e.preventDefault();

        const data = {
            username,
            password,
        };

        try {
            const response = await api.post('user/session', data);

            localStorage.setItem("id", response.data.id);

            alert("Bem-vindo!");
            history.push('/dashboard');
        } catch(err) {
            alert('Erro no login, tente novamente.');
        }


    }

    return (
        <div id="page-login">
            <form onSubmit={formSubmit}>
                <div className="input-block">
                    <label htmlFor="username">Usuário</label>
                    <input
                        required 
                        type="text"
                        id="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="password">Senha</label>
                    <input
                        required
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <button type="submit">Logar</button>
                </div>
            </form>
        </div>
    )
}