export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-lg border bg-muted/20 px-4 py-3 text-sm">
      <div className="font-medium">{title}</div>
      {description ? <div className="text-muted-foreground">{description}</div> : null}
    </div>
  );
}

