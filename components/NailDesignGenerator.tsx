import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, Info } from 'lucide-react';
import { generateNailArtImage } from '../services/geminiService.ts';
import { LoadingState } from '../types.ts';

export const NailDesignGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setStatus(LoadingState.LOADING);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateNailArtImage(prompt);
      if (imageUrl) {
        setGeneratedImage(imageUrl);
        setStatus(LoadingState.SUCCESS);
      } else {
        throw new Error("No image data received.");
      }
    } catch (err) {
      console.error(err);
      setStatus(LoadingState.ERROR);
    }
  };

  return (
    <div className="w-full mt-12 mb-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="inline-block py-1 px-3 border border-stone-200 rounded-full text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase bg-white mb-3">
          Beta Feature
        </span>
        <h2 className="font-serif text-3xl text-stone-900 italic mb-2">
          The Design Atelier
        </h2>
        <p className="text-stone-500 text-sm max-w-xs mx-auto font-light leading-relaxed">
          Describe your mood or outfit, and our AI will visualize a bespoke nail art concept for your next appointment.
        </p>
      </div>

      <div className="bg-stone-900 rounded-2xl p-1 shadow-2xl overflow-hidden">
        <div className="bg-stone-900 p-6 sm:p-8 rounded-xl border border-stone-800 relative overflow-hidden">
          
          {/* Decorative background gradients */}
          <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-rose-900/20 rounded-full blur-[80px]" />
          <div className="absolute bottom-[-50%] left-[-10%] w-64 h-64 bg-stone-700/20 rounded-full blur-[80px]" />

          <form onSubmit={handleGenerate} className="relative z-10 flex flex-col gap-5">
            <div className="relative">
              <label className="text-xs text-stone-400 font-medium tracking-widest uppercase mb-2 block ml-1">
                Your Vision
              </label>
              <div className="flex items-center border-b border-stone-700 focus-within:border-stone-400 transition-colors py-2">
                <Sparkles className="w-5 h-5 text-stone-500 mr-3" />
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Marble texture with gold foil accents..."
                  className="w-full bg-transparent text-white placeholder-stone-600 outline-none font-sans text-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === LoadingState.LOADING || !prompt.trim()}
              className="group flex items-center justify-between w-full bg-white hover:bg-stone-100 text-stone-900 py-4 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              <span className="font-medium tracking-wide">
                {status === LoadingState.LOADING ? 'Rendering Concept...' : 'Generate Design'}
              </span>
              {status === LoadingState.LOADING ? (
                <Loader2 className="w-5 h-5 animate-spin text-stone-400" />
              ) : (
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </form>

          {/* Results Area */}
          <div className={`transition-all duration-700 ease-in-out overflow-hidden ${generatedImage ? 'max-h-[500px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
             <div className="bg-white p-3 rounded-lg transform rotate-1 hover:rotate-0 transition-transform duration-500 shadow-lg max-w-sm mx-auto">
               <div className="aspect-square w-full overflow-hidden rounded bg-stone-100 mb-3">
                 {generatedImage && (
                    <img 
                        src={generatedImage} 
                        alt="AI Generated Design" 
                        className="w-full h-full object-cover animate-fade-in"
                    />
                 )}
               </div>
               <div className="flex justify-between items-end px-1">
                  <div>
                    <p className="font-serif text-stone-900 text-lg leading-none">Concept Art</p>
                    <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">AI Generated • {new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full border border-stone-200 flex items-center justify-center">
                    <span className="font-serif italic font-bold text-stone-900 text-xs">NL</span>
                  </div>
               </div>
             </div>
             <p className="text-center text-stone-500 text-xs mt-6 font-light">
               <Info className="w-3 h-3 inline mr-1" />
               Capture this image and share it with Miral for your booking.
             </p>
          </div>
          
          {status === LoadingState.ERROR && (
             <div className="mt-6 text-center text-rose-300 text-sm font-light animate-fade-in">
               Please try again in a moment.
             </div>
          )}
        </div>
      </div>
    </div>
  );
};