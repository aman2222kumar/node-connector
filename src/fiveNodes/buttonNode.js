import { BaseNode } from "../baseNode/baseNode";

export const ButtonNode = ({ id, data }) => {
  return (
    <BaseNode id={id} data={data} type="Button">
      <button>{data?.label || "Click Me"}</button>
    </BaseNode>
  );
};
