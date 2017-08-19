import { mutations } from '@/store/index.ts';

describe('Store:Mutaions', () => {
  it('#increment', () => {
    const state = { count: 0 };
    mutations.increment(state);
    expect(state.count).to.equal(1);
  });
});
