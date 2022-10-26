/*
All value is in g or mg for 100g of product
------------------------------------------------------------
Energy is multiplied by 4.184 to convert it from kcal to kJ
if the value is on KJ remove the multiplication
------------------------------------------------------------
Fibers is in g
Proteins is in g
saturatedFats is in g
Sodium is in mg
Sugar is in g
fruitsPercentage is in %
*/

class Nutriscore {
  energy!: number;
  fibers!: number;
  proteins!: number;
  saturatedFats!: number;
  sodium!: number;
  sugar!: number;
  fruitsPercentage!: number;
}

export default function calculeNutriscore(nutriments: Nutriscore) {
  const energy = nutriments.energy * 4.184;
  const fibers = nutriments.fibers;
  const proteins = nutriments.proteins;
  const saturatedFats = nutriments.saturatedFats;
  const sodium = nutriments.sodium;
  const sugar = nutriments.sugar;
  const fruitsPercentage = nutriments.fruitsPercentage;

  function energyScore(energy: number) {
    let energyScore: number = 0;
    switch (true) {
      case energy <= 335:
        energyScore = 0;
        break;
      case energy > 335 && energy <= 670:
        energyScore = 1;
        break;
      case energy > 670 && energy <= 1005:
        energyScore = 2;
        break;
      case energy > 1005 && energy <= 1340:
        energyScore = 3;
        break;
      case energy > 1340 && energy <= 1675:
        energyScore = 4;
        break;
      case energy > 1675 && energy <= 2010:
        energyScore = 5;
        break;
      case energy > 2010 && energy <= 2345:
        energyScore = 6;
        break;
      case energy > 2345 && energy <= 2680:
        energyScore = 7;
        break;
      case energy > 2680 && energy <= 3015:
        energyScore = 8;
        break;
      case energy > 3015 && energy <= 3350:
        energyScore = 9;
        break;
      case energy > 3350:
        energyScore = 10;
        break;
      default:
        break;
    }
    return energyScore;
  }

  function sugarScore(sugar: number) {
    let sugarScore: number = 0;
    switch (true) {
      case sugar <= 4.5:
        sugarScore = 0;
        break;
      case sugar > 4.5 && sugar <= 9:
        sugarScore = 1;
        break;
      case sugar > 9 && sugar <= 13.5:
        sugarScore = 2;
        break;
      case sugar > 13.5 && sugar <= 18:
        sugarScore = 3;
        break;
      case sugar > 18 && sugar <= 22.5:
        sugarScore = 4;
        break;
      case sugar > 22.5 && sugar <= 27:
        sugarScore = 5;
        break;
      case sugar > 27 && sugar <= 31.5:
        sugarScore = 6;
        break;
      case sugar > 31.5 && sugar <= 36:
        sugarScore = 7;
        break;
      case sugar > 36 && sugar <= 40.5:
        sugarScore = 8;
        break;
      case sugar > 40.5 && sugar <= 45:
        sugarScore = 9;
        break;
      case sugar > 45:
        sugarScore = 10;
        break;
      default:
        break;
    }
    return sugarScore;
  }

  function saturatedFatsScore(saturatedFats: number) {
    let saturatedFatsScore: number = 0;
    switch (true) {
      case saturatedFats <= 1:
        saturatedFatsScore = 0;
        break;
      case saturatedFats > 1 && saturatedFats < 2:
        saturatedFatsScore = 1;
        break;
      case saturatedFats >= 2 && saturatedFats < 3:
        saturatedFatsScore = 2;
        break;
      case saturatedFats >= 3 && saturatedFats < 4:
        saturatedFatsScore = 3;
        break;
      case saturatedFats >= 4 && saturatedFats < 5:
        saturatedFatsScore = 4;
        break;
      case saturatedFats >= 5 && saturatedFats < 6:
        saturatedFatsScore = 5;
        break;
      case saturatedFats >= 6 && saturatedFats < 7:
        saturatedFatsScore = 6;
        break;
      case saturatedFats >= 7 && saturatedFats < 8:
        saturatedFatsScore = 7;
        break;
      case saturatedFats >= 8 && saturatedFats < 9:
        saturatedFatsScore = 8;
        break;
      case saturatedFats >= 9 && saturatedFats < 10:
        saturatedFatsScore = 9;
        break;
      case saturatedFats >= 10:
        saturatedFatsScore = 10;
        break;
      default:
        break;
    }
    return saturatedFatsScore;
  }

  function sodiumScore(sodium: number) {
    let sodiumScore: number = 0;
    switch (true) {
      case sodium <= 90:
        sodiumScore = 0;
        break;
      case sodium > 90 && sodium <= 180:
        sodiumScore = 1;
        break;
      case sodium > 180 && sodium <= 270:
        sodiumScore = 2;
        break;
      case sodium > 270 && sodium <= 360:
        sodiumScore = 3;
        break;
      case sodium > 360 && sodium <= 450:
        sodiumScore = 4;
        break;
      case sodium > 450 && sodium <= 540:
        sodiumScore = 5;
        break;
      case sodium > 540 && sodium <= 630:
        sodiumScore = 6;
        break;
      case sodium > 630 && sodium <= 720:
        sodiumScore = 7;
        break;
      case sodium > 720 && sodium <= 810:
        sodiumScore = 8;
        break;
      case sodium > 810 && sodium <= 900:
        sodiumScore = 9;
        break;
      case sodium > 900:
        sodiumScore = 10;
        break;
      default:
        break;
    }
    return sodiumScore;
  }

  function fibersScore(proteins: number) {
    let fibersScore: number = 0;
    switch (true) {
      case fibers <= 0.7:
        fibersScore = 0;
        break;
      case fibers > 0.7 && fibers <= 1.4:
        fibersScore = 1;
        break;
      case fibers > 1.4 && fibers <= 2.1:
        fibersScore = 2;
        break;
      case fibers > 2.1 && fibers <= 2.8:
        fibersScore = 3;
        break;
      case fibers > 2.8 && fibers <= 3.5:
        fibersScore = 4;
        break;
      case fibers > 3.5:
        fibersScore = 5;
        break;
      default:
        break;
    }
    return fibersScore;
  }

  function proteinsScore(fruitsPercentage: number) {
    let proteinsScore: number = 0;
    switch (true) {
      case proteins <= 1.6:
        proteinsScore = 0;
        break;
      case proteins > 1.6 && proteins <= 3.2:
        proteinsScore = 1;
        break;
      case proteins > 3.2 && proteins <= 4.8:
        proteinsScore = 2;
        break;
      case proteins > 4.8 && proteins <= 6.4:
        proteinsScore = 3;
        break;
      case proteins > 6.4 && proteins <= 8:
        proteinsScore = 4;
        break;
      case proteins > 8:
        proteinsScore = 5;
        break;
      default:
        break;
    }
    return proteinsScore;
  }

  function fruitsPercentageScore(fruitsPercentage: number) {
    let fruitsPercentageScore: number = 0;
    switch (true) {
      case fruitsPercentage <= 40:
        fruitsPercentageScore = 0;
        break;
      case fruitsPercentage > 40 && fruitsPercentage <= 60:
        fruitsPercentageScore = 1;
        break;
      case fruitsPercentage > 60 && fruitsPercentage <= 80:
        fruitsPercentageScore = 2;
        break;
      case fruitsPercentage > 80:
        fruitsPercentageScore = 5;
        break;
      default:
        break;
    }
    return fruitsPercentageScore;
  }

  function calculateNScore() {
    let nScore: number = 0;
    nScore = energyScore(energy) + sugarScore(sugar) + saturatedFatsScore(saturatedFats) + sodiumScore(sodium);
    return nScore;
  }

  function calculatePScore() {
    let pScore: number = 0;
    pScore = fibersScore(fibers) + proteinsScore(proteins) + fruitsPercentageScore(fruitsPercentage);
    return pScore;
  }

  function calculateScore() {
    const nScore: number = calculateNScore();
    const pScore: number = calculatePScore();
    const fruitsScore: number = fruitsPercentageScore(fruitsPercentage);
    if (nScore >= 11 && fruitsScore === 5) {
      return nScore - pScore;
    }
    if (nScore >= 11 && fruitsScore < 5) {
      return nScore - (pScore + fruitsScore);
    }
    if (nScore < 11) {
      return nScore - pScore;
    }
  }

  function calculateGrade() {
    const score: any = calculateScore();
    let nutriscore: string = '';
    let logoNutriscore: string = '';
    switch (true) {
      case score < -1:
        nutriscore = 'A';
        logoNutriscore = 'https://static.openfoodfacts.org/images/misc/nutriscore-a.svg';
        break;
      case score >= -1 && score <= 2:
        nutriscore = 'B';
        logoNutriscore = 'https://static.openfoodfacts.org/images/misc/nutriscore-b.svg';
        break;
      case score >= 3 && score <= 10:
        nutriscore = 'C';
        logoNutriscore = 'https://static.openfoodfacts.org/images/misc/nutriscore-c.svg';
        break;
      case score >= 11 && score <= 18:
        nutriscore = 'D';
        logoNutriscore = 'https://static.openfoodfacts.org/images/misc/nutriscore-d.svg';
        break;
      case score >= 19:
        nutriscore = 'E';
        logoNutriscore = 'https://static.openfoodfacts.org/images/misc/nutriscore-e.svg';
        break;
      default:
        break;
    }
    return { nutriscore, logoNutriscore };
  }

  return calculateGrade();
}
