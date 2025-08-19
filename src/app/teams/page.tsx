"use client";

import TeamGrid from '@/components/TeamGrid';
import { useEffect, useState } from 'react';

const teams = [
  {
    name: 'Fortnite',
    image: '/teams/fortnite.png',
    description: 'Our elite Fortnite squad competing at the highest level.',
    players: [
      {
        name: 'Void Blu',
        role: 'Player',
        image: '/teams/Players/blu.png',
        game: 'Fortnite',
        achievements: ['FNCS Grand Finals', '2500+ Earnings', 'Top 10 Placement'],
        socialLinks: {
          twitter: 'https://x.com/D1_Blu',
          twitch: 'https://www.twitch.tv/d1blu',
        },
      },
      {
        name: 'Void Drvzy',
        role: 'Player',
        image: '/teams/Players/drvzy.jpg',
        game: 'Fortnite',
        achievements: ['FNCS Grand Finals', 'Major 3 Qualifier', 'Elite Player'],
        socialLinks: {
          twitter: 'https://x.com/drvzyfn',
        },
      },
      {
        name: 'Void Jayse1x',
        role: 'Player',
        image: '/teams/Players/jayse.jpg',
        game: 'Fortnite',
        achievements: ['Rising Star', 'Tournament Player', 'Future Champion'],
        socialLinks: {
          twitter: 'https://x.com/Jaysekbm',
        },
      },
      {
        name: 'Void Fx1ine',
        role: 'Player',
        image: '/teams/Players/fxing.png',
        game: 'Fortnite',
        achievements: ['Rising Star', 'Tournament Player', 'Future Champion'],
        socialLinks: {
          twitter: 'https://x.com/Forest_veroo',
        },
      },
    ],
    achievements: ['2x FNCS Grand Finals', '200K+ PR', '5k+ Earnings'],
  },
  {
    name: 'Ownership',
    image: '/logo.png',
    description: 'Void Esports Ownership Team',
    players: [
      {
        name: 'Frankenstein',
        role: 'Founder',
        image: '/teams/Players/frank.png',
        game: 'Management',
        achievements: ['Founder', 'Team Management', 'Business Development'],
        socialLinks: {
          twitter: 'https://x.com/VoidFrankenste1',
          twitch: 'https://www.twitch.tv/voidfrankenstein',
        },
      },
      {
        name: 'Gruun',
        role: 'Founder & CTO',
        image: '/teams/Players/gruun.png',
        game: 'Management',
        achievements: ['Founder', 'Developer', 'Technical Director'],
        socialLinks: {
          twitter: 'https://x.com/gruunvfx',
        },
      },
      {
        name: 'Jah',
        role: 'CFO',
        image: '/logo.png',
        game: 'Management',
        achievements: ['Financial Director', 'Sponsorship', 'Growth Strategy'],
        socialLinks: {
          twitter: 'https://twitter.com/voiddrpuffin',
        },
      },
      {
        name: 'Bxezy',
        role: 'Management',
        image: '/teams/Players/bxezy.jpg',
        game: 'Management',
        achievements: ['Innovation', 'Community Manager', 'Manager'],
        socialLinks: {
          twitter: 'https://x.com/bxezyfnx',
        },
      },
      {
        name: 'Dixuez',
        role: 'Management',
        image: '/teams/Players/dix.png',
        game: 'Management',
        achievements: ['Team Manager', 'Infrastructure', 'Innovation'],
        socialLinks: {
          twitter: 'https://www.twitch.tv/dixuez',
        },
      },
    ],
    achievements: ['The Owners of Void Esports'],
  },
];

export default function TeamsPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`pt-20 min-h-screen bg-[#0F0F0F] transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="void-container py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white text-center stagger-child stagger-1">Our Teams</h1>
        
        <div className="scroll-reveal">
          <TeamGrid teams={teams} itemsPerPage={2} />
        </div>
      </div>
    </div>
  );
} 
