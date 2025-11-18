import React, { useState, useRef, useCallback } from "react";
import { useToggle } from "../hooks/useToggle";

export interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  fontWeight: "normal" | "bold" | "500" | "600" | "700";
  textAlign: "left" | "center" | "right";
  rotation: number;
  opacity: number;
}

export interface TextOverlayEditorProps {
  logoImage: string;
  onSave: (elements: TextElement[]) => void;
  onCancel: () => void;
  initialElements?: TextElement[];
}

export default function TextOverlayEditor({
  logoImage,
  onSave,
  onCancel,
  initialElements = [],
}: TextOverlayEditorProps) {
  const [textElements, setTextElements] =
    useState<TextElement[]>(initialElements);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const showStylePanel = useToggle(true);
  const toggleStylePanel = showStylePanel.toggle;
  const containerRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Create a new text element
  const addTextElement = useCallback(() => {
    const newElement: TextElement = {
      id: `text-${Date.now()}`,
      text: "Your Text Here",
      x: 50, // Center-ish position (percentage)
      y: 50,
      fontSize: 24,
      fontFamily: "Arial, sans-serif",
      color: "#000000",
      fontWeight: "bold",
      textAlign: "center",
      rotation: 0,
      opacity: 100,
    };

    setTextElements((prev) => [...prev, newElement]);
    setSelectedElement(newElement.id);
  }, []);

  // Update selected text element
  const updateSelectedElement = useCallback(
    (updates: Partial<TextElement>) => {
      if (!selectedElement) return;

      setTextElements((prev) =>
        prev.map((element) =>
          element.id === selectedElement ? { ...element, ...updates } : element,
        ),
      );
    },
    [selectedElement],
  );

  // Delete selected text element
  const deleteSelectedElement = useCallback(() => {
    if (!selectedElement) return;

    setTextElements((prev) =>
      prev.filter((element) => element.id !== selectedElement),
    );
    setSelectedElement(null);
  }, [selectedElement]);

  // Handle mouse down on text element (start dragging)
  const handleMouseDown = useCallback(
    (e: React.MouseEvent, elementId: string) => {
      e.preventDefault();
      setSelectedElement(elementId);
      setIsDragging(true);

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const element = textElements.find((el) => el.id === elementId);
      if (!element) return;

      // Calculate offset from mouse to element position
      const elementX = (element.x / 100) * rect.width;
      const elementY = (element.y / 100) * rect.height;

      dragOffset.current = {
        x: e.clientX - rect.left - elementX,
        y: e.clientY - rect.top - elementY,
      };
    },
    [textElements],
  );

  // Handle mouse move (dragging)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !selectedElement || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x =
        ((e.clientX - rect.left - dragOffset.current.x) / rect.width) * 100;
      const y =
        ((e.clientY - rect.top - dragOffset.current.y) / rect.height) * 100;

      // Constrain to container bounds
      const constrainedX = Math.max(0, Math.min(100, x));
      const constrainedY = Math.max(0, Math.min(100, y));

      updateSelectedElement({ x: constrainedX, y: constrainedY });
    },
    [isDragging, selectedElement, updateSelectedElement],
  );

  // Handle mouse up (stop dragging)
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const selectedElementData = selectedElement
    ? textElements.find((el) => el.id === selectedElement)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="mx-4 flex max-h-[90vh] w-full max-w-7xl gap-6 overflow-hidden rounded-lg bg-slate-800 p-6">
        {/* Main Editor Area */}
        <div className="flex flex-1 flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              Text Overlay Editor
            </h2>
            <div className="flex gap-2">
              <button
                onClick={toggleStylePanel}
                className="rounded bg-slate-600 px-3 py-1 text-white hover:bg-slate-500"
              >
                {showStylePanel.value ? "Hide" : "Show"} Styles
              </button>
              <button
                onClick={addTextElement}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
              >
                Add Text
              </button>
            </div>
          </div>

          {/* Logo Canvas */}
          <div
            ref={containerRef}
            className="relative min-h-96 flex-1 cursor-crosshair overflow-hidden rounded-lg bg-gray-100"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Background Logo Image */}
            <img
              src={logoImage}
              alt="Logo to edit"
              className="pointer-events-none h-full w-full object-contain"
              draggable={false}
            />

            {/* Text Elements Overlay */}
            {textElements.map((element) => (
              <div
                key={element.id}
                className={`absolute cursor-move select-none ${
                  selectedElement === element.id ? "ring-2 ring-blue-400" : ""
                }`}
                style={{
                  left: `${element.x}%`,
                  top: `${element.y}%`,
                  fontSize: `${element.fontSize}px`,
                  fontFamily: element.fontFamily,
                  color: element.color,
                  fontWeight: element.fontWeight,
                  textAlign: element.textAlign,
                  transform: `translate(-50%, -50%) rotate(${element.rotation}deg)`,
                  opacity: element.opacity / 100,
                  textShadow:
                    selectedElement === element.id
                      ? "0 0 8px rgba(59, 130, 246, 0.5)"
                      : "1px 1px 2px rgba(0,0,0,0.5)",
                  whiteSpace: "nowrap",
                }}
                onMouseDown={(e) => handleMouseDown(e, element.id)}
                onClick={() => setSelectedElement(element.id)}
              >
                {element.text || "Click to edit"}
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-4 flex items-center justify-between border-t border-slate-600 pt-4">
            <div className="flex gap-2">
              {selectedElement && (
                <button
                  onClick={deleteSelectedElement}
                  className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-500"
                >
                  Delete Selected
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="rounded bg-slate-600 px-6 py-2 text-white hover:bg-slate-500"
              >
                Cancel
              </button>
              <button
                onClick={() => onSave(textElements)}
                className="rounded bg-green-600 px-6 py-2 text-white hover:bg-green-500"
              >
                Save & Apply
              </button>
            </div>
          </div>
        </div>

        {/* Style Panel */}
        {showStylePanel.value && selectedElementData && (
          <div className="w-80 overflow-y-auto rounded-lg bg-slate-700 p-4">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Text Properties
            </h3>

            {/* Text Content */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Text Content
              </label>
              <input
                type="text"
                value={selectedElementData.text}
                onChange={(e) =>
                  updateSelectedElement({ text: e.target.value })
                }
                className="w-full rounded border border-slate-500 bg-slate-600 px-3 py-2 text-white focus:border-blue-400"
                placeholder="Enter your text..."
              />
            </div>

            {/* Font Size */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Font Size: {selectedElementData.fontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="120"
                value={selectedElementData.fontSize}
                onChange={(e) =>
                  updateSelectedElement({ fontSize: parseInt(e.target.value) })
                }
                className="w-full"
              />
            </div>

            {/* Font Family */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Font Family
              </label>
              <select
                value={selectedElementData.fontFamily}
                onChange={(e) =>
                  updateSelectedElement({ fontFamily: e.target.value })
                }
                className="w-full rounded border border-slate-500 bg-slate-600 px-3 py-2 text-white"
              >
                <option value="Arial, sans-serif">Arial</option>
                <option value="Helvetica, sans-serif">Helvetica</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="'Times New Roman', serif">
                  Times New Roman
                </option>
                <option value="'Courier New', monospace">Courier New</option>
                <option value="Impact, sans-serif">Impact</option>
                <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
              </select>
            </div>

            {/* Font Weight */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Font Weight
              </label>
              <select
                value={selectedElementData.fontWeight}
                onChange={(e) =>
                  updateSelectedElement({ fontWeight: e.target.value as any })
                }
                className="w-full rounded border border-slate-500 bg-slate-600 px-3 py-2 text-white"
              >
                <option value="normal">Normal</option>
                <option value="500">Medium</option>
                <option value="600">Semi Bold</option>
                <option value="bold">Bold</option>
              </select>
            </div>

            {/* Text Color */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Text Color
              </label>
              <input
                type="color"
                value={selectedElementData.color}
                onChange={(e) =>
                  updateSelectedElement({ color: e.target.value })
                }
                className="h-10 w-full rounded border border-slate-500"
              />
            </div>

            {/* Text Alignment */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Text Alignment
              </label>
              <div className="flex gap-1">
                {(["left", "center", "right"] as const).map((align) => (
                  <button
                    key={align}
                    onClick={() => updateSelectedElement({ textAlign: align })}
                    className={`rounded px-3 py-1 text-xs ${
                      selectedElementData.textAlign === align
                        ? "bg-blue-600 text-white"
                        : "bg-slate-600 text-gray-300"
                    }`}
                  >
                    {align}
                  </button>
                ))}
              </div>
            </div>

            {/* Rotation */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Rotation: {selectedElementData.rotation}°
              </label>
              <input
                type="range"
                min="-180"
                max="180"
                value={selectedElementData.rotation}
                onChange={(e) =>
                  updateSelectedElement({ rotation: parseInt(e.target.value) })
                }
                className="w-full"
              />
            </div>

            {/* Opacity */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Opacity: {selectedElementData.opacity}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={selectedElementData.opacity}
                onChange={(e) =>
                  updateSelectedElement({ opacity: parseInt(e.target.value) })
                }
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
