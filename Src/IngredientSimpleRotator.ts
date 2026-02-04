import type {PickedIngredient, IngredientRotator} from "./IngredientRotator.ts";

export class IngredientSimpleRotator implements IngredientRotator {
   private readonly _items: readonly PickedIngredient[];
   private _nextItemIndex = 0;

   constructor(items_: readonly PickedIngredient[]) {
      if( ! (items_.length > 0) ) {
         throw new Error("IngredientSimpleRotator has no items.");
      }
      this._items = items_;
   }

   public execute() {
      const item_ = this._items[this._nextItemIndex]!;
      this._nextItemIndex = (this._nextItemIndex + 1) % this._items.length;
      return item_;
   }
}
