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
    case "piece":
      formattedUnit = "piece";
      break;
    default:
      break;
  }
  return formattedUnit;
};

const allUnits: Record<Unit, Unit> = {
  can: "can",
  gram: "gram",
  handful: "handful",
  kiloGram: "kiloGram",
  liter: "liter",
  milliLiter: "milliLiter",
  piece: "piece",
  tableSpoon: "tableSpoon",
  teaSpoon: "teaSpoon",
}

export const getAllUnits = () => Object.values(allUnits);

export const isValidUnit = (value: string): value is Unit => {
  return Object.keys(allUnits).includes(value)
}