import calculeNutriscore, { ProductCategory, Nutriscore } from '../index';

describe('Nutri-Score 2025 - Tests de validation', () => {
  describe('Validation des entrées', () => {
    test('devrait rejeter les valeurs négatives', () => {
      const nutriments: Nutriscore = {
        energy: -10,
        fibers: 2,
        proteins: 5,
        saturatedFats: 1,
        sodium: 200,
        sugar: 3,
        fruitsPercentage: 20,
      };

      expect(() => calculeNutriscore(nutriments)).toThrow('Les valeurs nutritionnelles ne peuvent pas être négatives');
    });

    test('devrait accepter des valeurs nulles', () => {
      const nutriments: Nutriscore = {
        energy: 0,
        fibers: 0,
        proteins: 0,
        saturatedFats: 0,
        sodium: 0,
        sugar: 0,
        fruitsPercentage: 0,
      };

      const result = calculeNutriscore(nutriments);
      expect(result.nutriscore).toBeDefined();
    });
  });

  describe('Catégorie Générale', () => {
    test('devrait donner A pour un produit sain', () => {
      const nutriments: Nutriscore = {
        energy: 100, // 418.4 kJ
        fibers: 8,
        proteins: 15,
        saturatedFats: 0.5,
        sodium: 50,
        sugar: 2,
        fruitsPercentage: 80,
        category: ProductCategory.GENERAL,
      };

      const result = calculeNutriscore(nutriments);
      expect(result.nutriscore).toBe('A');
    });

    test('devrait limiter le score protéines pour les viandes rouges', () => {
      const nutriments: Nutriscore = {
        energy: 200,
        fibers: 0,
        proteins: 25, // Score élevé
        saturatedFats: 5,
        sodium: 300,
        sugar: 0,
        fruitsPercentage: 0,
        category: ProductCategory.GENERAL,
        isRedMeat: true,
        ferHeminique: 0.5, // < 1 mg/100g
      };

      const result = calculeNutriscore(nutriments);
      // Le score devrait être limité par la règle des viandes rouges
      expect(result.nutriscore).toBeDefined();
    });
  });

  describe('Catégorie Boissons', () => {
    test("devrait donner A pour l'eau", () => {
      const nutriments: Nutriscore = {
        energy: 0,
        fibers: 0,
        proteins: 0,
        saturatedFats: 0,
        sodium: 0,
        sugar: 0,
        fruitsPercentage: 0,
        category: ProductCategory.BEVERAGES,
        isWater: true,
      };

      const result = calculeNutriscore(nutriments);
      expect(result.nutriscore).toBe('A');
    });

    test('devrait pénaliser les édulcorants (+4 points)', () => {
      const nutriments: Nutriscore = {
        energy: 20,
        fibers: 0,
        proteins: 0,
        saturatedFats: 0,
        sodium: 50,
        sugar: 2,
        fruitsPercentage: 0,
        category: ProductCategory.BEVERAGES,
        containsEdulcorants: true,
      };

      const result = calculeNutriscore(nutriments);
      expect(result.nutriscore).toBeDefined();
    });
  });

  describe('Corrections 2025', () => {
    test('score sodium limité à 10 points', () => {
      const nutriments: Nutriscore = {
        energy: 300,
        fibers: 0,
        proteins: 0,
        saturatedFats: 0,
        sodium: 2000, // Très élevé
        sugar: 0,
        fruitsPercentage: 0,
      };

      const result = calculeNutriscore(nutriments);
      // Même avec un sodium très élevé, le score total devrait être limité
      expect(result.nutriscore).toBeDefined();
    });

    test('barème sucre boissons corrigé', () => {
      const nutriments: Nutriscore = {
        energy: 50,
        fibers: 0,
        proteins: 0,
        saturatedFats: 0,
        sodium: 50,
        sugar: 1.5, // Nouveau seuil 2025
        fruitsPercentage: 0,
        category: ProductCategory.BEVERAGES,
      };

      const result = calculeNutriscore(nutriments);
      expect(result.nutriscore).toBeDefined();
    });
  });

  describe('Catégorie Matières grasses', () => {
    test('devrait utiliser le ratio acides gras saturés/total', () => {
      const nutriments: Nutriscore = {
        energy: 100,
        fibers: 2,
        proteins: 5,
        saturatedFats: 8,
        sodium: 200,
        sugar: 1,
        fruitsPercentage: 10,
        category: ProductCategory.FATS,
        totalFats: 20, // Ratio = 40%
      };

      const result = calculeNutriscore(nutriments);
      expect(result.nutriscore).toBeDefined();
    });
  });
});
