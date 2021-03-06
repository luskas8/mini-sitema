import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import userView from '../views/userView';

interface User {
    id: number;
    name: string;
    password: string;
}

interface UserData {
    users: Array<User>
}

// Leitura de arquivo de dados dos usuários
var usersData: UserData;
fs.readFile(path.join(__dirname, '..', 'data', 'usersData.json'), 'utf8', (error, content) => {
    if (error) {
        throw error;
    }
    usersData = JSON.parse(content);
});

const userController = {
    // Lista determinado usuário
    async index(request: Request, response: Response) {
        const { id } = request.params;

        // Procura por usuário de mesmo id informado
        const user = await usersData.users.find(user => user.id == Number(id));
        
        if (!user) {
            return response.status(404).json({"ERRO": "Usuário não encontrado, tente novamente."});
        }
        return response.json(userView(user));
    },

    // Cria usuário
    async create(request: Request, response: Response) {
        const { username, password } = request.body;

        // Pega a posição do ultimo usuário
        let lastUser = Object.keys(usersData.users).length;

        let currentId = usersData.users[lastUser-1].id + 1;

        const newUser: User = {
            id: Number(currentId),
            name: username,
            password
        }

        usersData.users.push(newUser);

        // Transforma em objeto JSON
        const jsonData = JSON.stringify(usersData);

        // Escreve no arquivo usersData.json
        await fs.writeFile(path.join(__dirname, '..', 'data', 'usersData.json'), jsonData, (err) => {
            if (err) {
                return response.status(404).json({"ERROR": "Usuário não cadastrado, tente novamente."});
            }
            return response.status(201).json({"Sucesso": "Usuário criado."});
        });
    },

    // Deleta usuário
    async delete(request: Request, response: Response) {
        const { id } = request.params;

        // Pega o index do usuário de id informado
        const userIdx = await usersData.users.findIndex(user => user.id == Number(id));

        usersData.users.splice(userIdx, 1);

        const jsonData = JSON.stringify(usersData);

        await fs.writeFile(path.join(__dirname, '..', 'data', 'usersData.json'), jsonData, (err) => {
            if (err) {
                return response.status(404).json({"ERROR": "Usuário não deletado, tente novamente."});
            }
            return response.json({"Sucesso": "Usuário deletado."});
        });
    },

    // Cria sessão de usuário
    async create_session(request: Request, response: Response) {
        const { username, password } = request.body;

        // Procura pelo usuário de mesmo nome e senha informados
        const user = await usersData.users.find(user => user.name == username && user.password == password);

        if (!user) {
            return response.status(404).json({"ERRO": "Usuário ou senha inválidos."});
        }

        return response.status(201).json({"id": user.id});
    },

    // Altera usuário
    async alter(request: Request, response: Response) {
        const { username, id } = request.body;

        // Pega o index do usuário de id informado
        const userIdx = await usersData.users.findIndex(user => user.id == Number(id));

        usersData.users[userIdx].name = username;

        // Transforma em objeto JSON
        const jsonData = JSON.stringify(usersData);

        // Escreve no arquivo usersData.json
        await fs.writeFile(path.join(__dirname, '..', 'data', 'usersData.json'), jsonData, (err) => {
            if (err) {
                return response.status(404).json({"ERROR": "Usuário não alterado, tente novamente."});
            }
            return response.json({"Sucesso": "Usuário alterado."});
        });

    }
}

export default userController;