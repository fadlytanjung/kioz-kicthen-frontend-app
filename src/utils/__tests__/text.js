import * as text from '../text';

describe('Text Helpers', () => {
  describe('toLowerCase', () => {
    it('returns lower case text', () => {
      expect(text.toLowerCase('TES')).toEqual('tes');
    });
  });
});
