type Props = {
  titleFilter: string;
  onTitleFilterChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  titleOptions: string[];
  onReset: () => void;
};

export default function FilterControls({
  titleFilter,
  onTitleFilterChange,
  search,
  onSearchChange,
  titleOptions,
  onReset
}: Props) {
  return (
    <div
      style={{
        marginTop: 16,
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        alignItems: "center"
      }}
    >
      <select
        value={titleFilter}
        onChange={e => onTitleFilterChange(e.target.value)}
        style={{
          padding: 8,
          borderRadius: 8,
          border: "1px solid #555",
          background: "transparent",
          color: "inherit",
          minWidth: 160
        }}
      >
        <option value="">All titles</option>
        {titleOptions.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <input
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        placeholder="Search by name"
        style={{
          padding: 8,
          borderRadius: 8,
          border: "1px solid #555",
          background: "transparent",
          color: "inherit",
          minWidth: 180
        }}
      />

      <button
        type="button"
        onClick={onReset}
        style={{
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid #777",
          background: "transparent",
          cursor: "pointer"
        }}
      >
        Reset
      </button>
    </div>
  );
}
