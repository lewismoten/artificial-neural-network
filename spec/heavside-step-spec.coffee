heavsideStep = require("../lib/heavside-step")

describe "golden combat park", ->
  describe "heavside step", ->
    it "is 0 for negative values", ->
      expect(heavsideStep(-.1)).toEqual(0)
      expect(heavsideStep(-1)).toEqual(0)
      expect(heavsideStep(-10)).toEqual(0)
      expect(heavsideStep(-100)).toEqual(0)
      expect(heavsideStep(-Number.MIN_VALUE)).toEqual(0)
      expect(heavsideStep(-Number.MAX_VALUE)).toEqual(0)
      expect(heavsideStep(-Infinity)).toEqual(0)
    it "is 1 for positive values", ->
      expect(heavsideStep(.1)).toEqual(1)
      expect(heavsideStep(1)).toEqual(1)
      expect(heavsideStep(10)).toEqual(1)
      expect(heavsideStep(100)).toEqual(1)
      expect(heavsideStep(Number.MIN_VALUE)).toEqual(1)
      expect(heavsideStep(Number.MAX_VALUE)).toEqual(1)
      expect(heavsideStep(Infinity)).toEqual(1)
    it "is 0.5 for zero", ->
      expect(heavsideStep(0)).toEqual(0.5)
      expect(heavsideStep(-0)).toEqual(0.5)
