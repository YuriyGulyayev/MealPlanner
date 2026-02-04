import type {Ingredient} from "./Ingredient.ts";

/**
Standard result for all rotators, carrying both the ingredient and its weight for the meal.
*/
export interface PickedIngredient {
   readonly ingredient: Ingredient;
   readonly ingredientWeightInGrams: number;
}

export interface IngredientRotator {
   execute(slotCounter_?: number): PickedIngredient;
}
