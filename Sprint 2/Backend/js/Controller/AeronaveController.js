"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AeronaveModel_1 = __importDefault(require("../Models/AeronaveModel"));
const AeronaveController = (0, express_1.Router)();
AeronaveController.post("/CadastrarAeronave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var dados = req.body;
    console.log(dados);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.json({
            ok: false,
            mensagem: "Por favor, preencha os dados para realizar o cadastro."
        });
    }
    else {
        try {
            yield AeronaveModel_1.default.create({
                modelo_de_aeronave: dados.modelo_de_aeronave,
                motor: dados.motor,
                certificacao: dados.certificacao,
                peso: parseInt(dados.peso),
                reversor: parseInt(dados.reversor)
                // overspeed: dados.overspeed,
                // flap_de_pouso: dados.flap_de_pouso
            });
            res.json({
                ok: true,
                mensagem: "Aeronave cadastrada com sucesso."
            });
        }
        catch (error) {
            if (error == "SequelizeUniqueConstraintError: Validation error") {
                res.json({
                    ok: false,
                    mensagem: "Aeronave já cadastrada."
                });
            }
            else {
                res.json({
                    ok: false,
                    mensagem: error
                });
            }
        }
    }
}));
AeronaveController.patch("/AtualizarAeronave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var dados = req.body;
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.json({
            ok: false,
            mensagem: "Por favor, preencha os dados para atualizar o cadastro."
        });
    }
    else {
        var modelo_de_aeronave = dados.modelo_de_aeronave;
        AeronaveModel_1.default.findByPk(modelo_de_aeronave === null || modelo_de_aeronave === void 0 ? void 0 : modelo_de_aeronave.toString()).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (data != null) {
                yield AeronaveModel_1.default.update({
                    motor: dados.motor,
                    certificacao: dados.certificacao,
                    peso: dados.peso,
                    reversor: dados.reversor
                    // overspeed: dados.overspeed,
                    // flap_de_pouso: dados.flap_de_pouso
                }, { where: {
                        modelo_de_aeronave: dados.modelo_de_aeronave
                    } });
                res.json({
                    ok: true,
                    mensagem: "Aeronave atualizada com sucesso"
                });
            }
            else {
                res.json({
                    ok: false,
                    mensagem: "Aeronave não encontrada"
                });
            }
        }));
    }
}));
AeronaveController.get("/BuscarAeronave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var modelo_de_aeronave = req.query.modelo_de_aeronave;
    AeronaveModel_1.default.findByPk(modelo_de_aeronave === null || modelo_de_aeronave === void 0 ? void 0 : modelo_de_aeronave.toString()).then((data) => {
        res.json(data);
    });
}));
AeronaveController.get("/ListarAeronave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield AeronaveModel_1.default.findAll().then((data) => {
        res.json(data);
    });
}));
AeronaveController.delete("/DeletarAeronave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var modelo_de_aeronave = req.query.modelo_de_aeronave;
    yield AeronaveModel_1.default.destroy({ where: { modelo_de_aeronave: modelo_de_aeronave } }).then((data) => {
    });
}));
exports.default = AeronaveController;
