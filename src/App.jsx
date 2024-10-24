import React, { useState } from 'react';

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://back-enhanc-prompt.vercel.app/enhance/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la requête');
      }

      const data = await response.json();
      setPrompt(data.enhancePrompt);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de la soumission du prompt.');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-8 backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-center">
          Welcome to Prompt Enhance
        </h1>

        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            name="prompt"
            id="prompt"
            className="w-full h-64 bg-slate-800/50 text-cyan-50 placeholder-cyan-300/50 rounded-xl p-4 border border-cyan-500/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-300 resize-none"
            placeholder="Enter your prompt here..."
          />
          <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-tr from-cyan-500/10 to-purple-500/10" />
        </div>

        <div className="flex justify-center">
          <button
            id="submit"
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center transition duration-300 transform hover:scale-105 active:scale-95"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="animate-spin h-5 w-5 mr-3 text-white"
                >
                  <circle
                    strokeWidth="4"
                    stroke="currentColor"
                    r="10"
                    cy="12"
                    cx="12"
                    className="opacity-25"
                  ></circle>
                  <path
                    d="M4 12a8 8 0 018-8v8H4z"
                    fill="currentColor"
                    className="opacity-75"
                  ></path>
                </svg>
                Loading...
              </>
            ) : (
              "Enhance"
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
