import { useState } from "react";
import { noValidTexts } from "../utils/noValidTexts";
import { parsedTypes } from "../utils/types";

const Home = () => {
  const [inputFields, setInputFields] = useState("");
  const [parsedFields, setParsedFields] = useState("");

  const onSubmitForm = (evt) => {
    evt.preventDefault();
    const splitInputFields = inputFields.split(/ \t| \n|\)\n/);
    const removeNotValidTexts = splitInputFields.map((line) => {
      const cleanedLine = line
        .replace(new RegExp(noValidTexts.join("|"), "gi"), "")
        .replace(/\n|\n\n/gi, " ")
        .replace("Vinculación", "Union")
        .trim();
      const splitedLine = cleanedLine.split("  ");
      if (splitedLine[1]) {
        const splitedType = splitedLine[1].split("Union con ");
        if (splitedType.length > 1) {
          return `${splitedLine[0]}|${parsedTypes(splitedLine[1])}||${
            splitedType[1].split(" (de:")[0]
          }`;
        }
      }

      return `${splitedLine[0]}|${parsedTypes(splitedLine[1])}||`;
    });
    setParsedFields(removeNotValidTexts.join("\n"));
  };

  const onClick = () => {
    navigator.clipboard.writeText(parsedFields);
  };

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <textarea
          name="input-fields"
          cols="30"
          rows="10"
          value={inputFields}
          onChange={(evt) => setInputFields(evt.target.value)}
        ></textarea>
        <button>Parsear</button>
      </form>
      <div>
        <p>Campos: {parsedFields.split("\n").length}</p>
        <textarea
          name="parsed-fields"
          cols="30"
          rows="10"
          value={parsedFields}
          onChange={(evt) => setParsedFields(parsedFields)}
        />
        <button onClick={onClick}>Copiar</button>
      </div>
    </div>
  );
};

export default Home;
