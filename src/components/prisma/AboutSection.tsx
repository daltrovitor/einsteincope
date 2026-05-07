'use client';

import { WordsPullUpMultiStyle } from './TextAnimations';
import { AnimatedScrollText } from './AnimatedScrollText';

export default function AboutSection() {
  return (
    <section className="bg-black py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#101010] rounded-[2.5rem] p-12 md:p-24 text-center">
          <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase block mb-8">
            Visual arts
          </span>

          <WordsPullUpMultiStyle
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[0.95] sm:leading-[0.9] text-[#E1E0CC] mb-16"
            segments={[
              { text: "I am Marcus Chen,", className: "font-normal" },
              { text: "a self-taught director.", className: "italic font-serif" },
              { text: "I have skills in color grading, visual effects, and narrative design.", className: "font-normal" }
            ]}
          />

          <AnimatedScrollText
            className="text-[#DEDBC8] text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed"
            text="Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals."
          />
        </div>
      </div>
    </section>
  );
}
