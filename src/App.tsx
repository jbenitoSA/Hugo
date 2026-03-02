import React, { useState, useEffect } from 'react';
import { 
  Pill, 
  Phone, 
  Brain, 
  User, 
  CheckCircle2, 
  Trash2, 
  Plus, 
  Clock, 
  Stethoscope, 
  UserPlus, 
  Puzzle, 
  Grid3X3, 
  Calculator, 
  Image as ImageIcon,
  ArrowLeft,
  Mic,
  Video,
  Share,
  MoreHorizontal,
  PhoneOff,
  Send,
  FileText,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Types ---

type View = 'dashboard' | 'telehealth' | 'memory-game' | 'word-search' | 'number-sequences' | 'photo-memories' | 'profile';
type Difficulty = 'Fácil' | 'Medio' | 'Difícil';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
  notified?: boolean;
}

interface Contact {
  id: string;
  name: string;
  role: string;
  image: string;
  type: 'family' | 'doctor';
}

// --- Components ---

const Header = ({ currentView, setView }: { currentView: View, setView: (v: View) => void }) => (
  <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary/10 px-6 lg:px-20 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('dashboard')}>
        <span className="text-3xl">🌿</span>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Cuidarte</h1>
      </div>
      <nav className="hidden md:flex items-center gap-6">
        <button 
          onClick={() => setView('dashboard')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full transition-colors font-medium",
            currentView === 'dashboard' ? "bg-primary/20 text-slate-900" : "hover:bg-primary/10 text-slate-600"
          )}
        >
          <Pill className="w-5 h-5 text-primary" /> Medicina
        </button>
        <button 
          onClick={() => setView('telehealth')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full transition-colors font-medium",
            currentView === 'telehealth' ? "bg-primary/20 text-slate-900" : "hover:bg-primary/10 text-slate-600"
          )}
        >
          <Phone className="w-5 h-5 text-primary" /> Llamar
        </button>
        <button 
          onClick={() => setView('memory-game')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full transition-colors font-medium",
            currentView === 'memory-game' ? "bg-primary/20 text-slate-900" : "hover:bg-primary/10 text-slate-600"
          )}
        >
          <Brain className="w-5 h-5 text-primary" /> Memoria
        </button>
      </nav>
      <button 
        onClick={() => setView('profile')}
        className="bg-primary text-slate-900 px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity"
      >
        Mi Perfil
      </button>
    </div>
  </header>
);

const SOSButton = () => (
  <button className="fixed bottom-8 right-8 w-24 h-24 bg-sos-red text-white rounded-full shadow-2xl flex flex-col items-center justify-center border-4 border-white hover:scale-110 active:scale-95 transition-all z-[60]">
    <AlertCircle className="w-12 h-12 mb-1" />
    <span className="text-xs font-black">SOS</span>
  </button>
);

// --- Views ---

