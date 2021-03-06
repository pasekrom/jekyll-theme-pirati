import L from 'leaflet';

import Vue from 'vue';
import VueResource from 'vue-resource';

import IntentionMap from './IntentionMap.vue';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.use(VueResource);

const appFactory = (el, attrs) => {
  let colors = null;

  if (attrs.colors) {
    colors = attrs.colors.split(',').reduce((result, mapping) => {
      const [cat, color] = mapping.split(':');
      result[cat] = color;
      return result;
    }, {});
  }

  console.log(colors);

  // Bootstrap Vue.js.
  new Vue({
    el,
    render: h => h(IntentionMap,  {
      props: {
        accessToken: attrs.accesstoken,
        datasetUrl: attrs.dataset,
        ideaFormUrl: attrs.ideaform,
        categoryColors: colors,
      }
    })
  });
};

export default appFactory;
