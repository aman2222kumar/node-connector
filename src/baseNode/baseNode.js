import { Handle, Position, useReactFlow } from "reactflow";
import { useState } from "react";

export const BaseNode = ({
  id,
  data,
  type,
  children,
  onNameChange,
  onTypeChange,
  style = {},
}) => {
  const [name, setName] = useState(data?.name || id);
  const [fieldType, setFieldType] = useState(data?.type || "Text");
  const { setNodes } = useReactFlow();
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    if (onNameChange) {
      onNameChange(newName);
    }
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setFieldType(newType);
    if (onTypeChange) {
      onTypeChange(newType);
    }
  };
  const onRemoveNode = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
  };
  return (
    <div className="baseNodeContainer" style={style}>
      <div className="header_menu">
        <span>{type}</span>
        <button className="close_btn" onClick={() => onRemoveNode(id)}>
          X
        </button>
      </div>
      <div className="content">
        <label className="textNode">
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        {type !== "Text" && (
          <label className="textNode">
            Type:
            <select value={fieldType} onChange={handleTypeChange}>
              <option value="Text">Text</option>
              {type === "Input" && <option value="File">File</option>}
              {type === "Output" && <option value="Image">Image</option>}
            </select>
          </label>
        )}
      </div>
      {/* Render additional children, e.g., for custom node-specific input */}
      {children}
      <Handle
        type={type === "Input" ? "source" : "target"}
        position={Position.Right}
        id={`${id}-handle`}
      />
    </div>
  );
};
