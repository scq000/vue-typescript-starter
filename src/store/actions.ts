import shop from './api/shop';

const actions = {};

export const getAllProducts = ({ commit }) => {
  commit('REQUEST_PRODUCTS');
  shop.getProducts((products) => {
    commit('RECEIVE_PRODUCTS', products);
  });
};

export default actions;
