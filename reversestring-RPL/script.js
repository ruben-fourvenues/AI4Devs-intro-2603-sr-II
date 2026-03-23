(function () {
    "use strict";
  
    var inputText    = document.getElementById("input-text");
    var btnReverse   = document.getElementById("btn-reverse");
    var outputSection = document.getElementById("output-section");
    var outputText   = document.getElementById("output-text");
    var btnCopy      = document.getElementById("btn-copy");
    var copyFeedback = document.getElementById("copy-feedback");
  
    var feedbackTimer = null;
  
    /**
     * Invierte una cadena de texto respetando caracteres Unicode (emojis, etc.).
     * @param {string} str
     * @returns {string}
     */
    function reverseString(str) {
      // Array.from divide correctamente los puntos de código Unicode
      return Array.from(str).reverse().join("");
    }
  
    function showOutput(text) {
      outputText.textContent = text;
      outputSection.classList.add("visible");
    }
  
    function hideOutput() {
      outputSection.classList.remove("visible");
      outputText.textContent = "";
      hideFeedback();
    }
  
    function showFeedback() {
      copyFeedback.classList.add("visible");
      if (feedbackTimer) {
        clearTimeout(feedbackTimer);
      }
      feedbackTimer = setTimeout(hideFeedback, 2000);
    }
  
    function hideFeedback() {
      copyFeedback.classList.remove("visible");
      feedbackTimer = null;
    }
  
    // ── Evento: Reverse ──────────────────────────────────────────────────────────
    btnReverse.addEventListener("click", function () {
      var value = inputText.value;
  
      if (value === "") {
        hideOutput();
        return;
      }
  
      var reversed = reverseString(value);
      showOutput(reversed);
      hideFeedback();
    });
  
    // También ejecutar al pulsar Enter dentro del input
    inputText.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        btnReverse.click();
      }
    });
  
    // ── Evento: Copiar ───────────────────────────────────────────────────────────
    btnCopy.addEventListener("click", function () {
      var textToCopy = outputText.textContent;
  
      if (!textToCopy) return;
  
      // Clipboard API moderna
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy)
          .then(showFeedback)
          .catch(function () {
            fallbackCopy(textToCopy);
          });
      } else {
        fallbackCopy(textToCopy);
      }
    });
  
    /**
     * Método de copia alternativo para entornos sin Clipboard API.
     * @param {string} text
     */
    function fallbackCopy(text) {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.cssText = "position:absolute;left:-9999px;top:-9999px;";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        var success = document.execCommand("copy");
        if (success) showFeedback();
      } catch (err) {
        console.error("No se pudo copiar al portapapeles:", err);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  })();