import { BaseNode } from "../baseNode/baseNode";

export const DropdownNode = ({ id, data }) => {
  return (
    <BaseNode id={id} data={data} type="Dropdown">
      <label className="textNode">
        Select Option:
        <select>
          <option value="Option1">Option 1</option>
          <option value="Option2">Option 2</option>
          <option value="Option3">Option 3</option>
        </select>
      </label>
    </BaseNode>
  );
};
