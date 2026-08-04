import React, { useState, useEffect, useRef } from 'react';
import {
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Send,
  Bot,
  User,
  Radio,
  Clock,
  Sparkle,
  HelpCircle,
  Hash,
  ChevronDown,
  Phone
} from 'lucide-react';
import { CATEGORIES, EVENT_INFO } from '../data/categories';

interface AICallAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export const AICallAssistantModal: React.FC<AICallAssistantModalProps> = ({ isOpen, onClose }) => {
  const [callState, setCallState] = useState<'idle' | 'dialing' | 'connected' | 'ended'>('dialing');
  const [seconds, setSeconds] = useState(0);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showKeypad, setShowKeypad] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentAudioSourceRef = useRef<AudioBufferSourceNode | HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize call timer and opening greeting
  useEffect(() => {
    if (!isOpen) {
      setCallState('dialing');
      setSeconds(0);
      setMessages([]);
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }
      setIsListening(false);
      return;
    }

    // Dialing animation to connected state
    const dialTimeout = setTimeout(() => {
      setCallState('connected');
      
      const welcomeText = `¡Hola! Bienvenido a la línea de atención en vivo de la ${EVENT_INFO.name}. Soy Aura, tu asistente virtual. Puedo informarte sobre las 14 categorías, nominados, predicciones o recomendarte películas. ¿De qué te gustaría hablar hoy?`;
      
      const initialMessage: Message = {
        id: 'msg-0',
        sender: 'assistant',
        text: welcomeText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages([initialMessage]);
      speakText(welcomeText, null, () => {
        // Auto-activate microphone after greeting finishes
        startListeningAuto();
      });
    }, 1800);

    return () => clearTimeout(dialTimeout);
  }, [isOpen]);

  // Helper to start listening automatically
  const startListeningAuto = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        // Already listening or permission prompt pending
      }
    }
  };

  // Call timer counter
  useEffect(() => {
    let timer: any = null;
    if (callState === 'connected') {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callState]);

  // Auto-scroll messages log
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Speech Recognition Setup (Web Speech API)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'es-ES';

        recognition.onresult = (event: any) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
          }
          if (transcript) {
            setInputText(transcript);
          }
          if (event.results[0].isFinal) {
            if (transcript.trim()) {
              handleSendMessage(transcript);
            }
            setIsListening(false);
          }
        };

        recognition.onerror = (e: any) => {
          console.warn('Speech recognition error:', e);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  // Format timer as MM:SS
  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Speak AI text response using audio base64 or SpeechSynthesis fallback
  const speakText = (text: string, base64Audio?: string | null, onEndedCallback?: () => void) => {
    if (isSpeakerMuted) {
      if (onEndedCallback) onEndedCallback();
      return;
    }

    // Stop previous audio
    if (currentAudioSourceRef.current) {
      try {
        if ('stop' in currentAudioSourceRef.current) {
          (currentAudioSourceRef.current as AudioBufferSourceNode).stop();
        } else if ('pause' in currentAudioSourceRef.current) {
          (currentAudioSourceRef.current as HTMLAudioElement).pause();
        }
      } catch (e) {
        // ignore audio stop error
      }
    }

    // Try playing base64 audio if present
    if (base64Audio) {
      try {
        const audio = new Audio(`data:audio/wav;base64,${base64Audio}`);
        audio.onended = () => {
          if (onEndedCallback) onEndedCallback();
        };
        audio.play().catch(() => {
          fallbackSpeechSynthesis(text, onEndedCallback);
        });
        currentAudioSourceRef.current = audio;
        return;
      } catch (e) {
        console.warn('Base64 audio playback failed, falling back to Web Speech synthesis', e);
      }
    }

    fallbackSpeechSynthesis(text, onEndedCallback);
  };

  // Web Speech API fallback
  const fallbackSpeechSynthesis = (text: string, onEndedCallback?: () => void) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 1.0;
      utterance.pitch = 1.05;

      utterance.onend = () => {
        if (onEndedCallback) onEndedCallback();
      };

      utterance.onerror = () => {
        if (onEndedCallback) onEndedCallback();
      };

      // Select Spanish voice if available
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find((v) => v.lang.startsWith('es'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      window.speechSynthesis.speak(utterance);
    } else {
      if (onEndedCallback) onEndedCallback();
    }
  };

  const toggleMicListening = () => {
    if (isListening) {
      try { recognitionRef.current?.stop(); } catch(e) {}
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch (e) {
          console.error('Error starting speech recognition:', e);
        }
      } else {
        alert('Tu navegador no soporta reconocimiento de voz por micrófono. Puedes escribir tu mensaje por el teclado.');
      }
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isThinking || callState !== 'connected') return;

    const userMessageTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: userMessageTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    try {
      // Build conversation history for API
      const historyPayload = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        text: m.text,
      }));

      const res = await fetch('/api/call/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userText: textToSend,
          history: historyPayload,
        }),
      });

      const data = await res.json();
      setIsThinking(false);

      const replyText = data.replyText || 'Entendido. ¿Deseas consultar alguna otra categoría de la gala?';
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      speakText(replyText, data.audioBase64, () => {
        // Auto restart microphone after Aura finishes speaking
        startListeningAuto();
      });
    } catch (err) {
      console.error('Error calling AI Voice endpoint:', err);
      setIsThinking(false);
      const fallbackText = 'Hubo un inconveniente en la señal telefónica. ¿Podrías indicarme qué categoría te interesa revisar?';
      
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'assistant',
          text: fallbackText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      speakText(fallbackText, null, () => {
        startListeningAuto();
      });
    }
  };

  const handleEndCall = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setCallState('ended');
    setTimeout(() => {
      onClose();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-lg animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[85vh] max-h-[680px]">
        
        {/* Top Call Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20">
                <Bot className="w-5 h-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Aura • Asistente IA</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold uppercase tracking-wider">
                  Voz HD
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                {callState === 'dialing' && (
                  <span className="text-blue-400 animate-pulse">Conectando llamada...</span>
                )}
                {callState === 'connected' && (
                  <>
                    <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 font-mono">En vivo ({formatTime(seconds)})</span>
                  </>
                )}
                {callState === 'ended' && <span className="text-red-400">Llamada Finalizada</span>}
              </p>
            </div>
          </div>

          <button
            onClick={handleEndCall}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            title="Cerrar ventana de llamada"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Call Visualizer Waves Header */}
        <div className="bg-slate-950/70 border-b border-slate-800/80 px-4 py-3 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-200">Línea Telefónica Directa Gala 2026</span>
          </div>

          {/* Animated Equalizer Waveform */}
          <div className="flex items-center gap-1">
            <span className="w-1 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1 h-5 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1 h-2 bg-blue-300 rounded-full animate-bounce" />
            <span className="w-1 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.2s]" />
          </div>
        </div>

        {/* Live Subtitles & Conversation Transcript */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gradient-to-b from-slate-900 via-[#0D0F16] to-slate-950 text-xs">
          {callState === 'dialing' ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-blue-500/10 border-2 border-blue-500/40 flex items-center justify-center text-blue-400 animate-ping absolute inset-0" />
                <div className="w-20 h-20 rounded-full bg-blue-500/20 border-2 border-blue-500/60 flex items-center justify-center text-blue-400 relative z-10">
                  <PhoneCall className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Estableciendo comunicación por voz...</p>
                <p className="text-xs text-blue-300/80 mt-1">
                  Conectando con el servidor estelar de la Gala de Premios
                </p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 max-w-[88%] ${
                    msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-slate-950'
                      : 'bg-slate-800 text-blue-400 border border-blue-500/30'
                  }`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4 text-slate-950" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div>
                    <div className={`p-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-blue-500 text-slate-950 font-medium rounded-tr-none shadow-md shadow-blue-500/10'
                        : 'bg-slate-800/90 text-slate-100 rounded-tl-none border border-slate-700/80 shadow-md'
                    }`}>
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block px-1">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex gap-2 mr-auto max-w-[80%] items-center">
                  <div className="w-7 h-7 rounded-full bg-slate-800 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-800/80 text-blue-200 rounded-tl-none border border-slate-700 flex items-center gap-2">
                    <span className="text-xs">Aura está procesando tu voz...</span>
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        {callState === 'connected' && (
          <div className="px-3 py-2 bg-slate-950 border-t border-slate-800/80 overflow-x-auto no-scrollbar flex items-center gap-2">
            <span className="text-[10px] text-blue-300/60 shrink-0 font-bold uppercase tracking-wider">
              Pregunta rápida:
            </span>
            <button
              onClick={() => handleSendMessage('¿Quiénes están nominados a Mejor Película?')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-blue-300 text-[11px] transition-colors hover:text-blue-200 hover:border-blue-500/30"
            >
              🎬 Mejor Película
            </button>
            <button
              onClick={() => handleSendMessage('¿Quiénes son los nominados a Mejor Actor Principal?')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-blue-300 text-[11px] transition-colors hover:text-blue-200 hover:border-blue-500/30"
            >
              🏆 Mejor Actor
            </button>
            <button
              onClick={() => handleSendMessage('Recomiéndame una película de las nominadas')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-blue-300 text-[11px] transition-colors hover:text-blue-200 hover:border-blue-500/30"
            >
              ⭐ Recomiéndame una
            </button>
          </div>
        )}

        {/* Call Controls Bar & Input */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 space-y-3">

          {/* Active Listening Visual Status Bar */}
          {callState === 'connected' && (
            <div className={`p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all ${
              isListening
                ? 'bg-red-500/10 border-red-500/40 text-red-300'
                : 'bg-slate-900 border-slate-800 text-blue-300/80'
            }`}>
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${isListening ? 'bg-red-500 animate-ping' : 'bg-blue-500'}`} />
                <span className="font-semibold">
                  {isListening ? '🎤 Micrófono Activo: Escuchando tu voz...' : 'Micrófono en espera'}
                </span>
              </div>
              <button
                type="button"
                onClick={toggleMicListening}
                className="text-[11px] underline font-bold hover:text-white transition-colors text-blue-400"
              >
                {isListening ? 'Pausar Mic' : 'Activar Micrófono'}
              </button>
            </div>
          )}
          
          {/* Main Voice Control Actions */}
          <div className="flex items-center justify-center gap-4">
            
            {/* Mic Toggle */}
            <button
              onClick={toggleMicListening}
              className={`p-3.5 rounded-full transition-all ${
                isListening
                  ? 'bg-red-500 text-white animate-bounce shadow-lg shadow-red-500/30 ring-4 ring-red-500/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-blue-200 border border-slate-700'
              }`}
              title={isListening ? 'Detener micrófono' : 'Hablar por micrófono'}
            >
              {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            {/* End Call Button */}
            <button
              onClick={handleEndCall}
              className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-600/30 transition-transform hover:scale-105 active:scale-95"
            >
              <PhoneOff className="w-4 h-4" />
              <span>Colgar Llamada</span>
            </button>

            {/* Speaker Mute/Unmute */}
            <button
              onClick={() => setIsSpeakerMuted(!isSpeakerMuted)}
              className={`p-3.5 rounded-full transition-colors ${
                isSpeakerMuted
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-blue-200 border border-slate-700'
              }`}
              title={isSpeakerMuted ? 'Activar altavoz de voz' : 'Silenciar altavoz'}
            >
              {isSpeakerMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

          </div>

          {/* Text Input Row */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={
                isListening
                  ? 'Escuchando tu voz...'
                  : 'Escribe tu mensaje para la llamada...'
              }
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={callState !== 'connected' || isListening}
              className="flex-1 bg-slate-900 border border-slate-800 focus:border-blue-500/50 text-blue-100 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500/30 placeholder:text-blue-300/40 disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isThinking || callState !== 'connected'}
              className="p-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold transition-colors disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
