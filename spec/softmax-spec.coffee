softmax = require("../lib/softmax")

describe "golden combat park", ->
  describe "softmax", ->
    it "is empty for empty", ->
      expect(softmax []).toEqual []
    it "is 1 when only has one number", ->
      expect(softmax [0]).toEqual [1]
      expect(softmax [1]).toEqual [1]
      expect(softmax [-1]).toEqual [1]
    describe "invalid value", ->
      it "is infinity, and beyond", ->
        expect(-> softmax [Infinity]).toThrow "Invalid argument specified: null"
        expect(-> softmax [-Infinity]).toThrow "Invalid argument specified: null"
      it "is max value", ->
        expect(-> softmax [Number.MAX_VALUE]).toThrow "Invalid argument specified: " + Number.MAX_VALUE
        expect(-> softmax [-Number.MAX_VALUE]).toThrow "Invalid argument specified: " + -Number.MAX_VALUE
      it "is a string", ->
        expect(-> softmax ["string value"]).toThrow "Invalid argument specified: \"string value\""
      it "is a function", ->
        expect(-> softmax [softmax]).toThrow "Invalid argument specified: undefined"
      it "is an object", ->
        expect(-> softmax [{}]).toThrow "Invalid argument specified: {}"
      it "is a date", ->
        birth = new Date("1975-05-28T01:02:03");
        expect(-> softmax [birth]).toThrow "Invalid argument specified: \"1975-05-28T01:02:03.000Z\""
      it "is a boolean", ->
        expect(-> softmax [true]).toThrow "Invalid argument specified: true"
      it "is null", ->
        expect(-> softmax [null]).toThrow "Invalid argument specified: null"
      it "is undefined", ->
        expect(-> softmax [undefined]).toThrow "Invalid argument specified: undefined"
    describe "even distribution", ->
      it "has two of the matching values", ->
          expect(softmax [0, 0]).toEqual [1/2, 1/2]
      it "has three matching values", ->
          expect(softmax [0, 0, 0]).toEqual [1/3, 1/3, 1/3]
    it "sums to 1", ->
      maxed = softmax([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      # Precision of numbers are not exact
      expect(maxed.reduce (a, b) -> a + b).toBeCloseTo 1, 14
    describe "vectors", ->
      it "has positive numbers", ->
        expect(softmax [1, 2]).toEqual [0.2689414213699951, 0.7310585786300048]
      it "has negative numbers", ->
        expect(softmax [-2, -1]).toEqual [0.26894142136999505, 0.7310585786300048]
      it "has positive and negative numbers", ->
        expect(softmax [-1, 1]).toEqual [0.11920292202211759, 0.8807970779778824]
      it "has fractional positive and negative numbers", ->
        expect(softmax [-0.1,0.1]).toEqual [0.4501660026875221, 0.549833997312478]
