import { useState } from 'react';
import { Search, Menu } from 'lucide-react';
import { MushroomCard } from './components/MushroomCard';
import { MushroomDetail } from './components/MushroomDetail';
import { MushroomIdentifier } from './components/MushroomIdentifier';
import { mushroomData } from './data/mushrooms';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMushroom, setSelectedMushroom] = useState<string | null>(null);
  const [filterEdibility, setFilterEdibility] = useState<string>('all');

  const filteredMushrooms = mushroomData.filter(mushroom => {
    const matchesSearch = mushroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mushroom.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterEdibility === 'all' || mushroom.edibility === filterEdibility;
    return matchesSearch && matchesFilter;
  });

  const selectedMushroomData = mushroomData.find(m => m.id === selectedMushroom);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Minimalist Header */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-6 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <h1 className="text-stone-900 tracking-tight">MushroomID</h1>
            <nav className="hidden md:flex gap-8">
              <button 
                onClick={() => setFilterEdibility('all')}
                className={`transition-colors ${filterEdibility === 'all' ? 'text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
              >
                Collection
              </button>
              <button 
                onClick={() => setFilterEdibility('edible')}
                className={`transition-colors ${filterEdibility === 'edible' ? 'text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
              >
                Edible
              </button>
              <button 
                onClick={() => setFilterEdibility('poisonous')}
                className={`transition-colors ${filterEdibility === 'poisonous' ? 'text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
              >
                Poisonous
              </button>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search species..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-stone-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-stone-300 w-64 transition-all"
              />
            </div>
            <button className="md:hidden">
              <Menu className="w-6 h-6 text-stone-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-stone-100 via-amber-50 to-stone-100 border-b border-stone-200">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-stone-900 leading-tight">
                  Informed foraging supports science, outdoor education, food systems, ecology, etc.
                </h2>
                <p className="text-stone-600 max-w-lg leading-relaxed">
                  Explore our comprehensive database of mushroom species. Identify, learn, and forage responsibly with expert guidance.
                </p>
              </div>
              
              <div className="flex gap-4 flex-wrap">
                <button className="px-8 py-3 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors">
                  Start Identifying
                </button>
                <button className="px-8 py-3 border-2 border-stone-300 text-stone-900 rounded-full hover:border-stone-400 transition-colors">
                  Learn More
                </button>
              </div>
              
              <div className="flex gap-8 pt-8">
                <div>
                  <div className="text-3xl text-stone-900">{mushroomData.length}</div>
                  <div className="text-stone-500">Species</div>
                </div>
                <div>
                  <div className="text-3xl text-stone-900">{mushroomData.filter(m => m.edibility === 'edible').length}</div>
                  <div className="text-stone-500">Edible</div>
                </div>
                <div>
                  <div className="text-3xl text-stone-900">100%</div>
                  <div className="text-stone-500">Verified</div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1633859159647-11134b20658f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" 
                  alt="Featured mushroom"
                  className="w-full h-[600px] object-cover rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Identifier */}
      <section className="border-b border-stone-200 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-16">
          <MushroomIdentifier />
        </div>
      </section>

      {/* Search Section - Mobile */}
      <div className="lg:hidden max-w-[1600px] mx-auto px-8 py-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search species..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-stone-300"
          />
        </div>
      </div>

      {/* Collection Grid */}
      <section className="bg-stone-50">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-16">
          <div className="mb-12">
            <h3 className="text-stone-900 mb-2">
              {filterEdibility === 'all' ? 'Complete Collection' : 
               filterEdibility === 'edible' ? 'Edible Species' : 
               filterEdibility === 'poisonous' ? 'Poisonous Species' : 'Inedible Species'}
            </h3>
            <p className="text-stone-500">
              {filteredMushrooms.length} {filteredMushrooms.length === 1 ? 'species' : 'species'} found
            </p>
          </div>

          {filteredMushrooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMushrooms.map(mushroom => (
                <MushroomCard
                  key={mushroom.id}
                  mushroom={mushroom}
                  onClick={() => setSelectedMushroom(mushroom.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="text-6xl mb-4 opacity-20">🔍</div>
              <p className="text-stone-500">No species found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h4 className="text-stone-900 mb-4">MushroomID</h4>
              <p className="text-stone-500 max-w-md">
                Educational resource for mushroom identification. Always consult with expert mycologists before consuming wild mushrooms.
              </p>
            </div>
            <div>
              <h5 className="text-stone-900 mb-4">Resources</h5>
              <ul className="space-y-2 text-stone-500">
                <li>Field Guide</li>
                <li>Safety Tips</li>
                <li>Foraging Ethics</li>
              </ul>
            </div>
            <div>
              <h5 className="text-stone-900 mb-4">Connect</h5>
              <ul className="space-y-2 text-stone-500">
                <li>Community</li>
                <li>Support</li>
                <li>About</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-stone-200 text-stone-400 text-center">
            © 2025 MushroomID. For educational purposes only.
          </div>
        </div>
      </footer>

      {/* Detail Modal with Dynamic Colors */}
      {selectedMushroomData && (
        <MushroomDetail
          mushroom={selectedMushroomData}
          onClose={() => setSelectedMushroom(null)}
        />
      )}
    </div>
  );
}
