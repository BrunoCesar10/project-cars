const db = require("../models");
const Brand = db.brands;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Conteúdo não pode estar vazio" });
        return;
    }

    const brand = new Brand({
        name: req.body.name
    });

    brand.save(brand).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu um erro ao inserir a marca"
        });
    });
};

exports.findAll = (req, res) => {
    const name = req.query.brand;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Brand.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Ocorreu um erro ao buscar as marcas"
        });
    });   
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Brand.findById(id).then(data => {
        if (!data)
            res.status(404).send({ message: "Não foi encontrado a marca com este id" });
    }).catch(err => {
        res.status(500).send({ message: "Houve um erro ao busBrand a marca com este id" });
    })
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Dados não podem estar vazios"
        });
      }
    
      const id = req.params.id;
    
      Brand.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: "Não foi possível atualizar os dados desta marca"
            });
          } else res.send({ message: "Dados da marca atualizados com sucesso" });
        })
        .catch(err => {
          res.status(500).send({
            message: "Houve um erro ao tentar atualizar os dados desta marca"
          });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

  Brand.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: "Houve um erro ao tentar excluir os dados desta marca"
        });
      } else {
        res.send({
          message: "Dados da marca excluídos com sucesso"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possível excluir os dados desta marca"
      });
    });
};

exports.deleteAll = (req, res) => {
    Brand.deleteMany({})
    .then(data => {
      res.send({
        message: "Dados das marcas excluídos com sucesso"
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao excluir os dados"
      });
    });
};