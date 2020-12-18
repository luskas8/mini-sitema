import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

export default function Singin() {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function formSubmit(e: FormEvent) {
        e.preventDefault();

        const data = {
            username,
            password,
        }

        try {
            await api.post('user', data);

            alert("Cadastro realizada, que tal logar-se agora!");
            history.push('/');
        } catch(err) {
            alert('Erro no cadatro, tente novamente.');
        }
    }
    return (
        <div id="page-singin">
            <h1>Cadastro</h1>
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
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    )
}