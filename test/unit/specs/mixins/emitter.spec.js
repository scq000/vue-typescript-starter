import { createVue, destroyVM } from '../../vm';

describe('EventMixin', () => {
  let vm;

  it('should render correct contents', () => {
    vm = createVue({
      template: `
        <el-button>hello</el-button>
      `,
    }, true);
    expect(vm.$el.classList.contains('el-button')).to.equal(true);
  });

  afterEach(() => {
    destroyVM(vm);
  });
});
