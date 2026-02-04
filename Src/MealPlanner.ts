// #region Imports

import {IngredientFlags, Ingredient} from "./Ingredient.ts";
import {IngredientSimpleRotator} from "./IngredientSimpleRotator.ts";
import {PrimaryProteinRotator} from "./PrimaryProteinRotator.ts";
import {GrainRotatorSharedState, GrainRotator} from "./GrainRotator.ts";
import {MediumMealIngredientRotator} from "./MediumMealIngredientRotator.ts";

// #endregion
// #region `MealPlanner`

export class MealPlanner {
   // #region Ingredients

   private readonly _beef = new Ingredient("Beef", IngredientFlags.IsAnimalProtein | IngredientFlags.IsMeat, 250);
   private readonly _beefLiver = new Ingredient("Beef Liver", IngredientFlags.IsAnimalProtein | IngredientFlags.IsLiver, 250);
   private readonly _chicken = new Ingredient("Chicken", IngredientFlags.IsAnimalProtein | IngredientFlags.IsMeat, 250);
   private readonly _chickenLiver = new Ingredient("Chicken Liver", IngredientFlags.IsAnimalProtein | IngredientFlags.IsLiver, 250);
   private readonly _turkey = new Ingredient("Turkey", IngredientFlags.IsAnimalProtein | IngredientFlags.IsMeat, 250);
   private readonly _pork = new Ingredient("Pork", IngredientFlags.IsAnimalProtein | IngredientFlags.IsMeat, 250);
   private readonly _porkFat = new Ingredient("Pork Fat", IngredientFlags.IsFat, 20);

   private readonly _mackerel = new Ingredient("Mackerel", IngredientFlags.IsAnimalProtein | IngredientFlags.IsSeaFood | IngredientFlags.IsFattyFish, 350);
   private readonly _herring = new Ingredient("Herring", IngredientFlags.IsAnimalProtein | IngredientFlags.IsSeaFood | IngredientFlags.IsFattyFish, 350);
   private readonly _sardine = new Ingredient("Sardine", IngredientFlags.IsAnimalProtein | IngredientFlags.IsSeaFood, 350);
   private readonly _oyster = new Ingredient("Oyster", IngredientFlags.IsAnimalProtein | IngredientFlags.IsSeaFood, 500);

   private readonly _egg = new Ingredient("Egg", IngredientFlags.IsAnimalProtein, 120);

   /**
   [Comment-202601307]
   Milk and Kefir Magnesium contents are the same.
   [/Comment-202601307]
   */
   private readonly _milk = new Ingredient("Milk", IngredientFlags.IsDairy | IngredientFlags.IsLiquid, 110);

   /** Comment-202601307 applies. */
   private readonly _kefir = new Ingredient("Kefir", IngredientFlags.IsDairy | IngredientFlags.IsLiquid, 110);

   private readonly _sourCream = new Ingredient("Sour Cream", IngredientFlags.IsFat | IngredientFlags.IsDairy, 100);
   private readonly _butter = new Ingredient("Butter", IngredientFlags.IsFat | IngredientFlags.IsDairy, 20);
   private readonly _farmersCheese = new Ingredient("Farmer's Cheese", IngredientFlags.IsDairy, 80);

   private readonly _buckwheat = new Ingredient("Buckwheat", IngredientFlags.IsGrain, 2310);
   private readonly _millet = new Ingredient("Millet", IngredientFlags.IsGrain, 1140);
   private readonly _barley = new Ingredient("Barley", IngredientFlags.IsGrain, 1330);
   private readonly _wheat = new Ingredient("Wheat", IngredientFlags.IsGrain, 1260);
   private readonly _oat = new Ingredient("Oat", IngredientFlags.IsGrain, 1770);
   private readonly _whiteRice = new Ingredient("White Rice", IngredientFlags.IsGrain, 120);

   /** Magnesium content is average for dry beans. */
   private readonly _bean = new Ingredient("Bean", IngredientFlags.IsBean, 1700);

   private readonly _sunflowerSeed = new Ingredient("Sunflower Seed", IngredientFlags.None, 3250);
   private readonly _pepita = new Ingredient("Pepita", IngredientFlags.None, 5920);

