import type {Ingredient} from "./Ingredient.ts";
import type {PickedIngredient, IngredientRotator} from "./IngredientRotator.ts";
import type {GrainRotator} from "./GrainRotator.ts";

/**
This class is responsible for a part of Medium Meal ingredient rotation logic.
Manages the cycle: Farmer's Cheese -> Grain Porridge with Milk -> Farmer's Cheese (2nd time).
Returns either Farmer's Cheese or a Grain for the Porridge.
*/
export class MediumMealIngredientRotator implements IngredientRotator {
   private readonly _farmersCheeseToPick: PickedIngredient;
   private readonly _grainRotator: GrainRotator;
   private _executionCounter = 0;

   constructor(farmersCheeseIngredient_: Ingredient, farmersCheeseWeightInGrams_: number, grainRotator_: GrainRotator) {
      this._farmersCheeseToPick =
         {
            ingredient: farmersCheeseIngredient_,
            ingredientWeightInGrams: farmersCheeseWeightInGrams_,
         };
      this._grainRotator = grainRotator_;
   }

   public execute(slotCounter_: number) {
      ++ this._executionCounter;
      const ingredientTypeCode_ = this._executionCounter % 3;
      if(ingredientTypeCode_ != 2) {
         return this._farmersCheeseToPick;
      }
      return this._grainRotator.execute(slotCounter_);
   }

   // /** Testing. */
   // public debugLogStats() {
   //    this._grainRotator.debugLogStats();
   // }
}
