interface InfoTagsProps {
  items: (string | undefined | null)[];
}

export const InfoTags = ({ items }: InfoTagsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
      {items.filter(Boolean).map((item, id) => (
        <span
          key={id}
          className="rounded-full border border-zinc-400 px-4 py-2 text-xs text-white"
        >
          {item}
        </span>
      ))}
    </div>
  );
};
