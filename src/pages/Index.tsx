import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useFavorites } from '@/hooks/useFavorites';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

interface Artist {
  id: number;
  name: string;
  listeners: string;
  image: string;
  tracks: number;
}

const mockTracks: Track[] = [
  { id: 1, title: 'Neon Dreams', artist: 'Electric Pulse', duration: '3:45', cover: '🎵' },
  { id: 2, title: 'Midnight Wave', artist: 'Synthwave Heroes', duration: '4:12', cover: '🎶' },
  { id: 3, title: 'Aurora', artist: 'Crystal Sound', duration: '3:28', cover: '🎧' },
  { id: 4, title: 'Starlight', artist: 'Cosmic Beat', duration: '4:01', cover: '⭐' },
  { id: 5, title: 'Pulse', artist: 'Bass Nation', duration: '3:15', cover: '💫' },
];

const mockArtists: Artist[] = [
  { id: 1, name: 'Electric Pulse', listeners: '2.5M', image: '🎸', tracks: 42 },
  { id: 2, name: 'Synthwave Heroes', listeners: '1.8M', image: '🎹', tracks: 35 },
  { id: 3, name: 'Crystal Sound', listeners: '3.2M', image: '🎤', tracks: 58 },
  { id: 4, name: 'Cosmic Beat', listeners: '1.2M', image: '🎺', tracks: 28 },
  { id: 5, name: 'Bass Nation', listeners: '4.1M', image: '🎻', tracks: 67 },
];

function Index() {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [currentTrack, setCurrentTrack] = useState<Track>(mockTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [volume, setVolume] = useState([75]);

  const menuItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'playlists', label: 'Плейлисты', icon: 'ListMusic' },
    { id: 'artists', label: 'Исполнители', icon: 'Mic2' },
    { id: 'albums', label: 'Альбомы', icon: 'Disc3' },
    { id: 'radio', label: 'Радио', icon: 'Radio' },
    { id: 'library', label: 'Библиотека', icon: 'Library' },
    { id: 'search', label: 'Поиск', icon: 'Search' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
          <div className="p-6">
            <h1 className="text-2xl font-bold bg-gradient-vibrant bg-clip-text text-transparent">
              PoehaliMusic
            </h1>
          </div>
          
          <nav className="flex-1 px-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-gradient-purple text-white shadow-lg'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <Icon name={item.icon as any} size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-auto">
          <div className="p-8 space-y-8">
            <section>
              <div className="relative h-64 rounded-2xl bg-gradient-vibrant overflow-hidden mb-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 animate-slide-up">
                    <h2 className="text-5xl font-bold text-white drop-shadow-lg">
                      Музыка для каждого момента
                    </h2>
                    <p className="text-xl text-white/90">
                      Миллионы треков и плейлистов
                    </p>
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold shadow-2xl">
                      Начать слушать
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Популярные исполнители</h3>
                <Button variant="ghost" className="text-primary">
                  Показать все
                  <Icon name="ChevronRight" size={18} className="ml-1" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {mockArtists.map((artist, idx) => (
                  <Card
                    key={artist.id}
                    className="group cursor-pointer overflow-hidden border-muted hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1"
                    style={{ animationDelay: `${idx * 100}ms` }}
                    onClick={() => navigate(`/artist/${artist.id}`)}
                  >
                    <div className="aspect-square bg-gradient-purple flex items-center justify-center text-6xl">
                      {artist.image}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-lg mb-1 truncate group-hover:text-primary transition-colors">
                        {artist.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {artist.listeners} слушателей
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {artist.tracks} треков
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Trending сейчас</h3>
                <Button variant="ghost" className="text-primary">
                  Ещё треки
                  <Icon name="ChevronRight" size={18} className="ml-1" />
                </Button>
              </div>
              
              <div className="space-y-2">
                {mockTracks.map((track, idx) => (
                  <Card
                    key={track.id}
                    className={`p-4 cursor-pointer hover:bg-muted/50 transition-all duration-200 ${
                      currentTrack.id === track.id ? 'border-primary bg-muted/30' : ''
                    }`}
                    onClick={() => {
                      setCurrentTrack(track);
                      setIsPlaying(true);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-muted-foreground font-bold w-8 text-center">
                        {idx + 1}
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-gradient-pink flex items-center justify-center text-2xl">
                        {track.cover}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">{track.title}</h4>
                        <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {track.duration}
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="hover:text-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Icon name="Heart" size={20} />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      <footer className="border-t border-border bg-card backdrop-blur-lg">
        <div className="px-6 py-4">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-lg bg-gradient-vibrant flex items-center justify-center text-3xl animate-pulse-glow">
              {currentTrack.cover}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold truncate">{currentTrack.title}</h4>
              <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
            </div>

            <div className="flex items-center gap-4">
              <Button size="icon" variant="ghost" className="hover:text-primary">
                <Icon name="Shuffle" size={20} />
              </Button>
              <Button size="icon" variant="ghost" className="hover:text-primary">
                <Icon name="SkipBack" size={20} />
              </Button>
              <Button
                size="icon"
                className="bg-gradient-vibrant hover:opacity-90 w-12 h-12 rounded-full shadow-lg shadow-primary/50"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <Icon name={isPlaying ? 'Pause' : 'Play'} size={24} />
              </Button>
              <Button size="icon" variant="ghost" className="hover:text-primary">
                <Icon name="SkipForward" size={20} />
              </Button>
              <Button size="icon" variant="ghost" className="hover:text-primary">
                <Icon name="Repeat" size={20} />
              </Button>
            </div>

            <div className="flex items-center gap-3 w-48">
              <Icon name="Volume2" size={20} className="text-muted-foreground" />
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1:23</span>
              <span>{currentTrack.duration}</span>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-gradient-vibrant rounded-full"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;