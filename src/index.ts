// Nutri-Score 2025 – TypeScript complet avec améliorations
// Basé sur les règles officielles du Nutri-Score 2025
// Sources : Santé publique France, Commission européenne

export enum ProductCategory {
  GENERAL = 'general',
  FATS = 'fats',
  CHEESE = 'cheese',
  BEVERAGES = 'beverages',
}

export interface Nutriscore {
  energy: number; // en kcal/100g
  fibers: number; // en g/100g
  proteins: number; // en g/100g
  saturatedFats: number; // en g/100g
  sodium: number; // en mg/100g
  sugar: number; // en g/100g
  fruitsPercentage: number; // en % (0-100)
  totalFats?: number; // en g/100g (requis pour les matières grasses)
  category?: ProductCategory;
  isRedMeat?: boolean; // pour les viandes rouges
  ferHeminique?: number; // en mg/100g (pour les viandes rouges)
  containsEdulcorants?: boolean; // pour les boissons
  isWater?: boolean; // pour l'eau
}

export default function calculeNutriscore(nutriments: Nutriscore) {
  // Validation des valeurs d'entrée
  if (
    nutriments.energy < 0 ||
    nutriments.fibers < 0 ||
    nutriments.proteins < 0 ||
    nutriments.saturatedFats < 0 ||
    nutriments.sodium < 0 ||
    nutriments.sugar < 0
  ) {
    throw new Error('Les valeurs nutritionnelles ne peuvent pas être négatives');
  }

  const category = nutriments.category || ProductCategory.GENERAL;
  const isRedMeat = nutriments.isRedMeat || false;
  const containsEdulcorants = nutriments.containsEdulcorants || false;
  const isWater = nutriments.isWater || false;
  const ferHeminique = nutriments.ferHeminique || 0;

  const energy = nutriments.energy * 4.184;
  const fibers = Math.max(0, nutriments.fibers);
  const proteins = Math.max(0, nutriments.proteins);
  const saturatedFats = Math.max(0, nutriments.saturatedFats);
  const sodium = Math.max(0, nutriments.sodium);
  const sugar = Math.max(0, nutriments.sugar);
  const fruitsPercentage = Math.min(Math.max(nutriments.fruitsPercentage, 0), 100);
  const totalFats = Math.max(0, nutriments.totalFats || 0);

  switch (category) {
    case ProductCategory.GENERAL:
      return calculateGeneralNutriscore(
        energy,
        fibers,
        proteins,
        saturatedFats,
        sodium,
        sugar,
        fruitsPercentage,
        isRedMeat,
        ferHeminique,
      );
    case ProductCategory.FATS:
      return calculateFatsNutriscore(fibers, proteins, saturatedFats, sodium, sugar, fruitsPercentage, totalFats);
    case ProductCategory.CHEESE:
      return calculateCheeseNutriscore(energy, fibers, proteins, saturatedFats, sodium, sugar, fruitsPercentage);
    case ProductCategory.BEVERAGES:
      return calculateBeveragesNutriscore(
        energy,
        fibers,
        proteins,
        saturatedFats,
        sodium,
        sugar,
        fruitsPercentage,
        containsEdulcorants,
        isWater,
      );
    default:
      return calculateGeneralNutriscore(
        energy,
        fibers,
        proteins,
        saturatedFats,
        sodium,
        sugar,
        fruitsPercentage,
        isRedMeat,
        ferHeminique,
      );
  }
}

function calculateGeneralNutriscore(
  energy: number,
  fibers: number,
  proteins: number,
  saturatedFats: number,
  sodium: number,
  sugar: number,
  fruitsPercentage: number,
  isRedMeat: boolean,
  ferHeminique: number,
) {
  const energyScore = calculateEnergyScore(energy);
  const sugarScore = calculateGeneralSugarScore(sugar);
  const saturatedFatsScore = calculateSaturatedFatsScore(saturatedFats);
  const sodiumScore = calculateSodiumScore(sodium);

  const fibersScore = calculateFibersScore(fibers);
  let proteinsScore = calculateProteinsScore(proteins);
  const fruitsScore = calculateFruitsScore(fruitsPercentage);

  if (isRedMeat && ferHeminique < 1 && proteinsScore > 2) {
    proteinsScore = 2;
  }

  let pScore = fibersScore + proteinsScore + fruitsScore;
  const nScore = energyScore + sugarScore + saturatedFatsScore + sodiumScore;

  if (nScore >= 11) pScore = fibersScore + fruitsScore;
  const finalScore = nScore - pScore;

  return getNutriscoreGradeGeneric(finalScore, [0, 2, 10, 18]);
}

