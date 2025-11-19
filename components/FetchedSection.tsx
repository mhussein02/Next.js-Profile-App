"use client";

import { useMemo, useState } from "react";
import FilterControls from "./FilterControls";
import ProfileGrid from "./ProfileGrid";

type Profile = {
  id: number;
  name: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
};

type Props = {
  data: Profile[];
};

export default function FetchedSection({ data }: Props) {
  const [titleFilter, setTitleFilter] = useState("");
  const [search, setSearch] = useState("");

  const titleOptions = useMemo(() => {
    const set = new Set<string>();
    data.forEach(p => set.add(p.title));
    return Array.from(set).sort();
  }, [data]);

  const filtered = useMemo(() => {
    return data.filter(profile => {
      const matchesTitle = titleFilter ? profile.title === titleFilter : true;
      const matchesSearch = search
        ? profile.name.toLowerCase().includes(search.toLowerCase())
        : true;
      return matchesTitle && matchesSearch;
    });
  }, [data, titleFilter, search]);

  const handleReset = () => {
    setTitleFilter("");
    setSearch("");
  };

  return (
    <section style={{ marginTop: 16 }}>
      <FilterControls
        titleFilter={titleFilter}
        onTitleFilterChange={setTitleFilter}
        search={search}
        onSearchChange={setSearch}
        titleOptions={titleOptions}
        onReset={handleReset}
      />
      <ProfileGrid profiles={filtered} />
    </section>
  );
}
