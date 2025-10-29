const express = require("express");
const router = express.Router();
const Jogo = require("../models/Jogo"); // Importando o modelo

// Rota 1: GET /jogos - Listar todos os jogos [cite: 236]
router.get("/", async (req, res) => {
  try {
    const jogos = await Jogo.find();
    res.json(jogos);
  } catch (erro) {
    console.error('Erro em GET /jogos:', erro);
    console.error(erro && erro.stack ? erro.stack : erro);
    // Não enviar detalhes de erro ao cliente em produção; apenas mensagem genérica
    res.status(500).json({ erro: "Erro ao buscar jogos" });
  }
});

// Rota 2: POST /jogos - Criar um novo jogo [cite: 238]
router.post("/", async (req, res) => {
  try {
    const jogo = new Jogo(req.body);
    const novoJogo = await jogo.save();
    res.status(201).json(novoJogo); // 201 = Created
  } catch (erro) {
    console.error('Erro em POST /jogos:', erro);
    console.error(erro && erro.stack ? erro.stack : erro);
    res.status(400).json({ erro: "Erro ao criar jogo. Verifique os dados enviados." });
  }
});

// Rota 3: PUT /jogos/:id - Atualizar um jogo por ID [cite: 240]
router.put("/:id", async (req, res) => {
  try {
    const jogoAtualizado = await Jogo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Retorna o documento atualizado
    );
    if (!jogoAtualizado) {
      return res.status(404).json({ erro: "Jogo não encontrado" });
    }
    res.json(jogoAtualizado);
  } catch (erro) {
    console.error('Erro em PUT /jogos/:id:', erro);
    console.error(erro && erro.stack ? erro.stack : erro);
    res.status(400).json({ erro: "Erro ao atualizar jogo." });
  }
});

// Rota 4: DELETE /jogos/:id - Deletar um jogo por ID 
router.delete("/:id", async (req, res) => {
  try {
    const jogoRemovido = await Jogo.findByIdAndDelete(req.params.id);
    if (!jogoRemovido) {
      return res.status(404).json({ erro: "Jogo não encontrado" });
    }
    res.json({ mensagem: "Jogo removido com sucesso!" });
  } catch (erro) {
    console.error('Erro em DELETE /jogos/:id:', erro);
    console.error(erro && erro.stack ? erro.stack : erro);
    res.status(500).json({ erro: "Erro ao remover jogo." });
  }
});

module.exports = router;