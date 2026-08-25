import { pipeline } from
    "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1";


// =============================
// ELEMENTS
// =============================

const inputText =
    document.getElementById("inputText");

const outputText =
    document.getElementById("outputText");

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


// =============================
// MODEL
// =============================

let translator = null;


// =============================
// CHARACTER COUNT
// =============================

inputText.addEventListener("input", () => {

    charCount.textContent =
        `${inputText.value.length} / 1000`;

});


// =============================
// CLEAR
// =============================

clearBtn.addEventListener("click", () => {

    inputText.value = "";

    outputText.textContent =
        "Translation will appear here...";

    charCount.textContent =
        "0 / 1000";

    status.textContent =
        "Ready";

});


// =============================
// SWAP
// =============================

swapBtn.addEventListener("click", () => {

    const source =
        sourceLanguage.value;

    sourceLanguage.value =
        targetLanguage.value;

    targetLanguage.value =
        source;

});


// =============================
// COPY
// =============================

copyBtn.addEventListener("click", async () => {

    const text =
        outputText.textContent;

    if (
        !text ||
        text === "Translation will appear here..."
    ) {
        return;
    }

    try {

        await navigator.clipboard.writeText(text);

        copyBtn.textContent =
            "COPIED";

        setTimeout(() => {

            copyBtn.textContent =
                "COPY";

        }, 1500);

    } catch (error) {

        console.error(error);

    }

});


// =============================
// LOAD MODEL
// =============================

async function loadTranslator() {

    status.textContent =
        "Loading AI model...";

    outputText.textContent =
        "Downloading translation model...";


    translator = await pipeline(
        "translation",
        "Xenova/nllb-200-distilled-600M"
    );


    status.textContent =
        "AI model ready";

}


// =============================
// LANGUAGE CODES
// =============================

const languageCodes = {

    en: "eng_Latn",

    hi: "hin_Deva",

    kn: "kan_Knda",

    te: "tel_Telu",

    ta: "tam_Taml",

    ml: "mal_Mlym",

    fr: "fra_Latn",

    de: "deu_Latn",

    es: "spa_Latn",

    ja: "jpn_Jpan"

};


// =============================
// TRANSLATE
// =============================

translateBtn.addEventListener(
    "click",
    async () => {

        const text =
            inputText.value.trim();


        if (!text) {

            outputText.textContent =
                "Please enter some text first.";

            return;

        }


        const source =
            sourceLanguage.value;

        const target =
            targetLanguage.value;


        // Same language

        if (source === target) {

            outputText.textContent =
                text;

            status.textContent =
                "Same language";

            return;

        }


        // Loading UI

        buttonText.style.display =
            "none";

        loader.style.display =
            "inline-block";

        status.textContent =
            "Translating...";


        try {

            // Load model

            if (!translator) {

                await loadTranslator();

            }


            // Convert language codes

            const sourceCode =
                languageCodes[source];

            const targetCode =
                languageCodes[target];


            // Translation

            const result =
                await translator(
                    text,
                    {
                        src_lang: sourceCode,
                        tgt_lang: targetCode
                    }
                );


            outputText.textContent =
                result[0].translation_text;


            status.textContent =
                "Translated";


        } catch (error) {

            console.error(error);

            outputText.textContent =
                "Translation failed.";

            status.textContent =
                "Error";

        } finally {

            buttonText.style.display =
                "inline";

            loader.style.display =
                "none";

        }

    }
);