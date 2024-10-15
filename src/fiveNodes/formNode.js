import { BaseNode } from "../baseNode/baseNode";

export const FormNode = ({ id, data }) => {
  return (
    <BaseNode id={id} data={data} type="Form">
      <label className="textNode">
        Form Field:
        <input type="text" />
      </label>
    </BaseNode>
  );
};
