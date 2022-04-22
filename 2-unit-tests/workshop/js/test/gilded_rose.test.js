const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("fixme");
  });
  
  // La qualité (quality) d'un produit ne peut jamais être négative.
  it("quality of an item can't be negative", function() {
    const gildedRose = new Shop([new Item("foo", 0, -1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  // La qualité d'un produit n'est jamais de plus de 50.
  it("quality of an item can't be more than 50", function() {
    const gildedRose = new Shop([new Item("foo", 0, 100)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  // "Aged Brie" augmente sa qualité (quality) plus le temps passe.
  it("quality of an item increases with time", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 1)]);
    let qualityOld = 0;
    for (let i = 0; i < 50; i+=2) {
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBeGreaterThan(qualityOld);
      qualityOld = items[0].quality;
    };
  });


  
});


//Liste Spécifications
// Une fois que la date de péremption est passée, la qualité se dégrade deux fois plus rapidement.
// ✓ La qualité (quality) d'un produit ne peut jamais être négative. ✓
// "Aged Brie" augmente sa qualité (quality) plus le temps passe.
// ✓ La qualité d'un produit n'est jamais de plus de 50. ✓
// "Sulfuras", étant un objet légendaire, n'a pas de date de péremption et ne perd jamais en qualité (quality)
// "Backstage passes", comme le "Aged Brie", augmente sa qualité (quality) plus le temps passe (sellIn) ; La qualité augmente de 2 
// quand il reste 10 jours ou moins et de 3 quand il reste 5 jours ou moins, mais la qualité tombe à 0 après le concert.
// les éléments "Conjured" voient leur qualité se dégrader de deux fois plus vite que les objets normaux.
