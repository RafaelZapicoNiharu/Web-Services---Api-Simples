const express = require("express");
const app = express();
app.use(express.json());
let Dados = { //objeto com meus produtos
    produtos: [
        {
            id: 45,
            nome: "Engrenagem de fada",
            preco: 345,
            quantidade: 2,
            categoria: "Peças",
            fabricante: {
                nomef: "Magearna LTDA",
                endereco: "Rua dos Metais, 234"
            }
        },
        {
            id: 12,
            nome: "Água com gás",
            preco: 20,
            quantidade: 10,
            categoria: "Bebidas",
            fabricante: {
                nomef: "Totodile Águas com gás",
                endereco: "Rua do Jacare, 55"
            }

        },
        {
            id: 36,
            nome: "Pipoca",
            preco: 5,
            quantidade: 1,
            categoria: "Comidas",
            fabricante: {
                nomef: "João Pipoqueiro",
                endereco: "Avenida dos Andradas, na frente do vianna"
            }
        },
    ]
}
app.get("/produtos", (req, res) => {     //get all meus produtinhos
    res.statusCode = 200; //200 é ok deu certo 
    res.json(Dados.produtos)
});
app.get('/produto/:id', (req, res) => { //get pelo id
    console.log(typeof req.params.id);
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    }
    else {
        let id = parseInt(req.params.id);
        let produto = Dados.produtos.find(elem => elem.id == id);
        if (produto != undefined) {
            res.statusCode = 200;
            res.json(produto);
        }
        else {
            res.sendStatus(404);
        }
    }
});
app.post('/produto', (req, res) => { //inserindo um novo produto 
    let { id, nome, preco, quantidade, categoria, fabricante } = req.body;
    Dados.produtos.push({
        id: id,
        nome: nome,
        preco: preco,
        quantidade: quantidade,
        categoria: categoria,
        fabricante: fabricante
    });
    res.sendStatus(200);
});
app.put('/produto/:id', (req, res) => { //atualizando um produto 
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        let id = parseInt(req.params.id);
        let produto = Dados.produtos.find(elem => elem.id == id);
        if (produto != undefined) {

            let { nome, preco, quantidade, categoria, fabricante } = req.body;

            if (nome != undefined) {
                produto.nome = nome;
            }
            if (preco != undefined) {
                produto.preco = preco;
            }
            if (quantidade != undefined) {
                produto.quantidade = quantidade;
            }
            if (categoria != undefined) {
                produto.categoria = categoria;
            }
            if (fabricante != undefined) {
                produto.fabricante = fabricante;
            }

            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
});

app.delete('/produto/:id', (req, res) => {  //deletando um produto 
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        let id = parseInt(req.params.id);
        let indexProduto = Dados.produtos.findIndex(elem => elem.id == id);

        if (indexProduto == -1) {
            res.sendStatus(404);
        }
        Dados.produtos.splice(indexProduto, 1);
        res.sendStatus(200);
    }
});


app.listen(45677, () => {
    console.log("Api rodando!");
});

