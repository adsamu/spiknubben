import React from 'react';

export default function ProgressBar({ done = 0, total = 10 }) {
  const clampedDone = Math.min(done, total);
  const half = Math.floor(total / 2);

  return (
    <div className="w-full flex flex-col">

      <div className="flex gap-1 items-center">
        {Array.from({ length: total }).map((_, idx) => {
          const isDone = idx < clampedDone;
          const isSecondRound = idx >= half;

          return (
            <React.Fragment key={idx}>
              {/* Insert divider BEFORE the first item of round 2 */}
              {idx === half && (
                <div className="w-[2px] h-4 bg-gray-400 mx-1 rounded-sm" />
              )}
              <div
                className={`flex-1 aspect-square rounded-sm ${
                  isDone
                    ? isSecondRound
                      ? 'bg-blue-500'
                      : 'bg-green-500'
                    : 'bg-gray-200'
                }`}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

