import InfiniteDrift from "../lightswind/infinite-drift";

export const Marquee = () => {
  // Curate bands of premium tech/minimalist photography
  const bands = [
    {
      offsetY: -80,
      speed: 0.6,
      rotation: 3,
      curveAmount: 20.0,
      curveDirection: 1 as const,
      images: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=80", // code editor
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&auto=format&fit=crop&q=80", // html/terminal
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=80", // laptop code
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop&q=80", // cyber tech
      ],
    },
    {
      offsetY: 80,
      speed: -0.8, // scroll opposite direction
      rotation: -3,
      curveAmount: 20.0,
      curveDirection: -1 as const,
      images: [
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80", // matrix green code
        "https://images.unsplash.com/photo-1580927751497-40247f14b60a?w=500&auto=format&fit=crop&q=80", // python/code
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&auto=format&fit=crop&q=80", // engineering team
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80", // global network
      ],
    },
  ];

  return (
    <div className="relative py-12 overflow-hidden bg-background border-y border-border/40">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
      <div className="max-w-3xl mx-auto px-6 text-center mb-8">
        <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
          Visual Gallery
        </span>
        <h3 className="font-display font-bold text-2xl md:text-3xl mt-1 text-foreground">
          Where logic meets aesthetic
        </h3>
      </div>
      <InfiniteDrift 
        bands={bands} 
        height={320} 
        imageHeight={110} 
        bandHeight={130} 
        gap={25}
        inertia={0.9}
        className="w-full bg-transparent"
      />
    </div>
  );
};
