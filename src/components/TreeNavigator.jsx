import React, { useState, useEffect } from "react";
import terminals from "../data/terminals/terminals.json";

const TreeNavigator = ({ treeId }) => {
  const [treeData, setTreeData] = useState(null);
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [currentTerminal, setCurrentTerminal] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load tree JSON dynamically
  useEffect(() => {
    async function loadTree() {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.PUBLIC_URL}/trees/${treeId}.json`);
        const data = await response.json();

        // normalize old vs new JSON
        const nodes = data.nodes || data;
        const startNode = data.startNode || Object.keys(nodes)[0];

        setTreeData({ ...data, nodes, startNode });
        setCurrentNodeId(startNode);
        setCurrentTerminal(null);
      } catch (err) {
        console.error("Error loading tree:", err);
      } finally {
        setLoading(false);
      }
    }
    loadTree();
  }, [treeId]);

  if (loading || !treeData || !currentNodeId) {
    return <p>Loading tree...</p>;
  }

  const currentNode = treeData.nodes[currentNodeId];

  const handleOptionClick = (option) => {
    if (option.terminalId) {
      // Load terminal from terminals.json
      const terminal = terminals[option.terminalId];
      if (terminal) {
        setCurrentTerminal(terminal);
      } else {
        console.error("Terminal ID not found:", option.terminalId);
      }
    } else if (option.next) {
      setCurrentNodeId(option.next);
      setCurrentTerminal(null);
    }
  };

  if (currentTerminal) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>{currentTerminal.label}</h2>
        <p>{currentTerminal.description}</p>
        <button
          onClick={() => {
            setCurrentNodeId(treeData.startNode);
            setCurrentTerminal(null);
          }}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{currentNode.question || currentNode.text}</h2>
      <div>
        {currentNode.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleOptionClick(opt)}
            style={{
              marginRight: "0.5rem",  // horizontal spacing
              marginBottom: "0.5rem", // vertical spacing if buttons wrap
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            {opt.label || opt.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TreeNavigator;
