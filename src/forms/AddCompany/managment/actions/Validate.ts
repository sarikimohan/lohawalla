import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import AddCompany from "../../AddCompany";

export default class ValidateAddCompany extends ServerStateUtils<AddCompany.State>{
  
  //* ///////////////////////// FIRST FORM /////////////////////////////
  validateCompanyName() {}
  validateDescription() {}

  //* ///////////////////////// SECOND FORM /////////////////////////////
  validatePriceField() {}
  validateAddPriceField() {}
  
  
  //* ///////////////////////// THIRD FORM /////////////////////////////
  validateDescriptionLabels() {}
}