import { useState } from 'react';
import { Search } from 'lucide-react';
import { BackLink } from '@/components/back-link';
import { Footer } from '@/components/footer';
import { LofiPlayer } from '@/components/lofi-player';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const shopItems = [
  { id: 1, name: 'ANTENNA ARRAY', price: 50, slot: 'ROOFTOP', rarity: 'COMMON', description: 'Broadcast your code to the world. A signal tower for serious developers.' },
  { id: 2, name: 'COMPANION DUCK', price: 300, slot: 'ROOFTOP', rarity: 'RARE', description: 'Your debugging companion. This duck has seen some code.' },
  { id: 3, name: 'CROWN', price: 300, slot: 'ROOFTOP', rarity: 'RARE', description: 'Rule your block. Reserved for code royalty.' },
  { id: 4, name: 'CUSTOM COLOR', price: 100, slot: 'BUILDING', rarity: 'COMMON', description: 'Paint your building in any hex color you want.' },
  { id: 5, name: 'COMBATANT DUCK', price: 0, slot: 'ROOFTOP', rarity: 'FREE', description: 'Free battle duck. Ready for combat missions.' },
  { id: 6, name: 'GOLDEN SLAYER DUCK', price: 0, slot: 'ROOFTOP', rarity: 'FREE', description: 'Elite combat duck. Legendary duck warrior.' },
  { id: 7, name: 'FLAG', price: 1.0, slot: 'ROOFTOP', rarity: 'COMMON', description: 'Plant your flag. Claim your territory.' },
  { id: 8, name: 'GITHUB STAR', price: 0, slot: 'ROOFTOP', rarity: 'FREE', description: 'Shine bright. Celebrate your starred repos.' },
  { id: 9, name: 'HELIPAD', price: 50, slot: 'ROOFTOP', rarity: 'COMMON', description: 'For devs who deploy fast. Emergency escape route.' },
  { id: 10, name: 'HOLOGRAM RING', price: 200, slot: 'BUILDING', rarity: 'RARE', description: 'Project your presence. Cyberpunk aura effect.' },
  { id: 11, name: 'LED BANNER', price: 250, slot: 'BUILDING', rarity: 'RARE', description: 'Scrolling text display. Broadcast your message.' },
  { id: 12, name: 'LIGHTNING AURA', price: 300, slot: 'BUILDING', rarity: 'EPIC', description: 'Raw energy. Your building crackles with power.' },
  { id: 13, name: 'NEON TRIM', price: 100, slot: 'BUILDING', rarity: 'COMMON', description: 'Edge lighting. Make your building glow.' },
  { id: 14, name: 'POOL PARTY', price: 220, slot: 'ROOFTOP', rarity: 'RARE', description: 'Work hard, party harder. Rooftop pool with lights.' },
  { id: 15, name: 'ROOFTOP FIRE', price: 100, slot: 'ROOFTOP', rarity: 'COMMON', description: 'Keep warm during long coding sessions. Bonfire ambiance.' },
  { id: 16, name: 'ROOFTOP GARDEN', price: 50, slot: 'ROOFTOP', rarity: 'COMMON', description: 'Green space for your code sanctuary. Touch grass digitally.' },
];

export default function Shop() {
  const [selectedItem, setSelectedItem] = useState(shopItems[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = shopItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-[100dvh] bg-background">
      <LofiPlayer />
      
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <BackLink />
          <Button variant="outline" data-testid="button-signin-github">
            SIGN IN WITH GITHUB
          </Button>
        </div>

        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-2">SHOP</h1>
          <p className="text-muted-foreground text-lg">
            PREVIEW ANYTHING LIVE BEFORE YOU BUY.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="building" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="building" data-testid="tab-building">BUILDING</TabsTrigger>
            <TabsTrigger value="battle" data-testid="tab-battle">BATTLE</TabsTrigger>
            <TabsTrigger value="boosts" data-testid="tab-boosts">BOOSTS</TabsTrigger>
          </TabsList>

          <TabsContent value="building" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="SEARCH ITEMS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-items"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              <select className="bg-input border border-border px-4 py-2 text-sm" data-testid="select-slot-filter">
                <option>ALL SLOTS</option>
                <option>ROOFTOP</option>
                <option>BUILDING</option>
              </select>
              <select className="bg-input border border-border px-4 py-2 text-sm" data-testid="select-rarity-filter">
                <option>ALL RARITY</option>
                <option>FREE</option>
                <option>COMMON</option>
                <option>RARE</option>
                <option>EPIC</option>
              </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Items grid */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`bg-card border-2 p-4 text-left transition-all hover:border-primary ${
                        selectedItem.id === item.id ? 'border-primary' : 'border-border'
                      }`}
                      data-testid={`card-shop-item-${item.id}`}
                    >
                      {/* Placeholder pixel building icon */}
                      <div className="w-full aspect-square bg-muted mb-3 flex items-center justify-center">
                        <div className="text-4xl opacity-50">◆</div>
                      </div>
                      <div className="text-sm font-bold mb-1">{item.name}</div>
                      <div className="text-xs text-primary flex items-center gap-1">
                        <span>◆</span>
                        <span>{item.price === 0 ? 'FREE' : item.price}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview panel */}
              <div className="bg-card border border-border p-6 space-y-6 lg:sticky lg:top-4 h-fit">
                <div className="text-sm font-bold mb-4">PREVIEW</div>
                
                {/* Preview viewport */}
                <div className="aspect-square bg-muted flex items-center justify-center border border-border">
                  <div className="text-6xl opacity-50">◆</div>
                </div>

                {/* Preview controls */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button className="border border-border px-3 py-2 hover:bg-secondary transition-colors" data-testid="button-preview-rotating">
                    ROTATING
                  </button>
                  <button className="border border-border px-3 py-2 hover:bg-secondary transition-colors" data-testid="button-preview-reset">
                    RESET
                  </button>
                  <button className="border border-border px-3 py-2 hover:bg-secondary transition-colors" data-testid="button-preview-building">
                    BUILDING
                  </button>
                  <button className="border border-border px-3 py-2 hover:bg-secondary transition-colors" data-testid="button-preview-hide-ui">
                    HIDE UI
                  </button>
                </div>

                {/* Color picker */}
                <div className="flex gap-2">
                  {['#CCFF00', '#00FF88', '#FF3333', '#00CCFF'].map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 border-2 border-border hover:border-primary transition-colors"
                      style={{ backgroundColor: color }}
                      data-testid={`button-color-${color}`}
                    />
                  ))}
                </div>

                {/* Item details */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="font-bold text-lg">{selectedItem.name}</div>
                  <div className="text-xs text-muted-foreground">
                    SLOT: {selectedItem.slot}
                  </div>
                  <div className="text-sm">
                    {selectedItem.description}
                  </div>
                  <div className="text-primary text-xl flex items-center gap-2">
                    <span>◆</span>
                    <span>{selectedItem.price === 0 ? 'FREE' : selectedItem.price}</span>
                  </div>
                  <Button className="w-full" size="lg" data-testid="button-buy-item">
                    SIGN IN TO BUY
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="battle" className="text-center py-16 text-muted-foreground">
            BATTLE ITEMS COMING SOON
          </TabsContent>

          <TabsContent value="boosts" className="text-center py-16 text-muted-foreground">
            BOOST ITEMS COMING SOON
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
