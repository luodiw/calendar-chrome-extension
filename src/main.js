import { createApp } from "vue";
import App from "./App.vue";

const ROOT = "div.JAPqpe.K0NPx"; 

console.log("Cal: Hello World!");

function injectAppDiv() {
  const appDiv = document.createElement("div");
  appDiv.setAttribute("id", "vue-app-container");
  document.querySelector(ROOT).prepend(appDiv); 

  return appDiv;
}

function waitForElementAndInject() {
  const rootNode = document.querySelector(ROOT);
  if (document.readyState === "complete" && rootNode) {
    console.log("Cal: Element found, injecting button");
    const appContainer = injectAppDiv();
    createApp(App).mount("#vue-app-container");
  } else {
    console.log("Cal: Element not found, waiting");
    setTimeout(waitForElementAndInject, 500);
  }
}

try {
  waitForElementAndInject();
} catch (error) {
  console.error("Cal error: ", error);
}
