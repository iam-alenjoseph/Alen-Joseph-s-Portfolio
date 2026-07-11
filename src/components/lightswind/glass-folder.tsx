"use client";

import React from "react";
import { cn } from "../../lib/utils";

type GlassFolderProps = {
  icon?: React.ReactNode;
  className?: string;
};

const GlassFolder: React.FC<GlassFolderProps> = ({ icon, className }) => {
  return (
    <section
      className={cn(
        "relative group flex flex-col items-center justify-center",
        className
      )}
    >
      <style>{`
        @keyframes folderOpen {
          0%, 15% {
            transform: rotateX(0deg);
            box-shadow: none;
          }
          40%, 65% {
            transform: rotateX(-46deg) translateY(1px);
            box-shadow: inset 0 20px 40px rgba(100,149,237,0.4), inset 0 -20px 40px rgba(65,105,225,0.3);
          }
          90%, 100% {
            transform: rotateX(0deg);
            box-shadow: none;
          }
        }
        @keyframes folderLayer1 {
          0%, 15% { transform: rotateX(0deg); }
          40%, 65% { transform: rotateX(-20deg); }
          90%, 100% { transform: rotateX(0deg); }
        }
        @keyframes folderLayer2 {
          0%, 15% { transform: rotateX(0deg); }
          40%, 65% { transform: rotateX(-30deg); }
          90%, 100% { transform: rotateX(0deg); }
        }
        @keyframes folderLayer3 {
          0%, 15% { transform: rotateX(0deg); }
          40%, 65% { transform: rotateX(-38deg); }
          90%, 100% { transform: rotateX(0deg); }
        }

        .glass-folder-front {
          animation: folderOpen 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 0.8s;
          transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-folder-layer1 {
          animation: folderLayer1 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 0.8s;
          transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-folder-layer2 {
          animation: folderLayer2 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 0.8s;
          transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-folder-layer3 {
          animation: folderLayer3 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 0.8s;
          transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* On hover: pause the auto animation and snap to open state */
        .group:hover .glass-folder-front {
          animation-play-state: paused;
          transform: rotateX(-46deg) translateY(1px) !important;
          box-shadow: inset 0 20px 40px rgba(100,149,237,0.4),
                      inset 0 -20px 40px rgba(65,105,225,0.3) !important;
        }
        .group:hover .glass-folder-layer1 {
          animation-play-state: paused;
          transform: rotateX(-20deg) !important;
        }
        .group:hover .glass-folder-layer2 {
          animation-play-state: paused;
          transform: rotateX(-30deg) !important;
        }
        .group:hover .glass-folder-layer3 {
          animation-play-state: paused;
          transform: rotateX(-38deg) !important;
        }
      `}</style>

      <div className="relative w-60 h-40 cursor-pointer origin-bottom [perspective:1500px] z-10">
        {/* Top tab */}
        <div
          className="bg-primarylw/30 backdrop-blur-md w-full h-full origin-top rounded-2xl rounded-tl-none
          shadow-[0_20px_40px_rgba(0,0,0,.2)] relative
          after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-20 after:h-4 after:bg-primarylw/30 after:backdrop-blur-md after:rounded-t-2xl
          before:absolute before:content-[''] before:-top-[15px] before:left-[75.5px] before:w-4 before:h-4 before:bg-primarylw/30 before:backdrop-blur-md before:[clip-path:polygon(0_35%,0%_100%,50%_100%);]"
        ></div>

        {/* Folder layers */}
        <div className="glass-folder-layer1 absolute inset-1 bg-[color-mix(in_srgb,var(--primarylw)_10%,transparent)] backdrop-blur-md rounded-2xl select-none origin-bottom"></div>
        <div className="glass-folder-layer2 absolute inset-1 bg-[color-mix(in_srgb,var(--primarylw)_10%,transparent)] backdrop-blur-md rounded-2xl origin-bottom"></div>
        <div className="glass-folder-layer3 absolute inset-1 bg-[color-mix(in_srgb,var(--primarylw)_10%,transparent)] backdrop-blur-md rounded-2xl origin-bottom"></div>

        {/* Front folder layer with icon */}
        <div
          className="glass-folder-front absolute bottom-0 bg-[color-mix(in_srgb,var(--primarylw)_20%,transparent)] backdrop-blur-md w-full h-[156px] rounded-2xl rounded-tr-none
          after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[146px] after:h-[16px] after:bg-[color-mix(in_srgb,var(--primarylw)_20%,transparent)] after:backdrop-blur-md after:rounded-t-2xl
          before:absolute before:content-[''] before:-top-[10px] before:right-[142px] before:size-3 before:bg-[color-mix(in_srgb,var(--primarylw)_20%,transparent)] before:backdrop-blur-md before:[clip-path:polygon(100%_14%,50%_100%,100%_100%);]
          origin-bottom flex items-center justify-center"
        >
          <div className="text-foreground text-4xl">{icon}</div>
        </div>
      </div>
    </section>
  );
};

export default GlassFolder;
