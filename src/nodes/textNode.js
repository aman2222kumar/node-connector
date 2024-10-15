import { useRef, useState, useEffect } from "react";
import { BaseNode } from "../baseNode/baseNode";
import { Handle, Position } from "reactflow";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [inputHeight, setInputHeight] = useState(20);
  const [baseNodeWidth, setBaseNodeWidth] = useState(200); // Initial width in pixels
  const minBaseNodeWidth = 200; // Minimum width in pixels
  const [handlePositions, setHandlePositions] = useState([]);
  const textRef = useRef(null); // Ref for the textarea

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);

    // Adjust the height of the textarea automatically based on the content
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
    setInputHeight(e.target.scrollHeight);

    // Extract handle positions for each {{ }}
    const handlePositions = extractHandlePositions(newText);
    setHandlePositions(handlePositions);
  };

  useEffect(() => {
    const adjustBaseNodeWidth = () => {
      if (textRef.current) {
        const textWidth = textRef.current.scrollWidth;

        // Update the width of the BaseNode to be the max of textWidth or the minBaseNodeWidth
        setBaseNodeWidth(Math.max(textWidth, minBaseNodeWidth));
      }
    };

    adjustBaseNodeWidth();
  }, [currText, baseNodeWidth]); // Run whenever the text changes

  // Extract positions of {{ }} to create handles
  const extractHandlePositions = (text) => {
    const regex = /{{(.*?)}}/g;
    const positions = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      // Calculate the position where the handle should be placed
      const startIndex = match.index;
      const variableName = match[1]?.trim();
      if (!variableName) continue;
      // Measure the width up to the start index of the {{ }} to position the handle
      const tempSpan = document.createElement("span");
      tempSpan.style.visibility = "hidden";
      tempSpan.style.position = "absolute";
      tempSpan.style.whiteSpace = "pre";
      tempSpan.textContent = text.slice(0, startIndex);
      document.body.appendChild(tempSpan);
      const textWidth = tempSpan.offsetWidth;
      document.body.removeChild(tempSpan);

      positions.push({
        text: variableName,
        left: textWidth,
      });
    }
    return positions;
  };

  return (
    <BaseNode
      id={id}
      data={data}
      type="Text"
      style={{ width: `${baseNodeWidth}px`, position: "relative" }} // Ensure positioning is relative
    >
      {/* Custom input for TextNode */}
      <label className="textNode">
        Text:
        <textarea
          value={currText}
          ref={textRef}
          onChange={handleTextChange}
          style={{
            height: `${inputHeight}px`,
            overflow: "hidden",
            resize: "none",
            whiteSpace: "nowrap", // Prevent text wrapping
          }}
          wrap="off" // Disable text wrapping
          rows={1} // Start with a single row
        />
      </label>
      {/* Render Handles */}
      <div className="handleContainer">
        {handlePositions.map((handle, index) => (
          <div
            key={`${id}-handle-${index}`}
            style={{
              top: `calc(60% + ${index * 20}px)`, // Keep the original style
              // Center vertically relative to the textarea
              left: `0px`, // Align with the {{ }} marker
              position: "absolute",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Handle
              type="source" // or "target"
              position={Position.Left}
              id={`${id}-handle-${index}`}
              style={{
                cursor: "pointer",
              }}
            />
            <span
              style={{
                position: "fixed",
                left: "-3rem",
                fontSize: "14px",
              }}
            >
              {handle.text}
            </span>
          </div>
        ))}
      </div>
    </BaseNode>
  );
};
