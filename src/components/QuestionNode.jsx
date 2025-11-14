import React from "react";

function QuestionNode({ question, options, onSelectOption }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>{question}</h2>
      <div>
        {options.map((option) => (
          <button
            key={option.label}
            onClick={() => onSelectOption(option.next)}
            style={{
              marginRight: "0.5rem",   // adds horizontal space between buttons
              marginBottom: "0.5rem",  // adds vertical space if buttons wrap
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionNode;