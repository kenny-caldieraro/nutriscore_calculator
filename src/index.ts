// /*
// All value is in g or mg for 100g of product
// ------------------------------------------------------------
// Energy is multiplied by 4.184 to convert it from kcal to kJ
// if the value is on KJ remove the multiplication
// ------------------------------------------------------------
// Fibers is in g
// Proteins is in g
// Saturated_fats is in g
// Sodium is in mg
// Sugar is in g
// Fruit_percent is in %
// */

// class Nutriscore {
//   energy: number;
//   fibers: number;
//   proteins: number;
//   saturated_fats: number;
//   sodium: number;
//   sugar: number;
//   fruit_percentage: number;
// }

// export default {
//   calculeNutriscore: (nutriments: Nutriscore) => {
//     const energy: number = nutriments.energy * 4.184;
//     const fibers: number = nutriments.fibers;
//     const proteins: number = nutriments.proteins;
//     const saturated_fats: number = nutriments.saturated_fats;
//     const sodium: number = nutriments.sodium;
//     const sugar: number = nutriments.sugar;
//     const fruit_percentage: number = nutriments.fruit_percentage;

//     // object for debug
//     const debug = {
//       energy,
//       fibers,
//       proteins,
//       saturated_fats,
//       sodium,
//       sugar,
//       fruit_percentage,
//     };

//     // step energy
//     let energyScore: number = 0;
//     switch (true) {
//       case energy <= 335:
//         energyScore = 0;
//         break;
//       case energy > 335 && energy <= 670:
//         energyScore = 1;
//         break;
//       case energy > 670 && energy <= 1005:
//         energyScore = 2;
//         break;
//       case energy > 1005 && energy <= 1340:
//         energyScore = 3;
//         break;
//       case energy > 1340 && energy <= 1675:
//         energyScore = 4;
//         break;
//       case energy > 1675 && energy <= 2010:
//         energyScore = 5;
//         break;
//       case energy > 2010 && energy <= 2345:
//         energyScore = 6;
//         break;
//       case energy > 2345 && energy <= 2680:
//         energyScore = 7;
//         break;
//       case energy > 2680 && energy <= 3015:
//         energyScore = 8;
//         break;
//       case energy > 3015 && energy <= 3350:
//         energyScore = 9;
//         break;
//       case energy > 3350:
//         energyScore = 10;
//         break;
//       default:
//         break;
//     }

//     // step sugar
//     let sugarScore: number = 0;
//     switch (true) {
//       case sugar <= 4.5:
//         sugarScore = 0;
//         break;
//       case sugar > 4.5 && sugar <= 9:
//         sugarScore = 1;
//         break;
//       case sugar > 9 && sugar <= 13.5:
//         sugarScore = 2;
//         break;
//       case sugar > 13.5 && sugar <= 18:
//         sugarScore = 3;
//         break;
//       case sugar > 18 && sugar <= 22.5:
//         sugarScore = 4;
//         break;
//       case sugar > 22.5 && sugar <= 27:
//         sugarScore = 5;
//         break;
//       case sugar > 27 && sugar <= 31.5:
//         sugarScore = 6;
//         break;
//       case sugar > 31.5 && sugar <= 36:
//         sugarScore = 7;
//         break;
//       case sugar > 36 && sugar <= 40.5:
//         sugarScore = 8;
//         break;
//       case sugar > 40.5 && sugar <= 45:
//         sugarScore = 9;
//         break;
//       case sugar > 45:
//         sugarScore = 10;
//         break;
//       default:
//         break;
//     }

//     // step saturated_fats
//     let saturated_fatsScore: number = 0;
//     switch (true) {
//       case saturated_fats <= 1:
//         saturated_fatsScore = 0;
//         break;
//       case saturated_fats > 1 && saturated_fats < 2:
//         saturated_fatsScore = 1;
//         break;
//       case saturated_fats >= 2 && saturated_fats < 3:
//         saturated_fatsScore = 2;
//         break;
//       case saturated_fats >= 3 && saturated_fats < 4:
//         saturated_fatsScore = 3;
//         break;
//       case saturated_fats >= 4 && saturated_fats < 5:
//         saturated_fatsScore = 4;
//         break;
//       case saturated_fats >= 5 && saturated_fats < 6:
//         saturated_fatsScore = 5;
//         break;
//       case saturated_fats >= 6 && saturated_fats < 7:
//         saturated_fatsScore = 6;
//         break;
//       case saturated_fats >= 7 && saturated_fats < 8:
//         saturated_fatsScore = 7;
//         break;
//       case saturated_fats >= 8 && saturated_fats < 9:
//         saturated_fatsScore = 8;
//         break;
//       case saturated_fats >= 9 && saturated_fats < 10:
//         saturated_fatsScore = 9;
//         break;
//       case saturated_fats >= 10:
//         saturated_fatsScore = 10;
//         break;
//       default:
//         break;
//     }