function calculateFatsNutriscore(
  fibers: number,
  proteins: number,
  saturatedFats: number,
  sodium: number,
  sugar: number,
  fruitsPercentage: number,
  totalFats: number,
) {
  const energyFromSaturatedFats = saturatedFats * 37;
  const energyScore = calculateEnergyScoreForFats(energyFromSaturatedFats);
  const satFatRatio = totalFats > 0 ? (saturatedFats / totalFats) * 100 : 0;
  const satFatRatioScore = calculateSatFatRatioScore(satFatRatio);

  const sugarScore = calculateGeneralSugarScore(sugar);
  const sodiumScore = calculateSodiumScore(sodium);
  const fibersScore = calculateFibersScore(fibers);
  const proteinsScore = calculateProteinsScore(proteins);
  const fruitsScore = calculateFruitsScore(fruitsPercentage);

  const nScore = energyScore + sugarScore + satFatRatioScore + sodiumScore;
  let pScore = fibersScore + proteinsScore + fruitsScore;
  if (nScore >= 7) pScore = fibersScore + fruitsScore;

  const finalScore = nScore - pScore;
  return getNutriscoreGradeGeneric(finalScore, [-6, 2, 10, 18]);
}

function calculateCheeseNutriscore(
  energy: number,
  fibers: number,
  proteins: number,
  saturatedFats: number,
  sodium: number,
  sugar: number,
  fruitsPercentage: number,
) {
  const energyScore = calculateEnergyScore(energy);
  const sugarScore = calculateGeneralSugarScore(sugar);
  const saturatedFatsScore = calculateSaturatedFatsScore(saturatedFats);
  const sodiumScore = calculateSodiumScore(sodium);

  const fibersScore = calculateFibersScore(fibers);
  const proteinsScore = calculateProteinsScore(proteins);
  const fruitsScore = calculateFruitsScore(fruitsPercentage);

  const nScore = energyScore + sugarScore + saturatedFatsScore + sodiumScore;
  const pScore = fibersScore + proteinsScore + fruitsScore;
  const finalScore = nScore - pScore;

  return getNutriscoreGradeGeneric(finalScore, [0, 2, 10, 18]);
}

function calculateBeveragesNutriscore(
  energy: number,
  fibers: number,
  proteins: number,
  saturatedFats: number,
  sodium: number,
  sugar: number,
  fruitsPercentage: number,
  containsEdulcorants: boolean,
  isWater: boolean,
) {
  if (isWater) {
    return {
      nutriscore: 'A',
      logoNutriscore: 'https://static.openfoodfacts.org/images/attributes/dist/nutriscore-a-new-en.svg',
    };
  }

  const energyScore = calculateEnergyScoreForBeverages(energy);
  const sugarScore = calculateSugarScoreForBeverages(sugar);
  const saturatedFatsScore = calculateSaturatedFatsScore(saturatedFats);
  const sodiumScore = calculateSodiumScore(sodium);

  const fibersScore = calculateFibersScore(fibers);
  const proteinsScore = calculateProteinsScoreForBeverages(proteins);
  const fruitsScore = calculateFruitsScoreForBeverages(fruitsPercentage);

  let nScore = energyScore + sugarScore + saturatedFatsScore + sodiumScore;
  if (containsEdulcorants) nScore += 4;

  const pScore = fibersScore + proteinsScore + fruitsScore;
  const finalScore = nScore - pScore;

  return getNutriscoreGradeGeneric(finalScore, [2, 6, 9], ['B', 'C', 'D', 'E']);
}

// Barèmes Nutri-Score 2025
// Énergie (kJ/100g) - Conversion kcal → kJ (× 4.184)
function calculateEnergyScore(energy: number) {
  return energy <= 335 ? 0 : Math.min(10, Math.ceil((energy - 335) / 335));
}
// Énergie pour matières grasses (kJ/100g)
function calculateEnergyScoreForFats(energy: number) {
  return energy <= 120 ? 0 : Math.min(10, Math.ceil((energy - 120) / 120));
}
// Énergie pour boissons (kJ/100g)
function calculateEnergyScoreForBeverages(energy: number) {
  return energy <= 30 ? 0 : Math.min(10, Math.ceil((energy - 30) / 60));
}

