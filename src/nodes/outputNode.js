import { BaseNode } from "../baseNode/baseNode";

export const OutputNode = ({ id, data }) => {
  const handleTypeChange = (newType) => {
    // Handle type-specific logic if necessary
    // For example, update the store or perform other actions
  };

  return (
    <BaseNode id={id} data={data} type="Output" onTypeChange={handleTypeChange}>
      {/* Custom content specific to OutputNode */}
      <label className="textNode">
        {/* You can include specific elements related to OutputNode here */}
        Output Type:
        <select>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
