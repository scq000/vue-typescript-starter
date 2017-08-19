const inject = require('inject-loader!babel-loader!@/store/actions.ts');

const actions = inject({
  './api/shop': {
    getProducts(cb) {
      setTimeout(() => {
        cb([]);
      }, 100);
    },
  },
});

const testAction = (action, args, state, expectedMutations, done) => {
  let count = 0;

  // 模拟提交
  const commit = (type, payload) => {
    const mutation = expectedMutations[count];

    try {
      expect(mutation.type).to.equal(type);
      if (payload) {
        expect(mutation.payload).to.deep.equal(payload);
      }
    } catch (error) {
      done(error);
    }

    count++;
    if (count >= expectedMutations.length) {
      done();
    }
  };

  // 用模拟的 store 和参数调用 action
  action({ commit, state }, ...args);

  // 检查是否没有 mutation 被 dispatch
  if (expectedMutations.length === 0) {
    expect(count).to.equal(0);
    done();
  }
};

describe('Actions', () => {
  it('getAllProducts', (done) => {
    testAction(actions.getAllProducts, [], {}, [
      { type: 'REQUEST_PRODUCTS' },
      { type: 'RECEIVE_PRODUCTS', payload: [] },
    ], done);
  });
});
