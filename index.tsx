import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Instagram, 
  MapPin, 
  Phone, 
  Youtube, 
  Star, 
  MessageSquare,
  Sparkles,
  ArrowRight, 
  Loader2, 
  Info,
  ArrowUpRight,
  LucideIcon
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

export interface SocialLinkProps {
  label: string;
  url: string;
  icon: LucideIcon;
  colorClass: string; // Kept for interface compatibility, though unused in new UI
  description?: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

// -----------------------------------------------------------------------------
// SERVICES
// -----------------------------------------------------------------------------

/**
 * Generates a nail art image based on a user prompt using Gemini 2.5 Flash Image.
 */
const generateNailArtImage = async (prompt: string): Promise<string | null> => {
  try {
    // Initialize Gemini API Client inside the function to avoid init errors
    const apiKey = process.env.API_KEY || ''; 
    if (!apiKey) {
        console.warn("API Key is missing. AI features will not work.");
        return null;
    }

    const ai = new GoogleGenAI({ apiKey });

    const fullPrompt = `Professional nail art design, macro photography style, high resolution, realistic texture. The design should be: ${prompt}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: fullPrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        },
      },
    });

    // Iterate through parts to find the image data
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          return `data:image/png;base64,${base64EncodeString}`;
        }
      }
    }
    
    return null;

  } catch (error) {
    console.error("Error generating nail art:", error);
    throw error;
  }
};

// -----------------------------------------------------------------------------
// COMPONENTS
// -----------------------------------------------------------------------------

const SocialButton: React.FC<SocialLinkProps> = ({ label, url, icon: Icon, description }) => {
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

const NailDesignGenerator: React.FC = () => {
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

// -----------------------------------------------------------------------------
// APP DATA
// -----------------------------------------------------------------------------

const WHATSAPP_NUMBER = '917016531812';

const socialLinks: SocialLinkProps[] = [
  {
    label: 'Book Appointment',
    url: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: Phone,
    colorClass: 'bg-stone-900', 
    description: 'Direct booking via WhatsApp'
  },
  {
    label: 'Portfolio',
    url: 'https://www.instagram.com/naillogic_?igsh=Z3QzYjdpMjZkZjF2&utm_source=qr',
    icon: Instagram,
    colorClass: 'bg-stone-900',
    description: 'Latest works on Instagram'
  },
  {
    label: 'Client Reviews',
    url: 'https://share.google/atYnn1ueXubRQMgyN',
    icon: Star,
    colorClass: 'bg-stone-900',
    description: 'Read 5-star experiences'
  },
  {
    label: 'Salon Location',
    url: 'https://maps.app.goo.gl/cuYYxd4jJe3t3JSw6?g_st=ipc',
    icon: MapPin,
    colorClass: 'bg-stone-900',
    description: 'Navigate to studio'
  },
  {
    label: 'Tutorials',
    url: 'https://youtube.com/@naillogic7171?si=Y5URwuhWRpIMt8MC',
    icon: Youtube,
    colorClass: 'bg-stone-900',
    description: 'Watch on YouTube'
  },
  {
    label: 'Write a Review',
    url: 'https://search.google.com/local/writereview?placeid=ChIJ3-d4949ZYzkRls9rK18u2TI',
    icon: MessageSquare,
    colorClass: 'bg-stone-900',
    description: 'Share your experience'
  }
];

// -----------------------------------------------------------------------------
// APP COMPONENT
// -----------------------------------------------------------------------------

const App: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      
      {/* Editorial Background Element - Subtle Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-rose-100/40 to-stone-100/40 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-stone-200/40 to-white rounded-full blur-[100px] opacity-60" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-12 md:py-16 flex flex-col items-center">
        
        {/* Editorial Header */}
        <header className="flex flex-col items-center mb-12 w-full animate-slide-up">
          <div className="mb-6 relative group cursor-default">
            <div className="absolute inset-0 bg-stone-200 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full border border-stone-200 bg-white shadow-sm flex items-center justify-center overflow-hidden">
               <span className="font-serif font-bold text-3xl text-stone-900 italic">NL</span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full border border-stone-100 shadow-sm">
              <Sparkles className="w-4 h-4 text-stone-400" />
            </div>
          </div>
          
          <div className="text-center space-y-1">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 tracking-tight">
              Nail Logic
            </h1>
            <div className="flex items-center justify-center gap-3 text-stone-500 text-sm font-sans tracking-widest uppercase mt-3">
              <span className="h-px w-8 bg-stone-300"></span>
              <span>By Miral Mehta</span>
              <span className="h-px w-8 bg-stone-300"></span>
            </div>
          </div>
        </header>

        {/* Main Navigation Links */}
        <main className="w-full flex flex-col gap-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {socialLinks.map((link, index) => (
            <SocialButton key={index} {...link} />
          ))}
        </main>

        {/* Separator */}
        <div className="w-full py-8 flex justify-center opacity-30">
          <div className="w-1 h-8 border-l border-dashed border-stone-400"></div>
        </div>

        {/* AI Tool */}
        <div className="w-full animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <NailDesignGenerator />
        </div>

        {/* Minimal Footer */}
        <footer className="mt-12 text-center text-stone-400 text-xs font-light tracking-wide uppercase">
          <p className="mb-2">© {new Date().getFullYear()} Nail Logic</p>
          <div className="flex items-center justify-center gap-1.5 opacity-50">
            <span>Mumbai</span>
            <span className="w-1 h-1 rounded-full bg-stone-400"></span>
            <span>India</span>
          </div>
        </footer>

      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// MOUNTING
// -----------------------------------------------------------------------------

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
