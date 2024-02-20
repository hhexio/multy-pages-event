<template>
  <div class="coords">
    {{ getCoords }}
  </div>
</template>

<script>
import { throttle } from "@/helpers";
import { THROTTLE_T, CHANNEL_NAME } from "@/constants";

export default {
  name: "CursorCoords",

  data() {
    return {
      coords: {
        x: 0,
        y: 0,
      },
    };
  },

  computed: {
    getCoords() {
      const { x, y } = this.coords;
      return `x: ${x}, y: ${y}`;
    },
  },

  mounted() {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    window.addEventListener("mousemove", this.cursorHandler);
    channel.addEventListener("message", this.setCoords);
  },

  beforeDestroy() {
    window.removeEventListener("mousemove", this.cursorHandler);
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.removeEventListener("message", this.setCoords);
  },

  methods: {
    cursorHandler: throttle(function (e) {
      const payload = {
        x: e.clientX,
        y: e.clientY,
      };
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channel.postMessage(payload);
    }, THROTTLE_T),

    setCoords(event) {
      this.coords = event.data;
    },
  },
};
</script>
