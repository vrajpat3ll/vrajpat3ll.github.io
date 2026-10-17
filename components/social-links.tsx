import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/icons";
import { Panel } from "@/components/ui/panel";
import { connect } from "@/lib/content";

export function SocialLinks() {
  return (
    <Panel id="connect" title="Connect">
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
        {connect.map((link) => {
          const external = link.href.startsWith("http");
          return (
            <a
              key={link.label}
              href={link.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-3 bg-card px-4 py-3 outline-none transition-colors hover:bg-muted focus-visible:bg-muted"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors group-hover:text-foreground">
                <Icon name={link.icon} className="size-4" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-medium leading-tight text-foreground">
                  {link.label}
                </span>
                <span className="truncate font-mono text-xs text-muted-foreground">
                  {link.handle}
                </span>
              </span>
              <ArrowUpRight className="size-4 shrink-0 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </a>
          );
        })}
      </div>
    </Panel>
  );
}
