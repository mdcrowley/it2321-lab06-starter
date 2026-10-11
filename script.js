// Lab 6: Forms, Fetch, and Live Data
// Goal: validate a form, fetch live JSON from a web service, and display it
// on the page. A free, no-key API is suggested below; you may choose another.

"use strict";

const form = document.getElementById("searchForm");
const termInput = document.getElementById("term");
const termError = document.getElementById("termError");
const output = document.getElementById("output");

// A free JSON API that needs no key. It echoes back whatever you send,
// which is enough to prove your fetch works. Replace it with an API that
// fits your final-project idea if you like.
// Docs: https://httpbin.org/   (try https://httpbin.org/get?term=cats)
const API_BASE = "https://httpbin.org/get";

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // TODO 1: stop the browser's default page reload

  // TODO 2: validate. If the field is empty, show the error and stop.
  const term = termInput.value.trim();
  if (term === "") {
    termError.hidden = false;
    return;
  }
  termError.hidden = true;

  // TODO 3: fetch live JSON. Handle both success and failure.
  output.textContent = "Loading...";
  try {
    const response = await fetch(`${API_BASE}?term=${encodeURIComponent(term)}`);
    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }
    const data = await response.json();

    // TODO 4: display something from the returned data on the page.
    //         Build DOM elements or set textContent; do not just log it.
    output.textContent = JSON.stringify(data.args, null, 2);
  } catch (err) {
    output.textContent = "Could not load data: " + err.message;
  }
});
