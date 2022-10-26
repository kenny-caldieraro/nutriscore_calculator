# Nutriscore calculator

This is a calculator for the Nutriscore, a French nutrition label.

![Nutriscore](https://raw.githubusercontent.com/openfoodfacts/openfoodfacts-server/master/html/images/misc/nutriscore-a.svg)

## Installation

The package is available on NPM

Require or import the package

```js
const nutriscore = require('nutriscore');
```

## Usage

```js
const nutriscore = require('nutriscore');

const score = nutriscore({
  energy: 1000, // in kJ
  saturatedFats: 1, // in g
  sugar: 10, // in g
  fibers: 2, // in g
  proteins: 7, // in g
  sodium: 0.1, // in g
  fruitsPercentage: 40, // in %
});

console.log(score); /* 
Object { 
    nutriscore: "A",  
    logoNutriscore: "https://raw.githubusercontent.com/openfoodfacts/openfoodfacts-server/master/html/images/misc/nutriscore-a.svg" 
    }
*/
```

## Information

Energy is in kJ, is you want to use kcal, you need to divide by 4.184.<br />
Fibers, proteins, saturated fats, sodium and sugar are on "g" (grams).<br >Fruits percentage is on "%".

## Sources

- [Nutriscore](https://fr.openfoodfacts.org/nutriscore)
  
![Nutriscore](https://quoidansmonassiette.fr/wp-content/uploads/2018/05/Infographie-calcul-nutriscore-logo-nutritionnel-score-corrig%C3%A9-scaled.jpg)

