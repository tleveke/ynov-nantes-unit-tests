const { Shop, Item } = require("../src/gilded_rose");

const itemMock = (...params) => new Item(...params);
const shopMock = (...params) => new Shop(...params);

describe("Gilded Rose", function () {

  //Introduction of Gilded Rose
  describe("Item classic", () => {
    it("should have a name", () => {
      const item = itemMock("+5 Dexterity Vest", 10, 20);
      expect(item.name).toBe("+5 Dexterity Vest");
    });
    it("should have a sellIn", () => {
      const item = itemMock("+5 Dexterity Vest", 10, 20);
      expect(item.sellIn).toBe(10);
    });
    it("should have a quality", () => {
      const item = itemMock("+5 Dexterity Vest", 10, 20);
      expect(item.quality).toBe(20);
    });
    it("should quality decrease by 1 when one day pass", () => {
      const shop = shopMock([itemMock("+5 Dexterity Vest", 10, 20)]);
      shop.updateQuality();
      expect(shop.items[0].quality).toBe(19);
    });
  });

  // Une fois que la date de péremption est passée, la qualité se dégrade deux fois plus rapidement.
  describe("Every item must have a sellIn value", () => {

    [10,-5,0].forEach(sellIn => {
      it(`should have a sellIn ${sellIn} value`, () => {
        let qualityOld = 20;
        let qualityDiff = 0;
  
        const gildedRose = shopMock([itemMock("Item", sellIn, qualityOld)]);
  
        for (let i = 0; i < 100; i++) {
          gildedRose.updateQuality();
  
          qualityDiff = qualityOld - gildedRose.items[0].quality;
  
          if (gildedRose.items[0].sellIn < 0 && gildedRose.items[0].quality !== 0) {
            expect(qualityDiff).toBeGreaterThanOrEqual(2);
          }
  
          qualityOld = gildedRose.items[0].quality;
        };
      });
    });
  });
  //La qualité (quality) d'un produit ne peut jamais être négative.
  describe("Quality cannot be negative", () => {
    [10,-1,0].forEach(quality => {
      it(`should have a quality ${quality} value`, () => {
        let shop = shopMock([itemMock("Item", 10, quality)]);
        shop.updateQuality();
        expect(shop.items[0].quality).toBeGreaterThanOrEqual(0);
      });
    });
  });


  // "Aged Brie" augmente sa qualité (quality) plus le temps passe.
  describe("Aged Brie", () => {
    it("quality of an item increases with time", function () {
      const gildedRose = shopMock([itemMock("Aged Brie", 25, 1)]);
      let qualityOld = 0;
      for (let i = 0; i < 50; i += 2) {
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBeGreaterThan(qualityOld);
        qualityOld = items[0].quality;
      };
    });
    it("should quality increase by 1 when last day pass", () => {
      const shop = shopMock([itemMock("Aged Brie", -1, 20)]);
      shop.updateQuality();
      expect(shop.items[0].quality).toBe(22);
    });
  });

  // La qualité d'un produit n'est jamais de plus de 50.
  describe("Quality cannot be greater than 50", () => {

    [100,45,50].forEach(quality => {
      it(`should have a quality ${quality} value`, () => {
        let shop = shopMock([itemMock("Item", 10, quality)]);
        shop.updateQuality();
        expect(shop.items[0].quality).toBeLessThanOrEqual(50);
      });
    });

    it("quality of an item increases with time not greater than 50 with Aged Brie Item", function () {
      const gildedRose = shopMock([itemMock("Aged Brie", 100, 1)]);
      for (let i = 0; i < 100; i++) {
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBeLessThanOrEqual(50);
      };
    });
  });

  // "Sulfuras", étant un objet légendaire, n'a pas de date de péremption et ne perd jamais en qualité (quality)
  describe("Sulfuras", () => {
    it("should haven't sellIn and never change quality", () => {
      let quality = 50;
      const gildedRose = shopMock([itemMock("Sulfuras, Hand of Ragnaros", null, quality)]);

      for (let i = 0; i < 100; i++) {
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(quality);
        expect(gildedRose.items[0].sellIn).toBe(null);
      };
    });
  });
  // "Backstage passes", comme le "Aged Brie", augmente sa qualité (quality) plus le temps passe (sellIn) ; La qualité augmente de 2
  // quand il reste 10 jours ou moins et de 3 quand il reste 5 jours ou moins, mais la qualité tombe à 0 après le concert.
  describe("Backstage passes", () => {

    
    it("when concert finished", () => {
      let qualityOld = 35;
      let qualityDiff = 0;

      const gildedRose = shopMock([itemMock("Backstage passes to a TAFKAL80ETC concert", 15, qualityOld)]);

      for (let i = 0; i < 16; i++) {

        gildedRose.updateQuality();
        qualityDiff = gildedRose.items[0].quality - qualityOld;
        if (gildedRose.items[0].quality !== 50) {

          switch (qualityDiff) {
            case 0:
              expect(gildedRose.items[0].sellIn).toBeLessThanOrEqual(0);
              break;
          }
        }
        qualityOld = gildedRose.items[0].quality;
      };
    });

    it("when there are more 10 days", () => {
      let qualityOld = 10;
      let qualityDiff = 0;

      const gildedRose = shopMock([itemMock("Backstage passes to a TAFKAL80ETC concert", 15, qualityOld)]);

      for (let i = 0; i < 16; i++) {

        gildedRose.updateQuality();
        qualityDiff = gildedRose.items[0].quality - qualityOld;
        if (gildedRose.items[0].quality !== 50) {

          switch (qualityDiff) {
            case 1:
              expect(gildedRose.items[0].sellIn).toBeGreaterThan(10);
              break;
          }
        }
        qualityOld = gildedRose.items[0].quality;
      };
    });
    it("when there are 10 days or less", () => {
      let qualityOld = 10;
      let qualityDiff = 0;

      const gildedRose = shopMock([itemMock("Backstage passes to a TAFKAL80ETC concert", 15, qualityOld)]);

      for (let i = 0; i < 16; i++) {

        gildedRose.updateQuality();
        qualityDiff = gildedRose.items[0].quality - qualityOld;
        if (gildedRose.items[0].quality !== 50) {

          switch (qualityDiff) {
            case 2:
              expect(gildedRose.items[0].sellIn).toBeLessThanOrEqual(10);
              break;
          }
        }
        qualityOld = gildedRose.items[0].quality;
      };
    });

    it("when there are 5 days or less", () => {
      let qualityOld = 10;
      let qualityDiff = 0;

      const gildedRose = shopMock([itemMock("Backstage passes to a TAFKAL80ETC concert", 15, qualityOld)]);

      for (let i = 0; i < 16; i++) {

        gildedRose.updateQuality();
        qualityDiff = gildedRose.items[0].quality - qualityOld;
        if (gildedRose.items[0].quality !== 50) {

          switch (qualityDiff) {
            case 3:
              expect(gildedRose.items[0].sellIn).toBeLessThanOrEqual(5);
              break;
          }
        }
        qualityOld = gildedRose.items[0].quality;
      };
    });
  });

  // les éléments "Conjured" voient leur qualité se dégrader de deux fois plus vite que les objets normaux.
  describe("Conjured", () => {
    it("should decrease quality by 2", () => {
      let qualityOld = 25;
      let qualityDiff = 0;

      const gildedRose = shopMock([itemMock("Conjured", 10, qualityOld)]);

      for (let i = 0; i < 16; i++) {
        gildedRose.updateQuality();
        qualityDiff = gildedRose.items[0].quality - qualityOld;
        if (gildedRose.items[0].quality !== 0) {
          expect(qualityDiff).toBe(-2);
        }
        qualityOld = gildedRose.items[0].quality;
      };
    });
  });


});


//Liste Spécifications
// ✓ Une fois que la date de péremption est passée, la qualité se dégrade deux fois plus rapidement. ✓
// ✓ La qualité (quality) d'un produit ne peut jamais être négative. ✓
// ✓ "Aged Brie" augmente sa qualité (quality) plus le temps passe. ✓
// ✓ La qualité d'un produit n'est jamais de plus de 50. ✓
// ✓ "Sulfuras", étant un objet légendaire, n'a pas de date de péremption et ne perd jamais en qualité (quality) ✓
// ✓ "Backstage passes", comme le "Aged Brie", augmente sa qualité (quality) plus le temps passe (sellIn) ; La qualité augmente de 2 ✓
// ✓ quand il reste 10 jours ou moins et de 3 quand il reste 5 jours ou moins, mais la qualité tombe à 0 après le concert. ✓
// ✓ les éléments "Conjured" voient leur qualité se dégrader de deux fois plus vite que les objets normaux. ✓