const Dashboard = ({ 
  setView, 
  meds, 
  setMeds, 
  contacts, 
  setContacts,
  difficulty,
  setDifficulty
}: { 
  setView: (v: View) => void, 
  meds: Medication[], 
  setMeds: React.Dispatch<React.SetStateAction<Medication[]>>,
  contacts: Contact[],
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>,
  difficulty: Difficulty,
  setDifficulty: (d: Difficulty) => void,
  key?: string 
}) => {
  const [newName, setNewName] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newTime, setNewTime] = useState('');
  
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactRole, setNewContactRole] = useState('');

  const addMed = () => {
    if (!newName || !newDosage || !newTime) return;
    const newMed: Medication = {
      id: Math.random().toString(36).substr(2, 9),
      name: newName,
      dosage: newDosage,
      time: newTime,
      taken: false,
      notified: false
    };
    setMeds([...meds, newMed]);
    setNewName('');
    setNewDosage('');
    setNewTime('');
  };

  const toggleMed = (id: string) => {
    setMeds(meds.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
  };

  const deleteMed = (id: string) => {
    setMeds(meds.filter(m => m.id !== id));
  };

  const addContact = () => {
    if (!newContactName || !newContactRole) return;
    const newContact: Contact = {
      id: Math.random().toString(36).substr(2, 9),
      name: newContactName,
      role: newContactRole,
      type: 'family',
      image: `https://picsum.photos/seed/${newContactName}/200`
    };
    setContacts([...contacts, newContact]);
    setNewContactName('');
    setNewContactRole('');
    setIsAddingContact(false);
  };

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 lg:px-20 py-10 space-y-16"
    >
      {/* Difficulty Selector */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Brain className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-bold">Nivel de Dificultad</h3>
            <p className="text-xs text-slate-500">Afecta a los juegos de memoria y mente</p>
          </div>
        </div>
        <div className="flex gap-2">
          {(['Fácil', 'Medio', 'Difícil'] as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={cn(
                "px-6 py-2 rounded-full font-bold transition-all",
                difficulty === d ? "bg-primary text-slate-900 shadow-md" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </section>

      {/* Medication Section */}
      <section className="bg-white rounded-xl p-8 shadow-sm border border-slate-100" id="medicina">
        <div className="flex items-center gap-3 mb-8">
          <Pill className="w-10 h-10 text-primary" />
          <h2 className="text-3xl font-bold">Control de Medicación</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end mb-12">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold ml-2">Nombre</label>
            <input 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full h-14 rounded-xl border-slate-200 bg-slate-50 text-lg focus:ring-primary focus:border-primary px-4" 
              placeholder="Ej: Aspirina" 
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold ml-2">Dosis</label>
            <input 
              value={newDosage}
              onChange={(e) => setNewDosage(e.target.value)}
              className="w-full h-14 rounded-xl border-slate-200 bg-slate-50 text-lg focus:ring-primary focus:border-primary px-4" 
              placeholder="Ej: 100mg" 
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold ml-2">Hora</label>
            <input 
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full h-14 rounded-xl border-slate-200 bg-slate-50 text-lg focus:ring-primary focus:border-primary px-4" 
              type="time"
            />
          </div>
          <button 
            onClick={addMed}
            className="h-14 bg-primary text-slate-900 font-bold rounded-xl text-xl hover:scale-105 transition-transform"
          >
            Agregar
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meds.map(med => (
            <div key={med.id} className={cn(
              "p-6 rounded-xl border-2 flex flex-col gap-4 transition-all",
              med.taken ? "border-primary/20 bg-primary/5" : "border-slate-100 bg-white"
            )}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">{med.name}</h3>
                  <p className="text-slate-600 font-medium">{med.dosage} • {med.time}</p>
                </div>
                <Clock className={cn("w-10 h-10", med.taken ? "text-primary" : "text-slate-300")} />
              </div>
              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => toggleMed(med.id)}
                  className={cn(
                    "flex-1 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors",
                    med.taken ? "bg-primary text-slate-900" : "border-2 border-primary text-slate-900"
                  )}
                >
                  {med.taken ? <><CheckCircle2 className="w-5 h-5" /> Tomado</> : "Marcar como tomado"}
                </button>
                <button 
                  onClick={() => deleteMed(med.id)}
                  className="p-3 text-slate-400 hover:text-sos-red transition-colors"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Calling Section */}
      <section className="bg-accent-blue rounded-xl p-8 shadow-sm" id="llamar">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4">¿Te sientes solo?</h2>
          <p className="text-xl text-slate-700 mb-8">Estamos aquí para escucharte. Llama a tus seres queridos o a un asistente.</p>
          <button 
            onClick={() => setView('telehealth')}
            className="group relative flex items-center justify-center w-64 h-64 bg-white rounded-full shadow-xl hover:scale-110 transition-transform cursor-pointer border-8 border-primary/30"
          >
            <div className="flex flex-col items-center gap-2">
              <Phone className="w-20 h-20 text-primary animate-pulse" />
              <span className="text-xl font-bold">Llamar Ahora</span>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {contacts.map(contact => (
            <div key={contact.id} className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-full bg-white p-1 ring-4 ring-primary/20 overflow-hidden">
                <img className="w-full h-full object-cover rounded-full" src={contact.image} alt={contact.name} referrerPolicy="no-referrer" />
              </div>
              <p className="font-bold text-lg">{contact.name}</p>
              <button 
                onClick={() => setView('telehealth')}
                className="bg-primary/20 text-sky-900 px-4 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-primary/40 transition-colors"
              >
                {contact.type === 'doctor' ? <Stethoscope className="w-4 h-4" /> : <Phone className="w-4 h-4" />} Llamar
              </button>
            </div>
          ))}
          <div className="flex flex-col items-center gap-3">
            <button 
              onClick={() => setIsAddingContact(true)}
              className="w-24 h-24 rounded-full bg-white p-1 ring-4 ring-primary/20 overflow-hidden flex items-center justify-center hover:scale-105 transition-transform"
            >
              <UserPlus className="w-12 h-12 text-primary/40" />
            </button>
            <p className="font-bold text-lg">Añadir</p>
            <button 
              onClick={() => setIsAddingContact(true)}
              className="bg-slate-200 text-slate-700 px-4 py-2 rounded-full font-bold"
            >
              Nuevo
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isAddingContact && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm"
            >
              <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Nuevo Contacto</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-bold text-slate-400 uppercase">Nombre</label>
                    <input 
                      value={newContactName}
                      onChange={(e) => setNewContactName(e.target.value)}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl mt-1"
                      placeholder="Nombre del contacto"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-400 uppercase">Parentesco / Rol</label>
                    <input 
                      value={newContactRole}
                      onChange={(e) => setNewContactRole(e.target.value)}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl mt-1"
                      placeholder="Ej: Hijo, Vecino, etc."
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={() => setIsAddingContact(false)}
                      className="flex-1 py-4 rounded-xl font-bold bg-slate-100 text-slate-500"
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={addContact}
                      className="flex-1 py-4 rounded-xl font-bold bg-primary text-slate-900"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Memory Section */}
      <section className="bg-accent-yellow rounded-xl p-8 shadow-sm" id="memoria">
        <div className="flex items-center gap-3 mb-8">
          <Brain className="w-10 h-10 text-amber-600 font-bold" />
          <h2 className="text-3xl font-bold">Ejercita tu Mente</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Juego de Memoria', icon: Puzzle, view: 'memory-game' },
            { name: 'Sopa de Letras', icon: Grid3X3, view: 'word-search' },
            { name: 'Secuencias Numéricas', icon: Calculator, view: 'number-sequences' },
            { name: 'Recuerdos con Fotos', icon: ImageIcon, view: 'photo-memories' },
          ].map((game, i) => (
            <button 
              key={i}
              onClick={() => setView(game.view as View)}
              className="flex flex-col items-center gap-4 p-8 bg-white rounded-xl shadow-md hover:translate-y-[-4px] transition-transform"
            >
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
                <game.icon className="w-10 h-10 text-amber-600" />
              </div>
              <span className="text-xl font-bold text-center">{game.name}</span>
            </button>
          ))}
        </div>
      </section>
    </motion.main>
  );
};

const Telehealth = ({ setView }: { setView: (v: View) => void, key?: string }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-[#0a0f1d] z-[100] flex flex-col"
    >
      {/* Top Bar */}
      <div className="p-6 flex items-center justify-between text-white">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg">ElderCare Connect</h2>
            <p className="text-xs text-slate-400">TELEHEALTH SESSION</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            LIVE CONSULTATION
          </div>
          <div className="flex items-center gap-3 border-l border-slate-700 pl-4">
            <div className="text-right">
              <p className="font-bold text-sm">Dr. Sarah Jenkins</p>
              <p className="text-xs text-slate-400">Geriatric Specialist</p>
            </div>
            <img src="https://picsum.photos/seed/doctor2/100" className="w-10 h-10 rounded-full border-2 border-primary" alt="Doctor" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>

      <div className="flex-grow flex p-6 gap-6 overflow-hidden">
        {/* Main Video Area */}
        <div className="flex-grow relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800">
          <img 
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1000" 
            className="w-full h-full object-cover" 
            alt="Doctor Video"
            referrerPolicy="no-referrer"
          />
          
          {/* Patient PiP */}
          <div className="absolute top-6 right-6 w-64 aspect-video bg-slate-800 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1544120190-27583f22744c?auto=format&fit=crop&q=80&w=400" 
              className="w-full h-full object-cover" 
              alt="Patient Video"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white">
              You (Patient)
            </div>
          </div>

          <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Dr. Sarah Jenkins</span>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-96 bg-white rounded-3xl flex flex-col overflow-hidden">
          <div className="flex border-b">
            <button className="flex-1 py-4 font-bold text-primary border-b-2 border-primary flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" /> Notes
            </button>
            <button className="flex-1 py-4 font-bold text-slate-400 flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Chat
            </button>
          </div>

          <div className="flex-grow p-6 overflow-y-auto space-y-8">
            <div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Patient Information</h3>
              <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Name</span>
                  <span className="text-sm font-bold">Martha Stewart</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Last BP</span>
                  <span className="text-sm font-bold text-blue-600">120/80 mmHg</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Live Notes</h3>
              <ul className="space-y-4">
                {[
                  'Continue daily vitamin D supplements.',
                  'Walk for at least 15 minutes daily to maintain mobility.',
                  'Reviewing previous lab results for blood sugar...'
                ].map((note, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="mt-1">
                      {i === 2 ? <Clock className="w-4 h-4 text-slate-300" /> : <CheckCircle2 className="w-4 h-4 text-primary" />}
                    </div>
                    <p className={cn("text-sm", i === 2 ? "text-slate-400 italic" : "text-slate-700")}>{note}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Shared Documents</h3>
              <div className="space-y-3">
                <div className="p-4 border border-slate-100 rounded-2xl flex items-center gap-4 hover:bg-slate-50 cursor-pointer transition-colors">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <FileText className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Blood_Report_Jan.pdf</p>
                    <p className="text-[10px] text-slate-400 uppercase">Shared by patient • 2.4 MB</p>
                  </div>
                </div>
                <div className="p-4 border border-slate-100 rounded-2xl flex items-center gap-4 hover:bg-slate-50 cursor-pointer transition-colors">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <ImageIcon className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Rash_Photo_01.jpg</p>
                    <p className="text-[10px] text-slate-400 uppercase">Shared by patient • 1.1 MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t">
            <div className="relative">
              <input 
                className="w-full bg-slate-100 rounded-full py-3 px-6 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" 
                placeholder="Type a note or question..."
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-8 flex items-center justify-center gap-4">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className={cn("w-14 h-14 rounded-full flex items-center justify-center transition-colors", isMuted ? "bg-red-500 text-white" : "bg-slate-800 text-white hover:bg-slate-700")}
        >
          <Mic className="w-6 h-6" />
        </button>
        <button 
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={cn("w-14 h-14 rounded-full flex items-center justify-center transition-colors", isVideoOff ? "bg-red-500 text-white" : "bg-slate-800 text-white hover:bg-slate-700")}
        >
          <Video className="w-6 h-6" />
        </button>
        <button className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-500 transition-colors">
          <Share className="w-6 h-6" />
        </button>
        <button className="w-14 h-14 rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700 transition-colors">
          <MoreHorizontal className="w-6 h-6" />
        </button>
        <div className="w-px h-10 bg-slate-700 mx-2" />
        <button 
          onClick={() => setView('dashboard')}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-colors"
        >
          <PhoneOff className="w-6 h-6" /> End Call
        </button>
      </div>
    </motion.div>
  );
};

const WordSearch = ({ setView, difficulty }: { setView: (v: View) => void, difficulty: Difficulty, key?: string }) => {
  const getGridSize = () => {
    if (difficulty === 'Fácil') return 6;
    if (difficulty === 'Medio') return 8;
    return 10;
  };

  const gridSize = getGridSize();
  const grid = Array(gridSize).fill(0).map(() => Array(gridSize).fill('A').map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26))));
  
  // Simple word placement for demo
  const words = difficulty === 'Fácil' ? ['AMOR', 'VIDA'] : difficulty === 'Medio' ? ['MEDICINA', 'SALUD', 'PAZ'] : ['BIENESTAR', 'FELICIDAD', 'MEMORIA', 'CUIDADO'];
  
  const [found, setFound] = useState<string[]>([]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex flex-col">
      <section className="bg-accent-yellow py-8 px-6 lg:px-20 border-b border-amber-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => setView('dashboard')} className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-bold shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors">
              <ArrowLeft className="w-5 h-5" /> Volver
            </button>
            <h2 className="text-4xl font-extrabold text-amber-900">Sopa de Letras</h2>
          </div>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-6 py-12 flex-grow grid md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-3xl shadow-xl border-8 border-primary/10">
          <div className="grid grid-cols-8 gap-2">
            {grid.flat().map((letter, i) => (
              <div key={i} className="aspect-square flex items-center justify-center bg-slate-50 rounded-lg text-xl font-bold text-slate-700 hover:bg-primary/20 cursor-pointer transition-colors">
                {letter}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-800">Palabras a encontrar:</h3>
          <div className="flex flex-wrap gap-3">
            {words.map(word => (
              <span key={word} className={cn(
                "px-6 py-3 rounded-full font-bold text-lg transition-all",
                found.includes(word) ? "bg-primary text-slate-900 line-through opacity-50" : "bg-white border-2 border-slate-100 text-slate-600"
              )}>
                {word}
              </span>
            ))}
          </div>
          <p className="text-slate-500 italic">Toca las letras en el tablero para marcar las palabras.</p>
        </div>
      </section>
    </motion.div>
  );
};

const NumberSequences = ({ setView, difficulty }: { setView: (v: View) => void, difficulty: Difficulty, key?: string }) => {
  const [current, setCurrent] = useState(0);
  const sequences = difficulty === 'Fácil' 
    ? [
        { seq: [1, 2, 3, 4, '?'], ans: 5 },
        { seq: [10, 20, 30, 40, '?'], ans: 50 },
      ]
    : difficulty === 'Medio'
    ? [
        { seq: [2, 4, 6, 8, '?'], ans: 10 },
        { seq: [5, 10, 15, 20, '?'], ans: 25 },
      ]
    : [
        { seq: [1, 3, 9, 27, '?'], ans: 81 },
        { seq: [2, 6, 18, 54, '?'], ans: 162 },
      ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex flex-col">
      <section className="bg-accent-yellow py-8 px-6 lg:px-20 border-b border-amber-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => setView('dashboard')} className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-bold shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors">
              <ArrowLeft className="w-5 h-5" /> Volver
            </button>
            <h2 className="text-4xl font-extrabold text-amber-900">Secuencias Numéricas</h2>
          </div>
        </div>
      </section>
      <section className="max-w-2xl mx-auto px-6 py-20 flex-grow flex flex-col items-center justify-center text-center">
        <div className="bg-white p-12 rounded-3xl shadow-2xl border-8 border-primary/20 w-full">
          <h3 className="text-2xl font-bold text-slate-400 mb-8 uppercase tracking-widest">¿Qué número sigue?</h3>
          <div className="flex justify-center gap-4 mb-12">
            {sequences[current].seq.map((n, i) => (
              <div key={i} className={cn(
                "w-20 h-24 rounded-2xl flex items-center justify-center text-4xl font-black shadow-inner",
                n === '?' ? "bg-primary/20 text-primary border-4 border-dashed border-primary" : "bg-slate-50 text-slate-800"
              )}>
                {n}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[sequences[current].ans, sequences[current].ans + 5, sequences[current].ans - 2, sequences[current].ans * 2].sort().map(opt => (
              <button key={opt} onClick={() => opt === sequences[current].ans && setCurrent((current + 1) % sequences.length)} className="py-6 bg-slate-50 rounded-2xl text-2xl font-bold hover:bg-primary hover:text-white transition-all">
                {opt}
              </button>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const PhotoMemories = ({ setView }: { setView: (v: View) => void, key?: string }) => {
  const memories = [
    { id: 1, title: 'Boda de María', date: 'Junio 1985', image: 'https://picsum.photos/seed/wedding/800/600', desc: 'Un día maravilloso en el jardín.' },
    { id: 2, title: 'Viaje a la Playa', date: 'Agosto 1992', image: 'https://picsum.photos/seed/beach/800/600', desc: 'Toda la familia reunida bajo el sol.' },
    { id: 3, title: 'Primer día de Juan', date: 'Septiembre 1990', image: 'https://picsum.photos/seed/school/800/600', desc: 'Juan estaba muy emocionado con su mochila nueva.' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex flex-col">
      <section className="bg-accent-yellow py-8 px-6 lg:px-20 border-b border-amber-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => setView('dashboard')} className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-bold shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors">
              <ArrowLeft className="w-5 h-5" /> Volver
            </button>
            <h2 className="text-4xl font-extrabold text-amber-900">Recuerdos con Fotos</h2>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-12 flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {memories.map(m => (
          <div key={m.id} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 group">
            <div className="aspect-video overflow-hidden">
              <img src={m.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={m.title} referrerPolicy="no-referrer" />
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-slate-800">{m.title}</h3>
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold">{m.date}</span>
              </div>
              <p className="text-slate-600 leading-relaxed">{m.desc}</p>
            </div>
          </div>
        ))}
        <button className="border-4 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-4 text-slate-400 hover:bg-slate-50 hover:border-primary/50 hover:text-primary transition-all p-12">
          <Plus className="w-16 h-16" />
          <span className="text-xl font-bold">Añadir Recuerdo</span>
        </button>
      </section>
    </motion.div>
  );
};

const Profile = ({ setView }: { setView: (v: View) => void, key?: string }) => {
  const [profile, setProfile] = useState({
    name: 'Martha Stewart',
    age: '78',
    phone: '+34 600 000 000',
    emergencyContact: 'Hija María (+34 611 111 111)',
    address: 'Calle Mayor 12, Madrid',
    bloodType: 'O+',
    allergies: 'Penicilina'
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex flex-col">
      <section className="bg-white py-8 px-6 lg:px-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => setView('dashboard')} className="flex items-center gap-2 bg-slate-50 px-6 py-3 rounded-xl font-bold shadow-sm border border-slate-200 hover:bg-slate-100 transition-colors">
              <ArrowLeft className="w-5 h-5" /> Volver
            </button>
            <h2 className="text-4xl font-extrabold text-slate-900">Mi Perfil</h2>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={cn(
              "px-8 py-3 rounded-full font-bold transition-all",
              isEditing ? "bg-slate-900 text-white" : "bg-primary text-slate-900"
            )}
          >
            {isEditing ? 'Guardar Cambios' : 'Editar Perfil'}
          </button>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12 flex-grow w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-primary h-32 relative">
            <div className="absolute -bottom-16 left-12 w-32 h-32 rounded-full border-8 border-white bg-white shadow-xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1544120190-27583f22744c?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Profile" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="pt-20 p-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(profile).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{key.replace(/([A-Z])/g, ' $1')}</label>
                {isEditing ? (
                  <input 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none"
                    value={value}
                    onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                  />
                ) : (
                  <p className="text-xl font-bold text-slate-800">{value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 p-8 bg-red-50 border-2 border-red-100 rounded-3xl flex items-center gap-6">
          <div className="bg-red-500 p-4 rounded-2xl text-white">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-900">Información Crítica</h3>
            <p className="text-red-700">Esta información será visible para los servicios de emergencia si presionas el botón SOS.</p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const MemoryGame = ({ setView, difficulty }: { setView: (v: View) => void, difficulty: Difficulty, key?: string }) => {
  const getIconCount = () => {
    if (difficulty === 'Fácil') return 4;
    if (difficulty === 'Medio') return 6;
    return 8;
  };

  const allIcons = ['🍎', '🍌', '🍇', '🍒', '🍓', '🥝', '🍍', '🥥'];
  const [cards, setCards] = useState<{ id: number, icon: string, flipped: boolean, matched: boolean }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const count = getIconCount();
    const icons = allIcons.slice(0, count);
    const shuffled = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((icon, i) => ({ id: i, icon, flipped: false, matched: false }));
    setCards(shuffled);
  }, [difficulty]);

  const handleFlip = (id: number) => {
    if (flipped.length === 2 || cards[id].flipped || cards[id].matched) return;

    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].icon === cards[second].icon) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].matched = true;
          matchedCards[second].matched = true;
          setCards(matchedCards);
          setFlipped([]);
          setScore(s => s + 20);
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].flipped = false;
          resetCards[second].flipped = false;
          setCards(resetCards);
          setFlipped([]);
        }, 1000);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col"
    >
      <section className="bg-accent-yellow py-8 px-6 lg:px-20 border-b border-amber-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setView('dashboard')}
              className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-bold shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" /> Volver
            </button>
            <h2 className="text-4xl font-extrabold text-amber-900">Juego de Memoria</h2>
          </div>
          <div className="bg-white px-8 py-3 rounded-2xl shadow-md border-4 border-primary/30 flex items-center gap-4">
            <span className="text-lg font-medium text-slate-500">Puntuación:</span>
            <span className="text-3xl font-black text-slate-900">{score}</span>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 flex-grow">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
          {cards.map((card) => (
            <button 
              key={card.id}
              onClick={() => handleFlip(card.id)}
              className={cn(
                "aspect-[3/4] rounded-2xl shadow-lg border-4 transition-all duration-500 transform-gpu",
                card.flipped || card.matched 
                  ? "bg-white border-primary rotate-y-180" 
                  : "card-pattern border-white hover:scale-105"
              )}
            >
              <div className="flex flex-col items-center justify-center h-full">
                {card.flipped || card.matched ? (
                  <span className="text-6xl">{card.icon}</span>
                ) : (
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-inner">
                    <span className="text-4xl">🌿</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </section>

      <footer className="py-12 text-center">
        <p className="text-3xl md:text-4xl font-bold text-slate-700">¡Encuentra las parejas!</p>
      </footer>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [difficulty, setDifficulty] = useState<Difficulty>('Medio');
  
  const [meds, setMeds] = useState<Medication[]>([
    { id: '1', name: 'Aspirina', dosage: '100mg', time: '08:00', taken: true, notified: false },
    { id: '2', name: 'Vitamina D', dosage: '1 cápsula', time: '12:00', taken: false, notified: false },
  ]);

  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Hija María', role: 'Hija', type: 'family', image: 'https://picsum.photos/seed/maria/200' },
    { id: '2', name: 'Hijo Juan', role: 'Hijo', type: 'family', image: 'https://picsum.photos/seed/juan/200' },
    { id: '3', name: 'Dr. Ramos', role: 'Geriatra', type: 'doctor', image: 'https://picsum.photos/seed/doctor/200' },
  ]);

  const [alert, setAlert] = useState<string | null>(null);

  // Medication Alert System
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      setMeds(prevMeds => {
        const updatedMeds = [...prevMeds];
        let changed = false;
        
        updatedMeds.forEach(med => {
          if (med.time === currentTime && !med.notified && !med.taken) {
            setAlert(`¡Es hora de tomar tu ${med.name} (${med.dosage})!`);
            med.notified = true;
            changed = true;
          }
        });
        
        return changed ? updatedMeds : prevMeds;
      });
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background-light">
      <Header currentView={view} setView={setView} />
      
      <AnimatePresence mode="wait">
        {view === 'dashboard' && (
          <Dashboard 
            key="dashboard" 
            setView={setView} 
            meds={meds} 
            setMeds={setMeds} 
            contacts={contacts} 
            setContacts={setContacts}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        )}
        {view === 'telehealth' && <Telehealth key="telehealth" setView={setView} />}
        {view === 'memory-game' && <MemoryGame key="memory-game" setView={setView} difficulty={difficulty} />}
        {view === 'word-search' && <WordSearch key="word-search" setView={setView} difficulty={difficulty} />}
        {view === 'number-sequences' && <NumberSequences key="number-sequences" setView={setView} difficulty={difficulty} />}
        {view === 'photo-memories' && <PhotoMemories key="photo-memories" setView={setView} />}
        {view === 'profile' && <Profile key="profile" setView={setView} />}
      </AnimatePresence>

      {view !== 'telehealth' && <SOSButton />}

      {/* Alert Modal */}
      <AnimatePresence>
        {alert && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-6"
          >
            <div className="bg-white rounded-2xl shadow-2xl border-4 border-primary p-6 flex items-center gap-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <Pill className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-lg">Recordatorio de Medicina</h4>
                <p className="text-slate-600">{alert}</p>
              </div>
              <button 
                onClick={() => setAlert(null)}
                className="bg-primary text-slate-900 px-4 py-2 rounded-lg font-bold"
              >
                Entendido
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Footer Spacer */}
      <div className="h-32" />
    </div>
  );
}
