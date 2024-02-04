const sequelize = require("../database");
const { Model, DataTypes } = require("sequelize");
const SequelizePaginate = require("sequelize-paginate");
class Document extends Model {}

Document.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(48),
    },
    documentType: {
      type: DataTypes.ENUM("PDF", "TXT", "XDOC"),
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "document",
    timestamps: false,
  }
);
// le support de pagination
SequelizePaginate.paginate(Document);
module.exports = Document;
