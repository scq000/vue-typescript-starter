// Base mixin
import Vue from 'vue';
import Component from 'vue-class-component';
import components from '../components';
import templates from '../templates';
import { mapGetters, mapActions } from 'vuex';

@Component({
  computed: mapGetters({
    tab: 'tab',
    $user: 'user',
  }),
  methods: {
    ...mapActions(['removeTab']),
  },
})
export class Base extends Vue {
  eventBus = new Vue();
  cloneData = {};

  components = Object.assign(components, templates);
}
