"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conexao_1 = __importDefault(require("../Connection/conexao"));
const sequelize = new conexao_1.default();
const conexao = sequelize.conectar();
const Conf_fullVM = conexao.define("confs", {
    id: {
        type: sequelize.Sequelize.INT,
        primaryKey: true
    },
    brk_conf: {
        type: sequelize.Sequelize.INT,
        foreignKey: true
    },
    ref: {
        type: sequelize.Sequelize.INT,
    },
    weight_below: {
        type: sequelize.Sequelize.SMALLINT,
    },
    weight_above: {
        type: sequelize.Sequelize.SMALLINT,
    },
    spd: {
        type: sequelize.Sequelize.SMALLINT,
    },
    alt: {
        type: sequelize.Sequelize.SMALLINT,
    },
    wind: {
        type: sequelize.Sequelize.SMALLINT,
    },
    temp: {
        type: sequelize.Sequelize.SMALLINT,
    },
    slope: {
        type: sequelize.Sequelize.SMALLINT,
    },
    rev: {
        type: sequelize.Sequelize.SMALLINT,
    },
});
class Conf_fullService {
    /*listar(): Conf[] {
        this.listaConfs = []
        var lista = Conf_fullVM.findAll().then((data: any)=>{
            data.forEach((element: { id: number; brk_conf: number ; ref: number; weight_below: number; weight_above: number, spd: number, alt:number, wind: number, temp: number, slope:number, rev: number  }) => {
                var conf = new Conf(element.id, element.brk_conf, element.ref, element.weight_below,element.weight_above, element.spd, element.alt,element.wind, element.temp, element.slope, element.rev );
                console.log(conf.Id + " " + conf.Brk_conf + " " + conf.Ref+ " " + conf.weight_below + " " + conf.weight_above + " " + conf.spd + " " + conf.alt+""+ conf.wind+""+conf.temp+""+conf.temp+""+conf.slope+""+conf.rev)
                this.listaConfs.push(conf);
          })

        });
        return this.listaConfs;
    }  */
    async buscarPorId(id) {
        return await Conf_fullVM.findByPk(id, { raw: true });
    }
}
exports.default = Conf_fullService;
