import { Input } from "../components/Input";
import { PlaceHolderInput } from "../components/PlaceHolderInput";
import Block from "./Block";

export type  InputNameVal = {
    name : string;
    value : string;
  }

export class BlockUtility {

    public static getInputValArray(inputs : Block<any> | Block<any>[]): InputNameVal[] {
        const retInputValArr: InputNameVal[] = [];
    
        if (Array.isArray(inputs)) {
          inputs.forEach(inp => { 
            const input = (inp as PlaceHolderInput).children.input;
            retInputValArr.push({ name: (input as Input).name(), value: (input as Input).value() });
          })
        }
        else {
          const input = (inputs as PlaceHolderInput).children.input;
          retInputValArr.push({ name: (input as Input).name(), value: (input as Input).value() });
        }
        return retInputValArr;
      }

}