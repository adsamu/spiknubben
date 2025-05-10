export default function ProgressBar({ done = 0, total = 5 }) {
  const clampedDone = Math.min(done, total);
  const blocks = Array.from({ length: total }, (_, i) => i < clampedDone);

  return (
    <div className="w-full">
      <div className="text-sm mb-1 text-gray-700 font-medium">
        {clampedDone} / {total} challenges done
      </div>

      <div className="flex gap-1">
        {blocks.map((filled, idx) => (
          <div
            key={idx}
            className={`h-3 flex-1 rounded-sm ${
              filled ? 'bg-green-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

