import currency from '@/utils/currency';

describe('Currency', () => {
  it('格式化货币', () => {
    expect(currency(12, '¥', 2, 1)).to.equal('¥12.00');
  });
});
