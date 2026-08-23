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

    charCount.textContent =
        `${inputText.value.length} / 1000`;

});


// CLEAR

clearBtn.addEventListener("click", () => {

    inputText.value = "";

    outputText.textContent =
        "Translation will appear here...";

    charCount.textContent =
        "0 / 1000";

    status.textContent =
        "Ready";
});


// SWAP

swapBtn.addEventListener("click", () => {

    const source = sourceLanguage.value;

    sourceLanguage.value =
        targetLanguage.value;

    targetLanguage.value =
        source;

});


// COPY

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

        copyBtn.textContent = "COPIED";

        setTimeout(() => {
            copyBtn.textContent = "COPY";
        }, 1500);

    } catch (error) {

        console.error(error);

    }
});


// TRANSLATE

translateBtn.addEventListener("click", async () => {

    const text =
        inputText.value.trim();

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

        status.textContent = "Ready";

        return;
    }


    // Loading

    buttonText.style.display = "none";
    loader.style.display = "inline-block";

    status.textContent = "Translating...";


    try {

        const response = await fetch(
            "http://localhost:5000/api/translate",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    text: text,

                    source:
                        sourceLanguage.value,

                    target:
                        targetLanguage.value

                })
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Translation failed."
            );
        }


        outputText.textContent =
            data.translatedText;

        status.textContent =
            "Translated";

    } catch (error) {

        console.error(error);

        outputText.textContent =
            error.message;

        status.textContent =
            "Error";

    } finally {

        buttonText.style.display =
            "inline";

        loader.style.display =
            "none";
    }

});