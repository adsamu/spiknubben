import Card from './Card';

// A generic, titled surface you can reuse for *any* list or panel.
export default function Board({ title, children, className = '' }) {
  return (
    <Card
      className={`w-full max-w-xl mx-auto bg-white rounded-xl  p-4 ${className}`}
    >
      {title && (
        <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
      )}
      {children}
    </Card>
  );
}
