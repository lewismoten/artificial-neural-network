softmax = require("../lib/softmax")

describe "softmax", ->
  it "is empty for empty", ->
    expect(softmax []).toEqual []
  it "is 1 when only has one number", ->
    x = (Math.random() * 20) - 10
    expect(softmax [x]).toEqual [1]
  describe "edge cases", ->
    message = "softmax only accepts numbers above -Number.MAX_VALUE and below Number.MAX_VALUE"
    it "is infinity, and beyond", ->
      expect(-> softmax [Infinity]).toThrow message
      expect(-> softmax [-Infinity]).toThrow message
    it "is max value", ->
      expect(-> softmax [Number.MAX_VALUE]).toThrow message
      expect(-> softmax [-Number.MAX_VALUE]).toThrow message
    it "is a string", ->
      expect(-> softmax ["string value"]).toThrow message
    it "is a function", ->
      expect(-> softmax [expect ]).toThrow message
    it "is an object", ->
      expect(-> softmax [{}]).toThrow message
    it "is a date", ->
      expect(-> softmax [new Date()]).toThrow message
    it "is a boolean", ->
      expect(-> softmax [true]).toThrow message
    it "is null", ->
      expect(-> softmax [null]).toThrow message
    it "is undefined", ->
      expect(-> softmax [undefined]).toThrow message
  it "same values have same normalized values", ->
    nums = [];
    x = (Math.random() * 20) - 10
    nums[i] = x for i in [0...25]
    maxed = softmax(nums)
    expect(maxed.filter (a) -> a != maxed[0]).toEqual []
  it "sums to 1", ->
    nums = [];
    nums[i] = (Math.random() * 20) - 10 for i in [0...25]
    maxed = softmax(nums)
    # Precision of numbers are not exact
    expect(maxed.reduce (a, b) -> a + b).toBeCloseTo 1, 14
  describe "vectors", ->
    it "has positive numbers", ->
      expect(softmax [0, 1, 2]).toEqual [
        0.09003057317038046,
        0.24472847105479764,
        0.6652409557748219
        ]
    it "has negative numbers", ->
      expect(softmax [0, -1, -2]).toEqual [
        0.6652409557748218,
        0.24472847105479767,
        0.09003057317038046
      ]
    it "has positive and negative numbers", ->
      expect(softmax [-10, 10]).toEqual [
        2.0611536181902046e-9,
        0.9999999979388463
        ]
    it "has fractional positive and negative numbers", ->
      expect(softmax [-0.1,0,0.1]).toEqual [
        0.3006096053557273,
        0.3322249935333473,
        0.36716540111092555
        ]
    it "has very fractional numbers", ->
      expect(softmax [
        0.3006096053557273,
        0.3322249935333473,
        0.36716540111092555
        ]).toEqual [
        0.3224827496671604,
        0.33284104496828243,
        0.3446762053645571
        ]
    it "has lots of postiive and negative numbers", ->
      expect(softmax [
        10,9,8,7,6,5,4,3,2,1,0,-1,-2,-3,-4,-5,-6,-7,-8,-9,-10]).toEqual [
        0.6321205593078669,
        0.2325441581111576,
        0.08554821493361621,
        0.03147142950299316,
        0.01157769189842757,
        0.004259194825648669,
        0.001566870212299931,
        0.000576419338089078,
        0.00021205282397662265,
        0.00007800987438334617,
        0.000028698228993999803,
        0.000010557488444922733,
        0.000003883882949292134,
        0.0000014288006889608839,
        5.256263990003017e-7,
        1.9336714592918854e-7,
        7.113579758534663e-8,
        2.616939746298215e-8,
        9.627183314475235e-9,
        3.5416428177841837e-9,
        1.3028975806352978e-9
        ]
