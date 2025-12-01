import React from 'react';
import { SocialLinkProps } from '../types.ts';
import { ArrowUpRight } from 'lucide-react';

export const SocialButton: React.FC<SocialLinkProps> = ({ label, url, icon: Icon, description }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-between w-full p-5 bg-white border border-stone-200 hover:border-stone-400 transition-all duration-300 ease-out mb-3 rounded-lg hover:shadow-lg hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-stone-50 text-stone-600 group-hover:bg-stone-900 group-hover:text-white transition-colors duration-300">
          <Icon size={18} strokeWidth={1.5} />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-serif text-lg font-medium text-stone-800 tracking-wide group-hover:text-black">{label}</span>
          {description && (
            <span className="text-xs font-sans text-stone-500 font-light tracking-wide uppercase group-hover:text-stone-600 transition-colors">
              {description}
            </span>
          )}
        </div>
      </div>
      
      <ArrowUpRight 
        size={20} 
        className="text-stone-300 group-hover:text-stone-800 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" 
      />
    </a>
  );
};