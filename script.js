const inputText = document.getElementById("inputText");

const outputText = document.getElementById("outputText");

const sourceLanguage =
    document.getElementById("sourceLanguage");

const targetLanguage =
    document.getElementById("targetLanguage");

const translateBtn =
    document.getElementById("translateBtn");

const swapBtn =
    document.getElementById("swapBtn");

const clearBtn =
    document.getElementById("clearBtn");

const copyBtn =
    document.getElementById("copyBtn");

const charCount =
    document.getElementById("charCount");

const status =
    document.getElementById("status");

const loader =
    document.getElementById("loader");

const buttonText =
    document.getElementById("buttonText");


// CHARACTER COUNT

inputText.addEventListener("input", () => {

    const length = inputText.value.length;

    charCount.textContent = `${length} / 1000`;

});


// CLEAR

clearBtn.addEventListener("click", () => {

    inputText.value = "";

    outputText.textContent =
        "Translation will appear here...";

    charCount.textContent = "0 / 1000";

    status.textContent = "Ready";

});


// SWAP LANGUAGES

swapBtn.addEventListener("click", () => {

    const source = sourceLanguage.value;

    sourceLanguage.value = targetLanguage.value;

    targetLanguage.value = source;

    const oldInput = inputText.value;

    inputText.value = outputText.textContent;

    outputText.textContent =
        oldInput || "Translation will appear here...";

});


// COPY TRANSLATION

copyBtn.addEventListener("click", async () => {

    const text = outputText.textContent;

    if (
        text === "Translation will appear here..." ||
        !text
    ) {
        return;
    }

    await navigator.clipboard.writeText(text);

    copyBtn.textContent = "COPIED";

    setTimeout(() => {

        copyBtn.textContent = "COPY";

    }, 1500);

});


// TRANSLATE

translateBtn.addEventListener("click", async () => {

    const text = inputText.value.trim();

    if (!text) {

        outputText.textContent =
            "Please enter some text first.";

        return;

    }


    if (
        sourceLanguage.value ===
        targetLanguage.value
    ) {

        outputText.textContent = text;

        return;

    }


    // Loading

    buttonText.style.display = "none";

    loader.style.display = "inline-block";

    status.textContent = "Translating...";


    /*
        Temporary demo translation.

        Later we will connect this
        to a real translation API.
    */

    setTimeout(() => {

        outputText.textContent =
            "Translation will appear here once the translation API is connected.";

        status.textContent = "Ready";

        buttonText.style.display = "inline";

        loader.style.display = "none";

    }, 1200);

});