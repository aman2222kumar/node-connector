// submit.js

import React from "react";
import axios from "axios";

export const SubmitButton = ({ nodes, edges }) => {
  const handleSubmit = async () => {
    try {
      // Send nodes and edges to the backend
      const response = await axios.post(
        "http://localhost:8000/pipelines/parse",
        {
          nodes,
          edges,
        }
      );

      // Get the response data
      const { num_nodes, num_edges, is_dag } = response.data;

      // Show an alert with the response
      alert(
        `Number of nodes: ${num_nodes}\nNumber of edges: ${num_edges}\nIs DAG: ${is_dag}`
      );
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      alert("There was an error submitting the pipeline.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
