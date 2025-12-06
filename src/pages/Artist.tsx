import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Album {
  id: number;
  title: string;
  year: number;
  cover: string;
  tracks: number;
}

interface Track {
  id: number;
  title: string;
  duration: string;
  plays: string;
}

const mockAlbums: Album[] = [
  { id: 1, title: 'Neon Nights', year: 2023, cover: '💿', tracks: 12 },
  { id: 2, title: 'Electric Dreams', year: 2022, cover: '🎵', tracks: 10 },
  { id: 3, title: 'Pulse', year: 2021, cover: '🎶', tracks: 14 },
  { id: 4, title: 'Synth Paradise', year: 2020, cover: '🎧', tracks: 11 },
];

const mockTracks: Track[] = [
  { id: 1, title: 'Neon Dreams', duration: '3:45', plays: '12M' },
  { id: 2, title: 'Midnight Wave', duration: '4:12', plays: '8.5M' },
  { id: 3, title: 'Aurora', duration: '3:28', plays: '15M' },
  { id: 4, title: 'Starlight', duration: '4:01', plays: '6.2M' },
  { id: 5, title: 'Pulse', duration: '3:15', plays: '9.8M' },
  { id: 6, title: 'Digital Love', duration: '4:32', plays: '11M' },
  { id: 7, title: 'Cyber City', duration: '3:56', plays: '7.3M' },
  { id: 8, title: 'Retro Wave', duration: '4:18', plays: '10M' },
];

function Artist() {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative h-96 bg-gradient-vibrant overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-6 left-6 text-white hover:bg-white/20"
          onClick={() => navigate('/')}
        >
          <Icon name="ArrowLeft" size={24} />
        </Button>

        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex items-end gap-6">
            <div className="w-48 h-48 rounded-2xl bg-gradient-purple flex items-center justify-center text-8xl shadow-2xl">
              🎸
            </div>
            
            <div className="flex-1 pb-4">
              <p className="text-sm text-white/80 mb-2">Исполнитель</p>
              <h1 className="text-7xl font-bold text-white mb-4">Electric Pulse</h1>
              <div className="flex items-center gap-4 text-white/90">
                <span>2.5M слушателей</span>
                <span>•</span>
                <span>42 трека</span>
                <span>•</span>
                <span>4 альбома</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        <div className="flex items-center gap-4 mb-8">
          <Button
            size="lg"
            className="bg-gradient-vibrant hover:opacity-90 rounded-full px-8 shadow-lg shadow-primary/50"
          >
            <Icon name="Play" size={24} className="mr-2" />
            Слушать
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className={`rounded-full px-8 ${isFollowing ? 'border-primary text-primary' : ''}`}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? (
              <>
                <Icon name="Check" size={20} className="mr-2" />
                Подписан
              </>
            ) : (
              <>
                <Icon name="UserPlus" size={20} className="mr-2" />
                Подписаться
              </>
            )}
          </Button>
          
          <Button size="lg" variant="ghost" className="rounded-full">
            <Icon name="Share2" size={20} />
          </Button>
        </div>

        <Tabs defaultValue="tracks" className="w-full">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="tracks">Популярное</TabsTrigger>
            <TabsTrigger value="albums">Альбомы</TabsTrigger>
            <TabsTrigger value="about">О исполнителе</TabsTrigger>
          </TabsList>

          <TabsContent value="tracks" className="space-y-2 mt-6">
            {mockTracks.map((track, idx) => (
              <Card
                key={track.id}
                className="p-4 cursor-pointer hover:bg-muted/50 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="text-muted-foreground font-bold w-8 text-center">
                    {idx + 1}
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-gradient-pink flex items-center justify-center text-2xl">
                    🎵
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{track.title}</h4>
                    <p className="text-sm text-muted-foreground">{track.plays} прослушиваний</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {track.duration}
                  </div>
                  <Button size="icon" variant="ghost" className="hover:text-primary">
                    <Icon name="Heart" size={20} />
                  </Button>
                  <Button size="icon" variant="ghost" className="hover:text-primary">
                    <Icon name="MoreVertical" size={20} />
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="albums" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mockAlbums.map((album) => (
                <Card
                  key={album.id}
                  className="group cursor-pointer overflow-hidden hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-square bg-gradient-purple flex items-center justify-center text-7xl">
                    {album.cover}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-lg mb-1 truncate group-hover:text-primary transition-colors">
                      {album.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {album.year} • {album.tracks} треков
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-4">О исполнителе</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Electric Pulse — один из самых ярких представителей современной электронной музыки. 
                  Их уникальное звучание сочетает элементы synthwave, retrowave и современного электро-попа.
                </p>
                <p>
                  Группа была основана в 2018 году и быстро завоевала популярность благодаря своему 
                  энергичному звучанию и захватывающим живым выступлениям. За эти годы Electric Pulse 
                  выпустили 4 студийных альбома и дали более 100 концертов по всему миру.
                </p>
                <p>
                  Их музыка вдохновлена культурой 80-х, неоновыми огнями ночных городов и киберпанк-эстетикой.
                </p>
                
                <div className="pt-4 border-t border-border mt-6">
                  <h4 className="font-semibold mb-3 text-foreground">Жанры</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Synthwave', 'Electronic', 'Retrowave', 'Electro Pop'].map((genre) => (
                      <span
                        key={genre}
                        className="px-4 py-2 rounded-full bg-muted text-sm font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Artist;
