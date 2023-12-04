import { Unit } from '../types/models';

export const mapUnitToStringFormat = (unit: Unit) => {
  let formattedUnit = unit.toString();
  switch (unit) {
    case 'gram':
      formattedUnit = "g";
      break;
    case 'kiloGram':
      formattedUnit = "Kg";
      break;
    case 'liter':
      formattedUnit = "L";
      break;
    case 'milliLiter':
      formattedUnit = "mL";
      break;
    case 'tableSpoon':
      formattedUnit = "spsk";
      break;
    case 'teaSpoon':
      formattedUnit = "tsk";
      break;
    case 'can':
      formattedUnit = "dåse";
      break;
    default:
      break;
  }
  return formattedUnit;
}