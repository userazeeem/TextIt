import { pipeline } from
    "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1";

const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const sourceLanguage = document.getElementById("sourceLanguage");
const targetLanguage = document.getElementById("targetLanguage");

const translateBtn = document.getElementById("translateBtn");
const swapBtn = document.getElementById("swapBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");

const charCount = document.getElementById("charCount");
const status = document.getElementById("status");

const loader = document.getElementById("loader");
const buttonText = document.getElementById("buttonText");

let translator = null;


// ============================
// CHARACTER COUNT
// ============================

inputText.addEventListener("input", () => {

    charCount.textContent =
        `${inputText.value.length} / 1000`;

});


// ============================
// CLEAR
// ============================

clearBtn.addEventListener("click", () => {

    inputText.value = "";

    outputText.textContent =
        "Translation will appear here...";

    charCount.textContent =
        "0 / 1000";

    status.textContent = "Ready";

});


// ============================
// SWAP
// ============================

swapBtn.addEventListener("click", () => {

    const source = sourceLanguage.value;

    sourceLanguage.value =
        targetLanguage.value;

    targetLanguage.value = source;

});


// ============================
// COPY
// ============================

copyBtn.addEventListener("click", async () => {

    const text = outputText.textContent;

    if (
        !text ||
        text === "Translation will appear here..."
    ) {
        return;
    }

    try {

        await navigator.clipboard.writeText(text);

        copyBtn.textContent = "COPIED";

        setTimeout(() => {

            copyBtn.textContent = "COPY";

        }, 1500);

    } catch (error) {

        console.error(error);

    }

});


// ============================
// LOAD TRANSLATION MODEL
// ============================

async function loadTranslator() {

    status.textContent =
        "Loading model...";

    outputText.textContent =
        "Downloading translation model...";


    translator = await pipeline(
        "translation",
        "Xenova/opus-mt-en-fr"
    );


    status.textContent =
        "Model ready";

}


// ============================
// TRANSLATE
// ============================

translateBtn.addEventListener("click", async () => {

    const text = inputText.value.trim();


    if (!text) {

        outputText.textContent =
            "Please enter some text first.";

        return;

    }


    // This model supports English → French

    if (
        sourceLanguage.value !== "en" ||
        targetLanguage.value !== "fr"
    ) {

        outputText.textContent =
            "For now, please select English → French.";

        status.textContent =
            "Language not supported";

        return;

    }


    buttonText.style.display = "none";
    loader.style.display = "inline-block";

    status.textContent =
        "Translating...";


    try {

        if (!translator) {

            await loadTranslator();

        }


        const result =
            await translator(text);


        outputText.textContent =
            result[0].translation_text;

        status.textContent =
            "Translated";


    } catch (error) {

        console.error("Translation error:", error);

        outputText.textContent =
            "Translation failed. Check the browser console.";

        status.textContent =
            "Error";

    }


    buttonText.style.display = "inline";
    loader.style.display = "none";

});