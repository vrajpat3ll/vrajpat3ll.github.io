import { GitHubActivityLive } from "@/components/github-activity-live";
import { Panel } from "@/components/ui/panel";
import { getContributions } from "@/lib/github";

export async function GitHubActivity() {
  const data = await getContributions();

  return (
    <Panel id="github" title="GitHub Activity">
      <GitHubActivityLive initial={data} />
    </Panel>
  );
}
