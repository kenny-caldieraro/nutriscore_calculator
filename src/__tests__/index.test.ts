import { expect, describe, it } from '@jest/globals';
import calculeNutriscore from '../index';

describe('nutriscore', () => {
  it('should return un object with two properties', () => {
    const nutriments = {
      energy: 1000,
      fibers: 1,
      proteins: 1,
      saturatedFats: 1,
      sodium: 1,
      sugar: 1,
      fruitsPercentage: 1,
    };
    const result = calculeNutriscore(nutriments);
    expect(result).toHaveProperty('nutriscore');
    expect(result).toHaveProperty('logoNutriscore');
  });
  it('should return a nutriscore A', () => {
    const nutriments = {
      energy: 154,
      fibers: 2.3,
      proteins: 10.5,
      saturatedFats: 5.7,
      sodium: 0.67,
      sugar: 2.8,
      fruitsPercentage: 0,
    };
    const result = calculeNutriscore(nutriments);
    expect(result.nutriscore).toBe('A');
  });
  it('should return a nutriscore B', () => {
    const nutriments = {
      energy: 120,
      fibers: 1.1,
      proteins: 5,
      saturatedFats: 2.9,
      sodium: 0.77,
      sugar: 1.2,
      fruitsPercentage: 0,
    };
    const result = calculeNutriscore(nutriments);
    expect(result.nutriscore).toBe('B');
  });
  it('should return a nutriscore C', () => {
    const nutriments = {
      energy: 165,
      fibers: 2.3,
      proteins: 6.1,
      saturatedFats: 10,
      sodium: 0.75,
      sugar: 1.6,
      fruitsPercentage: 0,
    };
    const result = calculeNutriscore(nutriments);
    expect(result.nutriscore).toBe('C');
  });
  it('should return a nutriscore D', () => {
    const nutriments = {
      energy: 395,
      fibers: 2.1,
      proteins: 2,
      saturatedFats: 42,
      sodium: 0,
      sugar: 2.2,
      fruitsPercentage: 0,
    };
    const result = calculeNutriscore(nutriments);
    expect(result.nutriscore).toBe('D');
  });
  it('should return a nutriscore E', () => {
    const nutriments = {
      energy: 1200,
      fibers: 1.1,
      proteins: 1,
      saturatedFats: 162,
      sodium: 5,
      sugar: 8.2,
      fruitsPercentage: 0,
    };
    const result = calculeNutriscore(nutriments);
    expect(result.nutriscore).toBe('E');
  });
  it('should return a nutriscore A with fruits', () => {
    const nutriments = {
      energy: 154,
      fibers: 2.3,
      proteins: 10.5,
      saturatedFats: 5.7,
      sodium: 0.67,
      sugar: 2.8,
      fruitsPercentage: 50,
    };
    const result = calculeNutriscore(nutriments);
    expect(result.nutriscore).toBe('A');
  });
  it('should return a URL for the logo', () => {
    const nutriments = {
      energy: 154,
      fibers: 2.3,
      proteins: 10.5,
      saturatedFats: 5.7,
      sodium: 0.67,
      sugar: 2.8,
      fruitsPercentage: 50,
    };
    const result = calculeNutriscore(nutriments);
    expect(result.logoNutriscore).toBe('https://static.openfoodfacts.org/images/misc/nutriscore-a.svg');
  });
  it('the url should be a string', () => {
    const nutriments = {
      energy: 154,
      fibers: 2.3,
      proteins: 10.5,
      saturatedFats: 5.7,
      sodium: 0.67,
      sugar: 2.8,
      fruitsPercentage: 50,
    };
    const result = calculeNutriscore(nutriments);
    expect(typeof result.logoNutriscore).toBe('string');
  });
});