   private readonly _cabbageOrSauerkraut = new Ingredient("Cabbage or Sauerkraut", IngredientFlags.IsVegetable, 120);
   private readonly _redBellPepper = new Ingredient("Red Bell Pepper", IngredientFlags.IsVegetable, 120);
   private readonly _greenBellPepper = new Ingredient("Green Bell Pepper", IngredientFlags.IsVegetable, 100);
   private readonly _beetRoot = new Ingredient("Beet Root", IngredientFlags.IsVegetable, 230);
   private readonly _carrotRoot = new Ingredient("Carrot Root", IngredientFlags.IsVegetable, 120);
   private readonly _potato = new Ingredient("Potato", IngredientFlags.IsVegetable, 230);
   private readonly _sweetPotato = new Ingredient("Sweet Potato", IngredientFlags.IsVegetable, 250);

   private readonly _dill = new Ingredient("Dill", IngredientFlags.IsVegetable | IngredientFlags.IsSpice, 550);
   private readonly _parsley = new Ingredient("Parsley", IngredientFlags.IsVegetable | IngredientFlags.IsSpice, 500);
   private readonly _greenOnion = new Ingredient("Green Onion", IngredientFlags.IsVegetable | IngredientFlags.IsSpice, 200);

   private readonly _onion = new Ingredient("Onion", IngredientFlags.IsVegetable | IngredientFlags.IsSpice, 100);
   private readonly _garlic = new Ingredient("Garlic", IngredientFlags.IsVegetable | IngredientFlags.IsSpice, 250);
   private readonly _gingerRoot = new Ingredient("Ginger Root", IngredientFlags.IsVegetable | IngredientFlags.IsSpice, 430);
   private readonly _blackPeppercorn = new Ingredient("Black Peppercorn", IngredientFlags.IsSpice, 1700);

   private readonly _mushroom = new Ingredient("Mushroom", IngredientFlags.IsFungi, 90);

   private readonly _apple = new Ingredient("Apple", IngredientFlags.IsFruitPulp, 50);
   private readonly _orangePulp = new Ingredient("Orange Pulp", IngredientFlags.IsFruitPulp, 100);
   private readonly _orangePeel = new Ingredient("Orange Peel", IngredientFlags.None, 220);
   private readonly _lemonPulp = new Ingredient("Lemon Pulp", IngredientFlags.IsFruitPulp, 80);
   private readonly _lemonPeel = new Ingredient("Lemon Peel", IngredientFlags.None, 150);
   private readonly _bananaPulp = new Ingredient("Banana Pulp", IngredientFlags.IsFruitPulp, 270);
   private readonly _bananaPeel = new Ingredient("Banana Peel", IngredientFlags.None, 750);

   /** Magnesium content is for dry leaves. */
   private readonly _greenTeaLeaves = new Ingredient("Green Tea Leaves", IngredientFlags.None, 2000);

   /** Magnesium content is for dry ground coffee beans. */
   private readonly _coffee = new Ingredient("Coffee", IngredientFlags.None, 3000);

   private readonly _cocoaPowder = new Ingredient("Cocoa Powder", IngredientFlags.None, 4990);

   /** Issue. Magnesium content is currently configured as zero, but some salts do contain some of it.  */
   private readonly _salt = new Ingredient("Salt", IngredientFlags.None, 0);

   private readonly _water = new Ingredient("Water", IngredientFlags.IsLiquid, 0);

   private readonly _magnesiumGlycinate = new Ingredient("Magnesium Glycinate", IngredientFlags.None, 200e+3);

   private readonly _appleCiderVinegar = new Ingredient("Apple Cider Vinegar", IngredientFlags.None, 50);

   // #endregion
   // #region Ingredient Rotators

   private readonly _primaryProteinRotator: PrimaryProteinRotator;
   private readonly _bigMealGrainRotator: GrainRotator;
   private readonly _vegetableRotator: IngredientSimpleRotator;
   private readonly _potatoRotator: IngredientSimpleRotator;
   private readonly _greenHerbRotator: IngredientSimpleRotator;
   private readonly _mediumMealIngredientRotator: MediumMealIngredientRotator;
   private readonly _fruitPulpRotator: IngredientSimpleRotator;

