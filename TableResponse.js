import React from "react";

export default function TableResponse({ table }) {
  if (!table || table.length === 0) return null;

  const headers = Object.keys(table[0]);
  return (
    <div className="overflow-auto mt-2">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            {headers.map(h => <th key={h} className="text-left p-2 text-xs">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {table.map((row, idx) => (
            <tr key={idx} className="even:bg-gray-50 dark:even:bg-gray-800">
              {headers.map((h) => <td key={h} className="p-2 text-sm">{row[h]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
