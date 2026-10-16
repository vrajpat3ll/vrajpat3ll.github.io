import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/icons";
import { Panel } from "@/components/ui/panel";
import { connect } from "@/lib/content";

export function SocialLinks() {
  return (
    <Panel id="connect" title="Connect">
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {connect.map((link) => {
          const external = link.href.startsWith("http");
          return (
            <a
              key={link.label}
              href={link.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group inline-flex h-9 items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon name={link.icon} className="size-3.5 shrink-0" />
              <span className="leading-none">{link.label}</span>
              <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          );
        })}
      </div>
    </Panel>
  );
}
