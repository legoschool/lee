import Brick from "@/components/lego/Brick";
import SectionTitle from "@/components/lego/SectionTitle";
import type { AboutSection } from "@/data/types";

export default function About({ about }: { about: AboutSection }) {
  return (
    <section>
      <SectionTitle icon="👋" color="orange">
        {about.heading}
      </SectionTitle>
      <Brick color="white" studs={5}>
        <p className="whitespace-pre-line leading-relaxed text-lego-black/90">
          {about.body}
        </p>
      </Brick>
    </section>
  );
}
