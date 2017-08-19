import { formatNum, newCode, compareData, getDay, calcMul, calcAdd, setStore, getStore } from '@/utils/share';

describe('Share', () => {
  describe('#formatNum', () => {
    it('Given 1,2 then return 01', () => {
      expect(formatNum(1, 2)).to.equal('01');
    });

    it('Given 12,2 then return 12', () => {
      expect(formatNum(12, 2)).to.equal('12');
    });
  });

  describe('#newCode', () => {
    it('Given 2234 then return 2235', () => {
      expect(newCode('2234')).to.equal('2235');
    });
  });

  describe('#calMul', () => {
    it('Given 1.2,2 then 2.4', () => {
      expect(calcMul(1.2, 2)).to.equal(2.4);
    });
  });

  describe('#calAdd', () => {
    it('Given 1.2,2 then 3.2', () => {
      expect(calcAdd(1.2, 2)).to.equal(3.2);
    });
  });

  describe('获取本地缓存#getStore', () => {
    it('先设置值，再获取', () => {
      setStore('test', 'hello');
      expect(getStore('test')).to.equal('hello');
    });
  });

  describe('日期#getDay', () => {
    it('给定日期上加天数 ', () => {
      expect(getDay(1, '2017-08-20')).to.equal('2017-08-21');
    });

    it('给定日期上减天数 ', () => {
      expect(getDay(-1, '2017-08-01')).to.equal('2017-07-31');
    });
  });

  describe('#compareData', () => {
    it('compare array ', () => {
      expect(compareData([1, 2, 3], [1, 2, 3])).to.equal(true);
      expect(compareData([1, 2, 3], [1, 2])).to.equal(false);
    });

    it('compare object', () => {
      expect(compareData({ a: '1', b: 2, c: { d: [1, 2, 3] } }, { a: '1', b: 2, c: { d: [1, 2, 3] } })).to.equal(true);
    });
  });
});
