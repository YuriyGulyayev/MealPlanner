// import {assertEquals} from "@std/assert";
import * as Helpers from "./Helpers.ts";
import {MealPlanner} from "./MealPlanner.ts";

Deno.test(
   function test1() {
      const mealPlanner_ = new MealPlanner(Helpers.hackParseLocalDate("2019-12-31"));
      mealPlanner_.execute(30_000);
      mealPlanner_.execute(10);
   }
);
