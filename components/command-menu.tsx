"use client";

import { Command } from "cmdk";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getSearchIndex, type SearchItem } from "@/lib/search-index";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const router = useRouter();
  const items = useMemo(() => getSearchIndex(), []);

  useEffect(() => {
    setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform));
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const groups = useMemo(() => {
    const map = new Map<string, SearchItem[]>();
    for (const item of items) {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    }
    return [...map.entries()];
  }, [items]);

  function select(item: SearchItem) {
    setOpen(false);
    if (item.external && item.href.startsWith("http")) {
      window.open(item.href, "_blank", "noreferrer");
    } else if (item.external) {
      window.location.href = item.href;
    } else {
      router.push(item.href);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-background px-2.5 text-muted-foreground shadow-xs outline-none transition-colors hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-accent"
      >
        <Search className="size-4" />
        <span className="font-sans text-sm/4 font-medium sm:hidden">
          Search
        </span>
        <KbdGroup className="hidden sm:flex">
          {isMac ? (
            <>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </>
          ) : (
            <>
              <Kbd className="w-fit min-w-6">Ctrl</Kbd>
              <Kbd>K</Kbd>
            </>
          )}
        </KbdGroup>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Search"
        overlayClassName="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        contentClassName="fixed left-1/2 top-[15%] z-50 w-[92vw] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-lg outline-none"
      >
        <div className="flex items-center gap-2 border-b border-border px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <Command.Input
            autoFocus
            placeholder="Search pages, projects, links…"
            className="h-11 w-full bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground"
          />
          <KbdGroup className="hidden sm:flex">
            <Kbd>Esc</Kbd>
          </KbdGroup>
        </div>

        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center font-mono text-sm text-muted-foreground">
            No results found.
          </Command.Empty>

          {groups.map(([group, groupItems]) => (
            <Command.Group
              key={group}
              heading={group}
              className="px-1 py-1 text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider"
            >
              {groupItems.map((item) => (
                <Command.Item
                  key={item.id}
                  value={`${item.title} ${item.subtitle ?? ""} ${item.keywords ?? ""}`}
                  onSelect={() => select(item)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm outline-none",
                    "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
                  )}
                >
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-foreground">
                      {item.title}
                    </span>
                    {item.subtitle && (
                      <span className="truncate font-mono text-xs text-muted-foreground">
                        {item.subtitle}
                      </span>
                    )}
                  </span>
                  {item.external && (
                    <span className="font-mono text-[11px] text-muted-foreground">
                      ↗
                    </span>
                  )}
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>
      </Command.Dialog>
    </>
  );
}
