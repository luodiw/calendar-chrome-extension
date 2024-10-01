<template>
  <span jsslot="" jsname="j7LFlb" tabindex="-1" class="z80M1 QJXRJc"
  jsaction="click:o6ZaF(preventDefault=true); mousedown:lAhnzb; mouseup:Osgxgf; mouseenter:SKyDAe; mouseleave:xq3APb;touchstart:jJiBRc; touchmove:kZeBdd; touchend:VfAz8(preventMouseEvents=true)"
    aria-label="🪄 Event" role="menuitem">
    <div class="aBBjbd MbhUzd" jsname="ksKsZd"></div>
    <div class="uyYuVb oJeWuf" data-key="event" jsaction="JIbuQc:Dc9sZe" @click="submit">
      <div class="jO7h3c">☕️Create an Event with AI</div>
    </div>
  </span>
</template>

<script setup lang="ts">
import * as style from "style:./App.vue";

const submit = async () => {
  const input = prompt("Ex: Run with David at 5pm tomorrow 🏃‍♂️!");

  if (!input.trim()) {
    return;
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const BASE_URL =
    "https://calendar-wizard.onrender.com";

  try {
    const url = `${BASE_URL}/link?prompt=${encodeURIComponent(input)}&timezone=${encodeURIComponent(timezone)}`;
    const data = await (await fetch(url)).json();
    console.log("Response JSON:", data);

    window.location.assign(data.google_calendar_link);
  } catch (error) {
    console.error("Error submitting input to API:", error);
  }
};
</script>

<style>
#magic-button {
  border-radius: 999px;
  background-color: white;
  padding: 6px 8px;
  margin-left: 12px;
  box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3);
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border: 1px solid #ccc;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.input-field {
  margin-bottom: 10px;
}
</style>
