import React from "react";

interface InfoTooltipProps {
  content: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ content }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="ml-1 inline-flex h-4 w-4 items-center justify-center text-xs hover:opacity-75 focus:outline-none"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={(e) => {
          e.preventDefault();
          setShowTooltip(!showTooltip);
        }}
        aria-label="Show help information"
      >
        💡
      </button>

      {showTooltip && (
        <>
          {/* Backdrop for mobile - click to close */}
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setShowTooltip(false)}
          />
          <div className="absolute left-0 top-6 z-50 w-64 rounded-md border border-yellow-500 bg-gray-800 p-3 text-xs text-gray-200 shadow-xl">
            <div className="flex items-start">
              <div className="mr-2 text-yellow-400">💡</div>
              <div>{content}</div>
            </div>
            <div className="mt-2 text-right">
              <button
                onClick={() => setShowTooltip(false)}
                className="text-xs text-gray-400 hover:text-white"
              >
                ✕ Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InfoTooltip;
