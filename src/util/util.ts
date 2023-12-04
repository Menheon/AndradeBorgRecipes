import { Unit } from "../types/models";

export const mapUnitToStringFormat = (unit: Unit) => {
  let formattedUnit = unit.toString();
  switch (unit) {
    case "gram":
      formattedUnit = "g";
      break;
    case "kiloGram":
      formattedUnit = "Kg";
      break;
    case "liter":
      formattedUnit = "L";
      break;
    case "milliLiter":
      formattedUnit = "mL";
      break;
    case "tableSpoon":
      formattedUnit = "tbsp";
      break;
    case "teaSpoon":
      formattedUnit = "tsp";
      break;
    case "none":
      formattedUnit = "";
      break;
    default:
      break;
  }
  return formattedUnit;
};
