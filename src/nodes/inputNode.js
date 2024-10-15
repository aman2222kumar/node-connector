// inputNode.js

import { BaseNode } from "../baseNode/baseNode";

export const InputNode = ({ id, data }) => {
  const handleTypeChange = (newType) => {
    // Handle type-specific logic if necessary
    // For example, update the store or perform other actions
  };

  return (
    <BaseNode id={id} data={data} type="Input" onTypeChange={handleTypeChange}>
      {/* Custom content specific to InputNode */}
      <label className="textNode">
        {/* You can include specific elements related to InputNode here */}
        Input Type:
        <select>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
