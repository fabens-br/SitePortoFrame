import { Hero } from "@/components/sections/home/hero"

import { Objections } from "@/components/sections/home/objections"
import { Benefits } from "@/components/sections/home/benefits"
import { Comparison } from "@/components/sections/home/comparison"
import { Process } from "@/components/sections/home/process"
import { ProjectsPreview } from "@/components/sections/home/projects-preview"
import { Financing } from "@/components/sections/home/financing"
import { Faq } from "@/components/sections/home/faq"
import { Cta } from "@/components/sections/home/cta"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />

      <Objections />
      <Benefits />
      <Comparison />
      <Process />
      <ProjectsPreview />
      <Financing />
      <Faq />
      <Cta />
    </div>
  );
}