   // #endregion
   // #region Nutrient Data

   /**
   The Magnesium daily recommended intake is said to be 310 to 420 mg. So this is the upper bound of the range.
   Issue. Would it be better to use the average of the range.
   Issue. But in the next version it could make sense to get rid of all the Magnesium logic anyway.
   */
   private static readonly _magnesiumRecommendedDailyIntakeWeightInMicroGrams = 420e+3;

   private _magnesiumCumulativeActualIntakeWeightInMicroGrams = 0;

   // #endregion
   // #region State

   private readonly _currentDate: Date;
   private _dayCounter = 0;

   // #endregion
   // #region Other Data

   private static readonly _dateFormatOptions: Intl.DateTimeFormatOptions =
      {
         weekday: "short",
         year: "numeric",
         month: "2-digit",
         day: "2-digit",
      };

   // #endregion
   // #region `constructor`

   constructor(beginningDate_: Date) {
      this._currentDate = /*new Date*/(beginningDate_);
      const liverRotator_ =
         new IngredientSimpleRotator(
            [
               {ingredient: this._beefLiver, ingredientWeightInGrams: 100,},
               {ingredient: this._chickenLiver, ingredientWeightInGrams: 100,},
            ]
         );
      const seaFoodRotator_ =
         new IngredientSimpleRotator(
            [
               {ingredient: this._mackerel, ingredientWeightInGrams: 100,},
               {ingredient: this._oyster, ingredientWeightInGrams: 75,},
               {ingredient: this._herring, ingredientWeightInGrams: 100,},
               {ingredient: this._sardine, ingredientWeightInGrams: 80,},
            ]
         );
      const meatRotator_ =
         new IngredientSimpleRotator(
            [
               {ingredient: this._pork, ingredientWeightInGrams: 120,},
               {ingredient: this._turkey, ingredientWeightInGrams: 120,},
               {ingredient: this._beef, ingredientWeightInGrams: 120,},
               {ingredient: this._chicken, ingredientWeightInGrams: 120,},
            ]
         );
      this._primaryProteinRotator = new PrimaryProteinRotator(liverRotator_, seaFoodRotator_, meatRotator_);
      const grainRotatorSharedState_ = new GrainRotatorSharedState();
      grainRotatorSharedState_.setIngredientNumberOfSlotsBetweenPicksMinLimit(this._buckwheat, 3);
      grainRotatorSharedState_.setIngredientNumberOfSlotsBetweenPicksMinLimit(this._millet, 3);
      grainRotatorSharedState_.setIngredientNumberOfSlotsBetweenPicksMinLimit(this._barley, 4);
      grainRotatorSharedState_.setIngredientNumberOfSlotsBetweenPicksMinLimit(this._wheat, 5);
      grainRotatorSharedState_.setIngredientNumberOfSlotsBetweenPicksMinLimit(this._oat, 4);
      grainRotatorSharedState_.setIngredientNumberOfSlotsBetweenPicksMinLimit(this._whiteRice, 4);
      this._bigMealGrainRotator = new GrainRotator(grainRotatorSharedState_);

      // Comment-202602011 relates and/or applies.
      this._bigMealGrainRotator.addGrain(this._buckwheat, 75, 42.4);
      this._bigMealGrainRotator.addGrain(this._millet, 75, 23.6);
      this._bigMealGrainRotator.addGrain(this._barley, 75, 14.5);
      this._bigMealGrainRotator.addGrain(this._wheat, 75, 9.5);
      this._bigMealGrainRotator.addGrain(this._oat, 75, 5.0);
      this._bigMealGrainRotator.addGrain(this._whiteRice, 75, 5.0);

      this._vegetableRotator =
         new IngredientSimpleRotator(
            [
               {ingredient: this._beetRoot, ingredientWeightInGrams: 75,},
               {ingredient: this._redBellPepper, ingredientWeightInGrams: 75,},
               {ingredient: this._carrotRoot, ingredientWeightInGrams: 75,},
               {ingredient: this._cabbageOrSauerkraut, ingredientWeightInGrams: 75,},
            ]
         );
      this._potatoRotator =
         new IngredientSimpleRotator(
            [
               {ingredient: this._potato, ingredientWeightInGrams: 100,},
               {ingredient: this._sweetPotato, ingredientWeightInGrams: 100,},
            ]
         );
      this._greenHerbRotator =
         new IngredientSimpleRotator(
            [
               {ingredient: this._dill, ingredientWeightInGrams: 35,},
               {ingredient: this._parsley, ingredientWeightInGrams: 45,},
               {ingredient: this._greenOnion, ingredientWeightInGrams: 60,},
            ]
         );
      const mediumMealGrainRotator_ = new GrainRotator(grainRotatorSharedState_);

      // Comment-202602011 relates and/or applies.
      mediumMealGrainRotator_.addGrain(this._oat, 75, 1.0);
      mediumMealGrainRotator_.addGrain(this._millet, 75, 1.0);
      mediumMealGrainRotator_.addGrain(this._whiteRice, 75, 1.0);

      this._mediumMealIngredientRotator =
         new MediumMealIngredientRotator(this._farmersCheese, 227, mediumMealGrainRotator_);
      this._fruitPulpRotator =
         new IngredientSimpleRotator(
            [
               {ingredient: this._apple, ingredientWeightInGrams: 150,},
               {ingredient: this._orangePulp, ingredientWeightInGrams: 90,},
               {ingredient: this._bananaPulp, ingredientWeightInGrams: 90,},
            ]
         );
   }

