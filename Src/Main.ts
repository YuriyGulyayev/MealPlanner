if( ! import.meta.main ) {
   throw new Error("Someone is trying to import us.");
}

import {parseArgs} from "@std/cli";
import * as Helpers from "./Helpers.ts";
import {MealPlanner} from "./MealPlanner.ts";

main();

function main() {
   const args_ =
      parseArgs(
         Deno.args,
         {
            string: ["beginning-date",],
            default: {"number-of-days": 366,},
         }
      );
   let beginningDate_: Date;
   const beginningDateAsString_ = args_["beginning-date"];
   if(beginningDateAsString_) {
      beginningDate_ = Helpers.hackParseLocalDate(beginningDateAsString_);
   }
   else {
      beginningDate_ = new Date();
      beginningDate_.setHours(0, 0, 0, 0);

      // Defaulting to tomorrow.
      beginningDate_.setDate(beginningDate_.getDate() + 1);
   }
   const numberOfDays_ = Number(args_["number-of-days"]);
   const mealPlanner_ = new MealPlanner(beginningDate_);
   mealPlanner_.execute(numberOfDays_);
}
