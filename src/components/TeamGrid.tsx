"use client";

import { useState } from 'react';
import Image from 'next/image';
import Pagination from './Pagination';
import PlayerCard from './PlayerCard';
// Inline minimal SVG icons to avoid external dependencies

interface PlayerSocialLinks {
  twitter?: string;
  twitch?: string;
}

interface Player {
  name: string;
  role: string;
  image: string;
  game: string;
  achievements: string[];
  socialLinks?: PlayerSocialLinks;
}

interface Team {
  name: string;
  image: string;
  description: string;
  // Legacy support
  roster?: string[];
  // New rich players schema
  players?: Player[];
  achievements: string[];
}

interface TeamGridProps {
  teams: Team[];
  itemsPerPage?: number;
}

export default function TeamGrid({ teams, itemsPerPage = 2 }: TeamGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(teams.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTeams = teams.slice(startIndex, endIndex);

  return (
    <div className="space-y-12">
      {/* Teams Display */}
      <div className="space-y-16">
        {currentTeams.map((team) => (
          <div 
            key={`${team.name}-${currentPage}`} 
            className={`void-card scroll-reveal hover-lift tilt gpu-accelerated`} 
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative h-64 lg:h-full min-h-[300px] rounded-lg overflow-hidden group">
                <Image
                  src={team.image}
                  alt={team.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2 gpu-accelerated"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="space-y-6">
                <h2 className="text-3xl font-bold gradient-text stagger-child animate-slide-in-right">
                  {team.name}
                </h2>
                <p className="text-gray-300 text-lg stagger-child animate-slide-in-right">
                  {team.description}
                </p>
                {/* Players (new rich schema) or legacy roster */}
                {team.players && team.players.length > 0 ? (
                  <div className="stagger-child animate-slide-in-right">
                    <h3 className="text-xl font-semibold mb-4 text-white">Players</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger" data-stagger-step="75">
                      {team.players.map((player) => (
                        <div
                          key={player.name}
                          className="stagger-child animate-slide-in-right"
                        >
                          <PlayerCard
                            name={player.name}
                            role={player.role}
                            image={player.image}
                            game={player.game}
                            achievements={player.achievements}
                            socialLinks={player.socialLinks}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  team.roster && team.roster.length > 0 && (
                    <div className="stagger-child animate-slide-in-right">
                      <h3 className="text-xl font-semibold mb-3 text-white">Current Roster</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 stagger" data-stagger-step="60">
                        {team.roster.map((player) => (
                          <div 
                            key={player} 
                            className={`text-gray-400 transition-all duration-300 hover:text-white cursor-pointer hover:translate-x-2 hover:scale-105 p-2 rounded hover:bg-[#2A2A2A] gpu-accelerated`} 
                          >
                            <span className="flex items-center">
                              <span className="w-2 h-2 bg-[#FFFFFF] rounded-full mr-2 animate-pulse" />
                              {player}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
                
                <div className="stagger-child animate-slide-in-right">
                  <h3 className="text-xl font-semibold mb-3 text-white">Team Achievements</h3>
                  <div className="space-y-2 stagger" data-stagger-step="50">
                    {team.achievements.map((achievement) => (
                      <div 
                        key={achievement} 
                        className={`text-gray-400 flex items-start gpu-accelerated`} 
                      >
                        <span className="w-2 h-2 bg-[#a2a2a2] rounded-full mr-3 mt-2 animate-pulse" />
                        <span className="flex-1">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="scroll-reveal">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="mt-12"
          />
        </div>
      )}

      {/* Page Info */}
      {teams.length > 0 && (
        <div className="text-center text-sm text-gray-400 scroll-reveal">
          Showing {startIndex + 1}-{Math.min(endIndex, teams.length)} of {teams.length} teams
        </div>
      )}
    </div>
  );
}