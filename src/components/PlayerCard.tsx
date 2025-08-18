"use client";

import Image from 'next/image';

interface PlayerSocialLinks {
  twitter?: string;
  twitch?: string;
}

interface PlayerCardProps {
  name: string;
  role: string;
  image: string;
  game: string;
  achievements?: string[];
  socialLinks?: PlayerSocialLinks;
}

export default function PlayerCard({ name, role, image, game, achievements = [], socialLinks }: PlayerCardProps) {
  return (
    <div
      className="group/ply flex items-center gap-4 p-3 rounded-lg bg-[#161616] border border-[#2A2A2A] hover:border-[#FFFFFF]/30 transition-all duration-300 hover:translate-y-[-4px] hover-lift gpu-accelerated"
    >
      <div className="relative h-16 w-16 rounded-md overflow-hidden shrink-0">
        <Image src={image} alt={name} fill className="object-cover" sizes="64px" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="truncate">
            <div className="text-white font-semibold leading-tight truncate">{name}</div>
            <div className="text-xs text-gray-400">{role} • {game}</div>
          </div>
          <div className="flex items-center gap-2">
            {socialLinks?.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label={`${name} Twitter`}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 7.09v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
            )}
            {socialLinks?.twitch && (
              <a href={socialLinks.twitch} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label={`${name} Twitch`}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M4 3h16v11l-4 4h-4l-3 3H7v-3H4V3zm3 2v10h3v3l3-3h4l2-2V5H7zm8 2h2v5h-2V7zm-5 0h2v5H10V7z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
        {achievements?.length > 0 && (
          <div className="mt-2 grid grid-cols-1 gap-1">
            {achievements.slice(0, 3).map((ach, ai) => (
              <div key={`${name}-ach-${ai}`} className="text-xs text-gray-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a2a2a2]" />
                <span className="truncate">{ach}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