//     // step sodium
//     let sodiumScore: number = 0;
//     switch (true) {
//       case sodium <= 90:
//         sodiumScore = 0;
//         break;
//       case sodium > 90 && sodium <= 180:
//         sodiumScore = 1;
//         break;
//       case sodium > 180 && sodium <= 270:
//         sodiumScore = 2;
//         break;
//       case sodium > 270 && sodium <= 360:
//         sodiumScore = 3;
//         break;
//       case sodium > 360 && sodium <= 450:
//         sodiumScore = 4;
//         break;
//       case sodium > 450 && sodium <= 540:
//         sodiumScore = 5;
//         break;
//       case sodium > 540 && sodium <= 630:
//         sodiumScore = 6;
//         break;
//       case sodium > 630 && sodium <= 720:
//         sodiumScore = 7;
//         break;
//       case sodium > 720 && sodium <= 810:
//         sodiumScore = 8;
//         break;
//       case sodium > 810 && sodium <= 900:
//         sodiumScore = 9;
//         break;
//       case sodium > 900:
//         sodiumScore = 10;
//         break;
//       default:
//         break;
//     }

//     // step fibers
//     let fibersScore: number = 0;
//     switch (true) {
//       case fibers <= 0.7:
//         fibersScore = 0;
//         break;
//       case fibers > 0.7 && fibers <= 1.4:
//         fibersScore = 1;
//         break;
//       case fibers > 1.4 && fibers <= 2.1:
//         fibersScore = 2;
//         break;
//       case fibers > 2.1 && fibers <= 2.8:
//         fibersScore = 3;
//         break;
//       case fibers > 2.8 && fibers <= 3.5:
//         fibersScore = 4;
//         break;
//       case fibers > 3.5:
//         fibersScore = 5;
//         break;
//       default:
//         break;
//     }

//     // step proteins
//     let proteinsScore: number = 0;
//     switch (true) {
//       case proteins <= 1.6:
//         proteinsScore = 0;
//         break;
//       case proteins > 1.6 && proteins <= 3.2:
//         proteinsScore = 1;
//         break;
//       case proteins > 3.2 && proteins <= 4.8:
//         proteinsScore = 2;
//         break;
//       case proteins > 4.8 && proteins <= 6.4:
//         proteinsScore = 3;
//         break;
//       case proteins > 6.4 && proteins <= 8:
//         proteinsScore = 4;
//         break;
//       case proteins > 8:
//         proteinsScore = 5;
//         break;
//       default:
//         break;
//     }

//     // calc "A" score
//     let aScore: number =
//       energyScore + sugarScore + saturated_fatsScore + sodiumScore;

//     // calc "C" score
//     let cScore: number = fibersScore + proteinsScore;

//     let score: number = aScore - cScore;

//     let nutriscore: string = '';
//     let logoNutriscore: string = '';
//     switch (true) {
//       case score < -1:
//         nutriscore = 'A';
//         logoNutriscore =
//           'https://static.openfoodfacts.org/images/misc/nutriscore-a.svg';
//         break;
//       case score >= -1 && score <= 2:
//         nutriscore = 'B';
//         logoNutriscore =
//           'https://static.openfoodfacts.org/images/misc/nutriscore-b.svg';
//         break;
//       case score >= 3 && score <= 10:
//         nutriscore = 'C';
//         logoNutriscore =
//           'https://static.openfoodfacts.org/images/misc/nutriscore-c.svg';
//         break;
//       case score >= 11 && score <= 18:
//         nutriscore = 'D';
//         logoNutriscore =
//           'https://static.openfoodfacts.org/images/misc/nutriscore-d.svg';
//         break;
//       case score >= 19:
//         nutriscore = 'E';
//         logoNutriscore =
//           'https://static.openfoodfacts.org/images/misc/nutriscore-e.svg';
//         break;
//       default:
//         break;
//     }

//     // console.log(debug);
//     return {
//       nutriscore: nutriscore,
//       score: score,
//       logoNutriscore: logoNutriscore,
//     };
//   },
// };

export const Greeter = (name: string) => `Hello ${name}`;
