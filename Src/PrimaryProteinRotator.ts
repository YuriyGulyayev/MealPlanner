import type {IngredientRotator} from "./IngredientRotator.ts";

/**
Handles the logic:
- Every 6th day: Pick Liver.
- Other days: Alternate between Seafood and Meat.
*/
export class PrimaryProteinRotator implements IngredientRotator {
   private readonly _liverRotator: IngredientRotator;
   private readonly _seaFoodRotator: IngredientRotator;
   private readonly _meatRotator: IngredientRotator;

   /** Seafood vs. Meat alternation flag. */
   private _nextIngredientIsSeaFood = true;

   constructor(
      liverRotator_: IngredientRotator,
      seaFoodRotator_: IngredientRotator,
      meatRotator_: IngredientRotator
   ) {
      this._liverRotator = liverRotator_;
      this._seaFoodRotator = seaFoodRotator_;
      this._meatRotator = meatRotator_;
   }

   public execute(dayCounter_: number) {
      if(dayCounter_ % 6 == 0) {
         return this._liverRotator.execute();
      }
      if(this._nextIngredientIsSeaFood) {
         this._nextIngredientIsSeaFood = false;
         return this._seaFoodRotator.execute();
      }
      this._nextIngredientIsSeaFood = true;
      return this._meatRotator.execute();
   }
}
