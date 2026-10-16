import { ProfileHeader } from "@/components/profile-header";
import { About } from "@/components/about";
import { SocialLinks } from "@/components/social-links";
import { GitHubActivity } from "@/components/github-activity";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
import { Quote } from "@/components/quote";
import { StripedDivider } from "@/components/ui/divider";
import { dayIndex } from "@/lib/quotes";

export default function HomePage() {
  return (
    <>
      <ProfileHeader />
      <StripedDivider />
      <About />
      <SocialLinks />
      <GitHubActivity />
      <Experience />
      <Education />
      <Quote buildDayIndex={dayIndex()} />
    </>
  );
}
