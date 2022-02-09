// Dara dos Santos Lima

const express = require("express"); 
const crypto = require("crypto");

const app = express();  
app.use(express.json());

const PORT = 3000;

const users = [
    {
        id: crypto.randomUUID(),
        name: "Dara",
        city: "Pelotas",
    },
];

app.get("/api/user", (request, response) => {
    response.send({users});
});

app.get('/api/user/:id', (request, response) => {
    // Escrever validação:
    // Verificar se o usuário existe, caso não retornar status 404 com mensagem de erro
    const id = request.params.id;
    const user = users.find((user) => user.id === id);
    if(user){
        response.send({ user });
    } else {
        response.status(404).send({ message: 'Usuário não encontrado!' });
    }
});

app.post('/api/user', (request, response) => {
    const {name, city} = request.body;
    const user = {
        id: crypto.randomUUID(),
        name,
        city,    
    }
    users.push(user);
    response.send({ message: 'Usuário Criado!', user });
});

// Fazer a lógica de Update, recebendo parâmetro de usuário e o body
// Buscando o usuário e atualizando o mesmo
app.put('/api/user/:id', (request, response) => {
    const id = request.params.id;
    const {name, city} = request.body;
    const index = users.findIndex((user) => user.id === id);

    if(index === -1){
        response.status(404).send({ message: 'Usuário não encontrado!' });
    }else{
        const user = {id, name, city};
        users[index] = user;
        response.status(200).send({ message: 'Usuário atualizado!', user: users[index] });
    }
})

// Fazer lógica do Delete, recebendo o parâmetro do usuário (ID) e o removendo da lista
// Se der certo retornar um objeto com mensagem sucesso
app.delete('/api/user/:id', (request, response) => {
    const id = request.params.id;
    const index = users.findIndex((user) => user.id === id);

    if(index === -1){
        response.status(404).send({ message: 'Usuário não encontrado!'});
    }else{
        users.splice(index, 1);
        response.send({ message: 'Usuário excluído com sucesso!', id});
    }
    
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