   // #endregion
   // #region `execute`

   /** This is the primary method to call. It's OK to call it multiple times. */
   public execute(numberOfDays_: number) {
      for( let dayCounter_ = 0; dayCounter_ < numberOfDays_; ++ dayCounter_ ) {
         this._generateDailyMealPlan();
         this._currentDate.setDate(this._currentDate.getDate() + 1);
         ++ this._dayCounter;
      }

      // // Testing.
      // this._bigMealGrainRotator.debugLogStats();
      // this._mediumMealIngredientRotator.debugLogStats();
   }

   // #endregion
   // #region `_generateDailyMealPlan`

   private _generateDailyMealPlan() {
      // #region

      {
         const currentDateAsString_ = this._currentDate.toLocaleDateString("en-CA", MealPlanner._dateFormatOptions);
         console.info(`Day ${this._dayCounter + 1}: ${currentDateAsString_}`);
      }

      // #endregion
      // #region

      const bigMealSlotNumber_ = this._dayCounter * 2;
      const mediumMealSlotNumber_ = bigMealSlotNumber_ + 1;
      let hadSeaFood_: boolean;
      let hadGrainPorridgeWithMilk_ = false;

      // #endregion
      // #region Coffee Meal

      {
         const coffeeWeightInGrams_ = 2;
         const milkWeightInGrams_ = 15;
         this._addMagnesiumIntakeWeight(this._coffee, coffeeWeightInGrams_);
         this._addMagnesiumIntakeWeight(this._milk, milkWeightInGrams_);
         console.info(
            "Coffee Meal: " +
            `${this._coffee} (${coffeeWeightInGrams_}g), ` +
            `${this._water}, ` +
            `${this._milk} (${milkWeightInGrams_}g)`
         );
      }

      // #endregion
      // #region Pre-Big Meal

      {
         const appleCiderVinegarWeightInGrams_ = 10;
         this._addMagnesiumIntakeWeight(this._appleCiderVinegar, appleCiderVinegarWeightInGrams_);
         console.info(
            "Pre-Big Meal: " +
            `${this._appleCiderVinegar} (${appleCiderVinegarWeightInGrams_}g), ` +
            `${this._water} (limited)`
         );
      }

      // #endregion
      // #region Big Meal

      {
         const pickedPrimaryProtein_ = this._primaryProteinRotator.execute(this._dayCounter);
         hadSeaFood_ = pickedPrimaryProtein_.ingredient.hasAnyFlags(IngredientFlags.IsSeaFood);
         this._addMagnesiumIntakeWeight(pickedPrimaryProtein_.ingredient, pickedPrimaryProtein_.ingredientWeightInGrams);
         let porkFatWeightInGrams_ = 0;
         if( ! pickedPrimaryProtein_.ingredient.hasAnyFlags(IngredientFlags.IsFattyFish) ) {
            porkFatWeightInGrams_ = 40;
            this._addMagnesiumIntakeWeight(this._porkFat, porkFatWeightInGrams_);
         }
         let starchIngredient_: Ingredient;
         let starchIngredientWeightInGrams_: number;
         if(pickedPrimaryProtein_.ingredient == this._pork || pickedPrimaryProtein_.ingredient == this._beef) {
            starchIngredient_ = this._bean;
            starchIngredientWeightInGrams_ = 60;
         }
         else {
            const pickedGrain_ = this._bigMealGrainRotator.execute(bigMealSlotNumber_);
            starchIngredient_ = pickedGrain_.ingredient;
            starchIngredientWeightInGrams_ = pickedGrain_.ingredientWeightInGrams;
         }
         this._addMagnesiumIntakeWeight(starchIngredient_, starchIngredientWeightInGrams_);
         const pickedVegetable_ = this._vegetableRotator.execute();
         this._addMagnesiumIntakeWeight(pickedVegetable_.ingredient, pickedVegetable_.ingredientWeightInGrams);
         const onionWeightInGrams_ = 40;
         const garlicWeightInGrams_ = 15;
         const gingerWeightInGrams_ = 25;
         const orangePeelWeightInGrams_ = 25;
         const lemonPeelWeightInGrams_ = 10;
         const bananaPeelWeightInGrams_ = 20;
         const blackPeppercornWeightInGrams_ = 1;
         const saltWeightInGrams_ = 1;
         this._addMagnesiumIntakeWeight(this._onion, onionWeightInGrams_);
         this._addMagnesiumIntakeWeight(this._garlic, garlicWeightInGrams_);
         this._addMagnesiumIntakeWeight(this._gingerRoot, gingerWeightInGrams_);
         this._addMagnesiumIntakeWeight(this._orangePeel, orangePeelWeightInGrams_);
         this._addMagnesiumIntakeWeight(this._lemonPeel, lemonPeelWeightInGrams_);
         this._addMagnesiumIntakeWeight(this._bananaPeel, bananaPeelWeightInGrams_);
         this._addMagnesiumIntakeWeight(this._blackPeppercorn, blackPeppercornWeightInGrams_);
         this._addMagnesiumIntakeWeight(this._salt, saltWeightInGrams_);
         console.info(
            "Big Meal: " +
            `${pickedPrimaryProtein_.ingredient} (${pickedPrimaryProtein_.ingredientWeightInGrams}g), ` +
            ((porkFatWeightInGrams_ > 0) ? `${this._porkFat} (${porkFatWeightInGrams_}g), ` : `(skip ${this._porkFat}), `) +
            `${starchIngredient_} (${starchIngredientWeightInGrams_}g), ` +
            `${pickedVegetable_.ingredient} (${pickedVegetable_.ingredientWeightInGrams}g), ` +
            `${this._onion} (${onionWeightInGrams_}g), ` +
            `${this._garlic} (${garlicWeightInGrams_}g), ` +
            `${this._gingerRoot} (${gingerWeightInGrams_}g), ` +
            `${this._orangePeel} (${orangePeelWeightInGrams_}g), ` +
            `${this._lemonPeel} (${lemonPeelWeightInGrams_}g), ` +
            `${this._bananaPeel} (${bananaPeelWeightInGrams_}g), ` +
            `${this._blackPeppercorn} (${blackPeppercornWeightInGrams_}g), ` +
            `${this._salt} (${saltWeightInGrams_}g), ` +
            `${this._water} (limited)`
         );
      }

      // #endregion
      // #region Fruit Meal 1

      {
         const pickedFruitPulp_ = this._fruitPulpRotator.execute();
         this._addMagnesiumIntakeWeight(pickedFruitPulp_.ingredient, pickedFruitPulp_.ingredientWeightInGrams);
         const lemonPulpWeightInGrams_ = 20;
         const sunflowerSeedWeightInGrams_ = 15;
         const pepitaWeightInGrams_ = 15;
         this._addMagnesiumIntakeWeight(this._lemonPulp, lemonPulpWeightInGrams_);
         this._addMagnesiumIntakeWeight(this._sunflowerSeed, sunflowerSeedWeightInGrams_);
         this._addMagnesiumIntakeWeight(this._pepita, pepitaWeightInGrams_);
         console.info(
            "Fruit Meal 1: " +
            `${pickedFruitPulp_.ingredient} (${pickedFruitPulp_.ingredientWeightInGrams}g), ` +
            `${this._lemonPulp} (${lemonPulpWeightInGrams_}g), ` +
            `${this._sunflowerSeed} (${sunflowerSeedWeightInGrams_}g), ` +
            `${this._pepita} (${pepitaWeightInGrams_}g), ` +
            `${this._water} (if needed)`
         );
      }

      // #endregion
      // #region Medium Meal

      {
         // #region

         let mediumMealOutputPart1_: string;

         // #endregion
         // #region

         if(hadSeaFood_) {
            // #region

            const eggWeightInGrams_ = 90;
            const pickedPotato_ = this._potatoRotator.execute();
            const greenBellPepperWeightInGrams_ = 75;
            const mushroomWeightInGrams_ = 76;
            const saltWeightInGrams_ = 1;
            this._addMagnesiumIntakeWeight(this._egg, eggWeightInGrams_);
            this._addMagnesiumIntakeWeight(pickedPotato_.ingredient, pickedPotato_.ingredientWeightInGrams);
            this._addMagnesiumIntakeWeight(this._greenBellPepper, greenBellPepperWeightInGrams_);
            this._addMagnesiumIntakeWeight(this._mushroom, mushroomWeightInGrams_);
            this._addMagnesiumIntakeWeight(this._salt, saltWeightInGrams_);
            mediumMealOutputPart1_ =
               `${this._egg} (${eggWeightInGrams_}g), ` +
               `${pickedPotato_.ingredient} (${pickedPotato_.ingredientWeightInGrams}g), ` +
               `${this._greenBellPepper} (${greenBellPepperWeightInGrams_}g), ` +
               `${this._mushroom} (${mushroomWeightInGrams_}g), `+
               `${this._salt} (${saltWeightInGrams_}g), ` +
               `${this._water} (limited)`;

            // #endregion
         }
         else {
            // #region

            const pickedIngredient_ = this._mediumMealIngredientRotator.execute(mediumMealSlotNumber_);
            this._addMagnesiumIntakeWeight(pickedIngredient_.ingredient, pickedIngredient_.ingredientWeightInGrams);
            mediumMealOutputPart1_ =
               `${pickedIngredient_.ingredient} (${pickedIngredient_.ingredientWeightInGrams}g), `;

            // #endregion
            // #region

            if(pickedIngredient_.ingredient == this._farmersCheese) {
               // #region

               const pickedGreenHerb_ = this._greenHerbRotator.execute();
               this._addMagnesiumIntakeWeight(pickedGreenHerb_.ingredient, pickedGreenHerb_.ingredientWeightInGrams);
               mediumMealOutputPart1_ +=
                  `${this._sourCream} (possibly optional, 0g), ` +
                  `${pickedGreenHerb_.ingredient} (${pickedGreenHerb_.ingredientWeightInGrams}g)`;

               // #endregion
            }
            else {
               // #region

               const milkWeightInGrams_ = 250;
               const butterWeightInGrams_ = 40;
               const cocoaPowderWeightInGrams_ = 15;
               const saltWeightInGrams_ = 1;
               this._addMagnesiumIntakeWeight(this._milk, milkWeightInGrams_);
               this._addMagnesiumIntakeWeight(this._butter, butterWeightInGrams_);
               this._addMagnesiumIntakeWeight(this._cocoaPowder, cocoaPowderWeightInGrams_);
               this._addMagnesiumIntakeWeight(this._salt, saltWeightInGrams_);
               mediumMealOutputPart1_ +=
                  `${this._milk} (${milkWeightInGrams_}g), ` +
                  `${this._butter} (${butterWeightInGrams_}g), ` +
                  `${this._cocoaPowder} (${cocoaPowderWeightInGrams_}g), ` +
                  `${this._salt} (${saltWeightInGrams_}g)`;
               hadGrainPorridgeWithMilk_ = true;

               // #endregion
            }

            // #endregion
         }

         // #endregion
         // #region

         console.info("Medium Meal: " + mediumMealOutputPart1_);
         
         // #endregion
      }

      // #endregion
      // #region Tea Meal; Fruit Meal 2

      // We have to plan Fruit Meal 2 before we can decide if Tea Meal needs to include Magnesium Glycinate.
      {
         const greenTeaLeavesWeightInGrams_ = 3;
         this._addMagnesiumIntakeWeight(this._greenTeaLeaves, greenTeaLeavesWeightInGrams_);
         const pickedFruitPulp_ = this._fruitPulpRotator.execute();
         this._addMagnesiumIntakeWeight(pickedFruitPulp_.ingredient, pickedFruitPulp_.ingredientWeightInGrams);
         let fruitMeal2OutputPart1_: string;
         if(hadGrainPorridgeWithMilk_) {
            const kefirWeightInGrams_ = 100;
            this._addMagnesiumIntakeWeight(this._kefir, kefirWeightInGrams_);
            fruitMeal2OutputPart1_ = `${this._kefir} (${kefirWeightInGrams_}g)`;
         }
         else {
            const milkOrKefirWeightInGrams_ = 200;
            const cocoaPowderWeightInGrams_ = 10;

            // Comment-202601307 relates.
            this._addMagnesiumIntakeWeight(this._milk, milkOrKefirWeightInGrams_);

            this._addMagnesiumIntakeWeight(this._cocoaPowder, cocoaPowderWeightInGrams_);
            fruitMeal2OutputPart1_ =
               `${this._milk} or ${this._kefir} (${milkOrKefirWeightInGrams_}g), ` +
               `${this._cocoaPowder} (${cocoaPowderWeightInGrams_}g)`;
         }
         const magnesiumCumulativeActualWithMagnesiumGlycinateIntakeWeightInMicroGrams_ =
            this._magnesiumCumulativeActualIntakeWeightInMicroGrams + this._magnesiumGlycinate.magnesiumContentInPartsPerMillion;
         const magnesiumCumulativeRecommendedIntakeWeightInMicroGrams_ =
            (this._dayCounter + 1) * MealPlanner._magnesiumRecommendedDailyIntakeWeightInMicroGrams;
         const diff1_ = this._magnesiumCumulativeActualIntakeWeightInMicroGrams - magnesiumCumulativeRecommendedIntakeWeightInMicroGrams_;
         const diff2_ = magnesiumCumulativeActualWithMagnesiumGlycinateIntakeWeightInMicroGrams_ - magnesiumCumulativeRecommendedIntakeWeightInMicroGrams_;

         // // Testing.
         // console.info(`202601287 ${diff1_} ${diff2_}`);

         let teaMealOutputPart1_: string;
         if(Math.abs(diff2_) < Math.abs(diff1_)) {
            this._magnesiumCumulativeActualIntakeWeightInMicroGrams = magnesiumCumulativeActualWithMagnesiumGlycinateIntakeWeightInMicroGrams_;
            teaMealOutputPart1_ = `${this._magnesiumGlycinate} (${this._magnesiumGlycinate.magnesiumContentInPartsPerMillion / 1.0e+3}mg of Magnesium)`;
         }
         else {
            teaMealOutputPart1_ = `(skip ${this._magnesiumGlycinate})`;
         }
         console.info(
            "Tea Meal: " +
            `${this._greenTeaLeaves} (${greenTeaLeavesWeightInGrams_}g), ` +
            `${this._water}, ` +
            `${teaMealOutputPart1_}`
         );
         console.info(
            "Fruit Meal 2: " +
            `${pickedFruitPulp_.ingredient} (${pickedFruitPulp_.ingredientWeightInGrams}g), ` +
            `${fruitMeal2OutputPart1_}`
         );
      }

      // #endregion
      // #region

      console.info();

      // #endregion
   }

   // #endregion
   // #region `_addMagnesiumIntakeWeight`

   private _addMagnesiumIntakeWeight(ingredient_: Ingredient, ingredientWeightInGrams_: number) {
      this._magnesiumCumulativeActualIntakeWeightInMicroGrams += ingredientWeightInGrams_ * ingredient_.magnesiumContentInPartsPerMillion;
   }

   // #endregion
}

// #endregion