// Sucre (g/100g) - Produits généraux
function calculateGeneralSugarScore(sugar: number) {
  if (sugar <= 3.4) return 0;
  if (sugar <= 6.8) return 1;
  if (sugar <= 10) return 2;
  if (sugar <= 14) return 3;
  if (sugar <= 17) return 4;
  if (sugar <= 20) return 5;
  if (sugar <= 24) return 6;
  if (sugar <= 27) return 7;
  if (sugar <= 31) return 8;
  if (sugar <= 34) return 9;
  if (sugar <= 37) return 10;
  if (sugar <= 41) return 11;
  if (sugar <= 44) return 12;
  if (sugar <= 48) return 13;
  if (sugar <= 51) return 14;
  return 15;
}
// Sucre (g/100g) - Boissons
function calculateSugarScoreForBeverages(sugar: number) {
  if (sugar <= 0.5) return 0;
  if (sugar <= 2) return 1;
  if (sugar <= 3.5) return 2;
  if (sugar <= 5) return 3;
  if (sugar <= 6) return 4;
  if (sugar <= 7) return 5;
  if (sugar <= 8) return 6;
  if (sugar <= 9) return 7;
  if (sugar <= 10) return 8;
  if (sugar <= 11) return 9;
  return 10;
}

// Acides gras saturés (g/100g)
function calculateSaturatedFatsScore(val: number) {
  return Math.min(10, Math.floor(val));
}
// Ratio acides gras saturés/total (%) - Matières grasses
function calculateSatFatRatioScore(ratio: number) {
  return Math.min(10, Math.floor((ratio - 10) / 6));
}
// Sodium (mg/100g) - Limité à 20 points max
function calculateSodiumScore(val: number) {
  return Math.min(20, Math.floor(val / 90));
}
// Fibres (g/100g)
function calculateFibersScore(val: number) {
  if (val <= 3) return 0;
  if (val <= 4.1) return 1;
  if (val <= 5.2) return 2;
  if (val <= 6.3) return 3;
  if (val <= 7.4) return 4;
  return 5;
}
// Protéines (g/100g) - Produits généraux
function calculateProteinsScore(val: number) {
  if (val <= 2.4) return 0;
  if (val <= 4.8) return 1;
  if (val <= 7.2) return 2;
  if (val <= 9.6) return 3;
  if (val <= 12) return 4;
  if (val <= 14) return 5;
  if (val <= 17) return 6;
  return 7;
}
// Protéines (g/100g) - Boissons
function calculateProteinsScoreForBeverages(val: number) {
  if (val <= 1.2) return 0;
  if (val <= 1.5) return 1;
  if (val <= 1.8) return 2;
  if (val <= 2.1) return 3;
  if (val <= 2.4) return 4;
  if (val <= 2.7) return 5;
  if (val <= 3) return 6;
  return 7;
}
// Fruits, légumes, légumineuses et fruits à coque (%)
function calculateFruitsScore(val: number) {
  if (val <= 40) return 0;
  if (val <= 60) return 1;
  if (val <= 80) return 2;
  return 5;
}
// Fruits, légumes, légumineuses et fruits à coque (%) - Boissons
function calculateFruitsScoreForBeverages(val: number) {
  if (val <= 40) return 0;
  if (val <= 60) return 2;
  if (val <= 80) return 4;
  return 6;
}

// Conversion du score final en lettre Nutri-Score
// thresholds: seuils de classification (score ≤ seuil)
// letters: lettres correspondantes (A, B, C, D, E)
function getNutriscoreGradeGeneric(score: number, thresholds: number[], letters: string[] = ['A', 'B', 'C', 'D', 'E']) {
  for (let i = 0; i < thresholds.length; i++) {
    if (score <= thresholds[i]) {
      return {
        nutriscore: letters[i],
        logoNutriscore: `https://static.openfoodfacts.org/images/attributes/dist/nutriscore-${letters[
          i
        ].toLowerCase()}-new-en.svg`,
      };
    }
  }
  return {
    nutriscore: letters[letters.length - 1],
    logoNutriscore: `https://static.openfoodfacts.org/images/attributes/dist/nutriscore-${letters[
      letters.length - 1
    ].toLowerCase()}-new-en.svg`,
  };
}
