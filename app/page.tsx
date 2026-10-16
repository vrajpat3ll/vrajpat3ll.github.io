import { ProfileHeader } from "@/components/profile-header";
import { About } from "@/components/about";
import { SocialLinks } from "@/components/social-links";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
import { Quote } from "@/components/quote";
import { StripedDivider } from "@/components/ui/divider";

export default function HomePage() {
  return (
    <>
      <ProfileHeader />
      <StripedDivider />
      <About />
      <SocialLinks />
      <Experience />
      <Education />
      <Quote />
    </>
  );
}
