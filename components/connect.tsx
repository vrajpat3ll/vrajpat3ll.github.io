import { ArrowIcon, Icon } from "@/components/icons";
import { Section } from "@/components/section";
import { connect } from "@/lib/content";

export function Connect() {
  return (
    <Section id="connect" title="Connect">
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {connect.map((link) => {
          const external = link.href.startsWith("http");
          return (
            <a
              key={link.label}
              href={link.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:bg-muted"
            >
              <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                <Icon name={link.icon} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm text-foreground">{link.label}</span>
                <span className="truncate font-mono text-xs text-muted-foreground">
                  {link.handle}
                </span>
              </span>
              <ArrowIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          );
        })}
      </div>
    </Section>
  );
}
