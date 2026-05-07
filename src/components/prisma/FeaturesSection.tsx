'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { WordsPullUpMultiStyle } from './TextAnimations';

const features = [
  {
    type: 'video',
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4",
    title: "Your creative canvas."
  },
  {
    type: 'card',
    number: "01",
    title: "Project Storyboard.",
    icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85",
    items: ["Scene-by-scene planning", "Dynamic layout tools", "Global asset library", "Real-time collaboration"]
  },
  {
    type: 'card',
    number: "02",
    title: "Smart Critiques.",
    icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85",
    items: ["AI-powered visual analysis", "Creative feedback loops", "Toolchain integrations"]
  },
  {
    type: 'card',
    number: "03",
    title: "Immersion Capsule.",
    icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85",
    items: ["Deep work distraction blocking", "Ambient spatial soundscapes", "Intelligent schedule sync"]
  }
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="min-h-screen bg-black relative py-32 px-6">
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <WordsPullUpMultiStyle
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight block mb-4"
            segments={[{ text: "Studio-grade workflows for visionary creators.", className: "text-[#E1E0CC]" }]}
          />
          <WordsPullUpMultiStyle
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight"
            segments={[{ text: "Built for pure vision. Powered by art.", className: "text-gray-500" }]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:h-[480px]">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="h-full"
            >
              {feature.type === 'video' ? (
                <div className="relative h-full w-full rounded-3xl overflow-hidden group">
                  <video
                    src={feature.video}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-8 left-8">
                    <p className="text-[#E1E0CC] font-medium">{feature.title}</p>
                  </div>
                </div>
              ) : (
                <div className="h-full w-full bg-[#212121] rounded-3xl p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <img src={feature.icon} className="w-10 h-10 rounded-lg object-cover" alt="" />
                      <span className="text-primary/50 text-xs font-bold tracking-widest">({feature.number})</span>
                    </div>
                    <h3 className="text-[#E1E0CC] text-xl font-medium mb-6">{feature.title}</h3>
                    <div className="flex flex-col gap-3">
                      {feature.items?.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="text-primary mt-1" size={14} />
                          <span className="text-gray-400 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="flex items-center gap-2 text-primary text-sm font-medium mt-8 group">
                    Learn more
                    <ArrowRight className="transition-transform group-hover:translate-x-1 -rotate-45" size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
