import React, { useState } from "react";
import TreeNavigator from "./components/TreeNavigator";

function App() {
  const [selectedTree, setSelectedTree] = useState("experiential");

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Philosophical Commitments Explorer</h1>
      <label>
        Select a branch:
        <select
          value={selectedTree}
          onChange={(e) => setSelectedTree(e.target.value)}
          style={{ marginLeft: "1rem" }}
        >
          <option value="experiential">Experiential Foundations</option>
          <option value="agential">Agential Foundations</option>
          <option value="modal">Modal Foundations</option>
          <option value="normative">Normative Foundations</option>
        </select>
      </label>

      <TreeNavigator treeId={selectedTree} />
    </div>
  );
}

export default App;