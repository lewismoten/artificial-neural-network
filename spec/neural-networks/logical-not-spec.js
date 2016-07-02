describe('Logical NOT', () =>
{

  let lib = require('../../lib');

  let network = lib.create(1, 1);
  network[0].weights = [
    [-1]
  ];
  network[1].biases = [0.5];
  network[1].activate = 'heaviside';

  describe('first input 0', () =>
  {

    network[0].values[0] = 0;

    describe('run', () =>
    {

      let result = lib.runner(network);

      describe('output', () =>
      {

        it('is 1', () =>
        {

          expect(result[0])
            .toBe(1);

        });

      });

    });

  });

  describe('first input 1', () =>
  {

    network[0].values[0] = 1;


    describe('run', () =>
    {

      let result = lib.runner(network);

      describe('output', () =>
      {

        it('is 1', () =>
        {

          expect(result[0])
            .toBe(0);

        });

      });

    });


  });

});
