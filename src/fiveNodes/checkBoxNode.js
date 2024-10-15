import { BaseNode } from "../baseNode/baseNode";

export const CheckboxNode = ({ id, data }) => {
  return (
    <BaseNode id={id} data={data} type="Checkbox">
      <label className="textNode">
        <input type="checkbox" />
        {data?.label || "Checkbox"}
      </label>
    </BaseNode>
  );
};
