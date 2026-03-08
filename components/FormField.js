export default function FormField({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm text-gray-400">{label}</label>
      )}
      {children}
      {error && (
        <p className="text-red-400 text-xs mt-1">{error[0]}</p>
      )}
    </div>
  );
}