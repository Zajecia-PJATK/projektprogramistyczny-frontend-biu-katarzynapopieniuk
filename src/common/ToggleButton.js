import getMessage from "./LanguageVersionMessageFinder";
import React from "react";

export default function getToggleButton(toggle, languageVersion, labelName, LABELS, hidden= false) {
    return <button id="bordered-radio-2" type="button"
                   className="w-full h-10 border-2 border-violet-400 bg-violet-50"
                   onClick={toggle}
                   hidden={hidden}>
        {getMessage(languageVersion, labelName, LABELS)}
    </button>;
}