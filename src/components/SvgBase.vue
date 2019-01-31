<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" :viewBox="viewBoxSerialized" :aria-labelledby="iconName" role="presentation" :iconColor="iconColor">
    <title :id="iconName" lang="en">{{iconName}} icon</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'icon',
    },
    width: {
      type: [Number, String],
      default: 'auto',
    },
    height: {
      type: [Number, String],
      default: '100%',
    },
    iconColor: {
      type: String,
      default: 'black',
    },
    viewBox: { type: [String, Number] },
  },
  computed: {
    viewBoxSerialized() {
      return this.viewBox === 'myob' ? '0 0 283.5 116.4' : this.viewBox || '0 0 20 20';
    },
  },
};
</script>
