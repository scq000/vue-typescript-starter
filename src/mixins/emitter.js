// import Vue from 'vue';

// export default class EventMixin extends Vue {
//
//   dispatch(componentName: string, eventName: string, params: any) {
//     let parent = this.$parent || this.$root;
//     let name = parent.$options.name;
//
//     while(parent && (!name || name !== componentName)) {
//       parent = parent.$parent;
//       if(parent) {
//         name = parent.$options.name;
//       }
//     }
//
//     if(parent) {
//       parent.$emit.apply(parent, [eventName].concat(params));
//     }
//   }
//
//   broadcast(componentName: string, eventName: string, params: any) {
//     this.$children.forEach((child) => {
//       const name = child.$options.name;
//       if(name) {
//         child.$emit.apply(child, [eventName].concat(params));
//       }else {
//         this.broadcast.apply(child, [componentName, eventName].concat(params));
//       }
//     });
//   }
// }

function broadcast(componentName, eventName, params) {
  this.$children.forEach((child) => {
    const name = child.$options.componentName;

    if (name === componentName) {
      child.$emit(eventName, ...params);
    } else {
      broadcast(child, eventName, ...params);
    }
  });
}

export default {
  methods: {
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit(eventName, ...params);
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    },
  },
};
