// #region Imports

import type {Ingredient} from "./Ingredient.ts";
import type {PickedIngredient, IngredientRotator} from "./IngredientRotator.ts";

// #endregion
// #region `GrainRotatorSharedState`

/**
An instance of this class is shared by multiple `GrainRotator` instances.
Contains grain rotation configuration and history.
*/
export class GrainRotatorSharedState {
   private readonly _ingredientNumberOfSlotsBetweenPicksMinLimits = new Map<Ingredient, number>();
   private readonly _ingredientLastPickSlotsNumbers = new Map<Ingredient, number>();

   public setIngredientNumberOfSlotsBetweenPicksMinLimit(ingredient_: Ingredient, ingredientNumberOfSlotsBetweenPicksMinLimit_: number) {
      this._ingredientNumberOfSlotsBetweenPicksMinLimits.set(ingredient_, ingredientNumberOfSlotsBetweenPicksMinLimit_);
   }

   public getIngredientNumberOfSlotsBetweenPicksMinLimit(ingredient_: Ingredient) {
      const ingredientNumberOfSlotsBetweenPicksMinLimit_ = this._ingredientNumberOfSlotsBetweenPicksMinLimits.get(ingredient_);
      // @ts-expect-error 'ingredientNumberOfSlotsBetweenPicksMinLimit_' is possibly 'undefined'.
      if( ! (ingredientNumberOfSlotsBetweenPicksMinLimit_ >= 0) ) {
         throw new Error(`GrainRotatorSharedState: No Number-Of-Slots-Between-Picks-Min-Limit registered for ${ingredient_}.`);
      }
      return ingredientNumberOfSlotsBetweenPicksMinLimit_!;
   }

   public recordIngredientPick(ingredient_: Ingredient, slotCounter_: number) {
      this._ingredientLastPickSlotsNumbers.set(ingredient_, slotCounter_);
   }

   public safeGetIngredientLastPickSlotNumber(ingredient_: Ingredient) {
      return this._ingredientLastPickSlotsNumbers.get(ingredient_) ?? -1000;
   }
}

// #endregion
// #region `GrainState`

interface GrainState extends PickedIngredient {
   /** Priority is unused in logic but kept for reference. */
   readonly priority: number;

   readonly invertedPriority: number;
   picksInvertedPrioritySum: number;
}

// #endregion
// #region `GrainRotator`

export class GrainRotator implements IngredientRotator {
   // #region Data

   private readonly _sharedState: GrainRotatorSharedState;
   private readonly _state: GrainState[] = [];

   // #endregion
   // #region `constructor`

   constructor(sharedState_: GrainRotatorSharedState) {
      this._sharedState = sharedState_;
   }

   // #endregion
   // #region `addGrain`

   /**
   Adds a grain to rotate.
   [Comment-202602011]
   When picking another grain, in case of a tie, a grain at a lesser position will be picked,
   therefore grains should be added in the priority order from the higher to the lower.
   [/Comment-202602011]
   */
   public addGrain(ingredient_: Ingredient, ingredientWeightInGrams_: number, priority_: number) {
      // The rounding is needed to avoid indeterminate behavior caused by rounding errors.
      const invertedPriority_ = Math.round(1.0e+9 / priority_);

      this._state.push(
         {
            ingredient: ingredient_,
            ingredientWeightInGrams: ingredientWeightInGrams_,
            priority: priority_,
            invertedPriority: invertedPriority_,
            picksInvertedPrioritySum: 0
         }
      );
   }

   // #endregion
   // #region `execute`

   public execute(slotCounter_: number) {
      let pickedGrainState_: GrainState | null = null;
      for(const grainState_ of this._state) {
         const grainNumberOfSlotsBetweenPicksMinLimit_ = this._sharedState.getIngredientNumberOfSlotsBetweenPicksMinLimit(grainState_.ingredient);
         const grainLastPickSlotNumber_ = this._sharedState.safeGetIngredientLastPickSlotNumber(grainState_.ingredient);
         if( slotCounter_ - grainLastPickSlotNumber_ > grainNumberOfSlotsBetweenPicksMinLimit_ &&

             // Comment-202602011 relates and/or applies.
             (pickedGrainState_ == null || grainState_.picksInvertedPrioritySum < pickedGrainState_.picksInvertedPrioritySum)
         ) {
            pickedGrainState_ = grainState_;
         }
      }
      if(pickedGrainState_ == null) {
         throw new Error(`GrainRotator: No eligible grains at slot ${slotCounter_}.`);
      }
      pickedGrainState_.picksInvertedPrioritySum += pickedGrainState_.invertedPriority;
      this._sharedState.recordIngredientPick(pickedGrainState_.ingredient, slotCounter_);
      return pickedGrainState_ as PickedIngredient;
   }

   // #endregion
   // #region // `debugLogStats`

   // /** Testing. */
   // public debugLogStats() {
   //    let totalNumberOfPicks_ = 0;
   //    for(const grainState_ of this._state) {
   //       const numberOfPicks_ = grainState_.picksInvertedPrioritySum / grainState_.invertedPriority;
   //       totalNumberOfPicks_ += numberOfPicks_;
   //    }
   //    // totalNumberOfPicks_ = Math.round(totalNumberOfPicks_);
   //    for(const grainState_ of this._state) {
   //       const numberOfPicks_ = grainState_.picksInvertedPrioritySum / grainState_.invertedPriority;
   //       console.info(`${grainState_.ingredient} ${numberOfPicks_} ${numberOfPicks_ * 100 / totalNumberOfPicks_}`);
   //    }
   //    console.info();
   // }

   // #endregion
}

// #endregion
