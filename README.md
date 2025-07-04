# Calculateur Nutri-Score 2025

Calculateur TypeScript pour le Nutri-Score 2025, le logo nutritionnel français.

![Nutri-Score](https://static.openfoodfacts.org/images/attributes/dist/nutriscore-a-new-en.svg)

## 🚀 Installation

Le package est disponible sur NPM

```bash
npm install nutriscore-2025
```

## 📦 Utilisation

### Import ES6

```typescript
import calculeNutriscore, { ProductCategory, Nutriscore } from 'nutriscore-2025';
```

### Require CommonJS

```javascript
const nutriscore = require('nutriscore-2025');
```

## 🍎 Exemples d'utilisation

### Produit général

```typescript
const nutriments: Nutriscore = {
  energy: 100, // en kcal/100g
  fibers: 8, // en g/100g
  proteins: 15, // en g/100g
  saturatedFats: 0.5, // en g/100g
  sodium: 50, // en mg/100g
  sugar: 2, // en g/100g
  fruitsPercentage: 80, // en % (0-100)
};

const result = calculeNutriscore(nutriments);
console.log(result);
// { nutriscore: "A", logoNutriscore: "https://static.openfoodfacts.org/images/attributes/dist/nutriscore-a-new-en.svg" }
```

### Viande rouge

```typescript
const viandeRouge: Nutriscore = {
  energy: 200,
  fibers: 0,
  proteins: 25,
  saturatedFats: 5,
  sodium: 300,
  sugar: 0,
  fruitsPercentage: 0,
  category: ProductCategory.GENERAL,
  isRedMeat: true,
  ferHeminique: 0.5, // en mg/100g
};

const result = calculeNutriscore(viandeRouge);
```

### Boisson avec édulcorants

```typescript
const boisson: Nutriscore = {
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

const result = calculeNutriscore(boisson);
```

### Eau

```typescript
const eau: Nutriscore = {
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

const result = calculeNutriscore(eau); // Toujours "A"
```

### Matières grasses

```typescript
const huile: Nutriscore = {
  energy: 100,
  fibers: 2,
  proteins: 5,
  saturatedFats: 8,
  sodium: 200,
  sugar: 1,
  fruitsPercentage: 10,
  category: ProductCategory.FATS,
  totalFats: 20, // requis pour calculer le ratio acides gras saturés/total
};

const result = calculeNutriscore(huile);
```

## 📊 Catégories de produits

L'algorithme supporte 4 catégories avec des règles spécifiques :

- **GENERAL** : Produits alimentaires généraux
- **FATS** : Matières grasses (huiles, beurres, etc.)
- **CHEESE** : Fromages
- **BEVERAGES** : Boissons

## 🔧 Fonctionnalités

### ✅ Validation des données

- Vérification des valeurs négatives
- Normalisation automatique des valeurs
- Gestion des cas limites

### 🥩 Règles spéciales

- **Viandes rouges** : Limitation du score protéines si fer héminique < 1 mg/100g
- **Édulcorants** : +4 points pour les boissons contenant des édulcorants
- **Eau** : Score A automatique

### 📈 Calculs optimisés

- Conversion automatique kcal → kJ (× 4.184)
- Calcul du ratio acides gras saturés/total pour les matières grasses
- Seuils de classification adaptés par catégorie

## 📋 Format des données

| Champ                 | Type             | Unité     | Description                                     |
| --------------------- | ---------------- | --------- | ----------------------------------------------- |
| `energy`              | number           | kcal/100g | Énergie (convertie automatiquement en kJ)       |
| `fibers`              | number           | g/100g    | Fibres alimentaires                             |
| `proteins`            | number           | g/100g    | Protéines                                       |
| `saturatedFats`       | number           | g/100g    | Acides gras saturés                             |
| `sodium`              | number           | mg/100g   | Sodium                                          |
| `sugar`               | number           | g/100g    | Sucres                                          |
| `fruitsPercentage`    | number           | %         | Fruits, légumes, légumineuses et fruits à coque |
| `totalFats`           | number?          | g/100g    | Matières grasses totales (requis pour FATS)     |
| `category`            | ProductCategory? | -         | Catégorie du produit                            |
| `isRedMeat`           | boolean?         | -         | Viande rouge                                    |
| `ferHeminique`        | number?          | mg/100g   | Fer héminique (pour viandes rouges)             |
| `containsEdulcorants` | boolean?         | -         | Contient des édulcorants                        |
| `isWater`             | boolean?         | -         | Eau                                             |

## 🧪 Tests

```bash
npm test
```

## 📚 Sources

- [Nutri-Score - Santé publique France](https://www.santepubliquefrance.fr/determinants-de-sante/nutrition-et-activite-physique/articles/nutri-score)
- [Open Food Facts](https://fr.openfoodfacts.org/nutriscore)
- [Commission européenne - Nutri-Score](https://ec.europa.eu/food/safety/labelling_nutrition/nutritional_profiles_food_en)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

- Signaler des bugs
- Proposer des améliorations
- Ajouter des tests
- Mettre à jour la documentation

## 📄 Licence

MIT
