export const enum IngredientFlags {
   None = 0,

   /** This covers Meat, Liver, Seafood, and Eggs. */
   IsAnimalProtein = 1 << 0,

   IsMeat = 1 << 1,
   IsLiver = 1 << 2,
   IsSeaFood = 1 << 3,
   IsFattyFish = 1 << 4,
   IsFat = 1 << 5,
   IsGrain = 1 << 6,
   IsBean = 1 << 7,
   IsDairy = 1 << 8,
   IsVegetable = 1 << 9,
   IsFruitPulp = 1 << 10,
   IsFungi = 1 << 11,
   IsSpice = 1 << 12,
   IsLiquid = 1 << 13,
}

export class Ingredient {
   public readonly name: string;
   public readonly flags: IngredientFlags;

   /** Magnesium content in micro-grams per gram of ingredient. */
   public readonly magnesiumContentInPartsPerMillion: number;

   constructor(name_: string, flags_: IngredientFlags, magnesiumContentInPartsPerMillion_: number) {
      this.name = name_;
      this.flags = flags_;
      this.magnesiumContentInPartsPerMillion = magnesiumContentInPartsPerMillion_;
   }

   public toString() {
      return this.name;
   }

   public hasAnyFlags(flags_: IngredientFlags) {
      return (this.flags & flags_) != IngredientFlags.None;
   }

   public hasAllFlags(flags_: IngredientFlags) {
      return (this.flags & flags_) == flags_;
   }
}
