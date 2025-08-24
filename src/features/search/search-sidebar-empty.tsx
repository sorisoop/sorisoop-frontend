export function SearchSidebarEmpty({ query }: { query: string }) {
  return <p className="p-4 text-sm text-muted-foreground">"{query}" 검색 결과가 없습니다.</p>;
}
