import { BaseNode } from "../baseNode/baseNode";

export const ImageNode = ({ id, data }) => {
  return (
    <BaseNode id={id} data={data} type="Image">
      <img
        src={data?.url}
        alt="scene"
        style={{ width: "100%", height: "100%" }}
      />
    </BaseNode>
  );
};
