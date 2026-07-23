import { useState, useEffect, useCallback } from 'react';
import { Search, CheckCircle, LogIn, Palette } from 'lucide-react';
import { Link, useSearch } from 'wouter';
import { BackLink } from '@/components/back-link';
import { Footer } from '@/components/footer';
import { LofiPlayer } from '@/components/lofi-player';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

const shopItems = [
  { id: 1, name: 'ANTENNA ARRAY', price: 50, slot: 'ROOFTOP', rarity: 'COMMON', description: 'Broadcast your code to the world. A signal tower for serious developers.' },
  { id: 2, name: 'COMPANION DUCK', price: 300, slot: 'ROOFTOP', rarity: 'RARE', description: 'Your debugging companion. This duck has seen some code.' },
  { id: 3, name: 'CROWN', price: 300, slot: 'ROOFTOP', rarity: 'RARE', description: 'Rule your block. Reserved for code royalty.' },
  { id: 4, name: 'CUSTOM COLOR', price: 100, slot: 'BUILDING', rarity: 'COMMON', description: 'Paint your building in any hex color you want.' },
  { id: 5, name: 'COMBATANT DUCK', price: 0, slot: 'ROOFTOP', rarity: 'FREE', description: 'Free battle duck. Ready for combat missions.' },
  { id: 6, name: 'GOLDEN SLAYER DUCK', price: 0, slot: 'ROOFTOP', rarity: 'FREE', description: 'Elite combat duck. Legendary duck warrior.' },
  { id: 7, name: 'FLAG', price: 50, slot: 'ROOFTOP', rarity: 'COMMON', description: 'Plant your flag. Claim your territory.' },
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

const COLORS = ['#CCFF00', '#00FF88', '#FF3333', '#00CCFF', '#FF9900', '#FF00FF'];

interface BuildingData {
  claimed: boolean;
  rooftop_item?: string | null;
  building_item?: string | null;
  custom_color?: string | null;
}

export default function Shop() {
  const [selectedItem, setSelectedItem] = useState(shopItems[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [equipping, setEquipping] = useState(false);
  const [buildingData, setBuildingData] = useState<BuildingData | null>(null);
  const [customColor, setCustomColor] = useState('#CCFF00');

  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const targetUsername = params.get('username') ?? user?.username ?? null;

  const fetchBuildingData = useCallback(() => {
    if (!targetUsername) return;
    fetch(`/api/buildings/${encodeURIComponent(targetUsername)}`, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : { claimed: false }))
      .then((d: BuildingData) => {
        setBuildingData(d);
        if (d.custom_color) setCustomColor(d.custom_color);
      })
      .catch(() => {});
  }, [targetUsername]);

  useEffect(() => {
    fetchBuildingData();
  }, [fetchBuildingData]);

  const isBuildingClaimed = buildingData?.claimed === true;
  const isOwner = user != null && targetUsername?.toLowerCase() === user.username.toLowerCase();
  const canEquip = isOwner && isBuildingClaimed;

  const handleEquip = async () => {
    if (!canEquip || !user) return;
    setEquipping(true);
    try {
      const payload: {
        username: string;
        rooftop_item?: string;
        building_item?: string;
        custom_color?: string;
      } = { username: user.username };

      if (selectedItem.slot === 'ROOFTOP') payload.rooftop_item = selectedItem.name;
      else if (selectedItem.slot === 'BUILDING') {
        payload.building_item = selectedItem.name;
        if (selectedItem.name === 'CUSTOM COLOR') payload.custom_color = customColor;
      }

      const resp = await fetch('/api/buildings/customize', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await resp.json()) as { ok?: boolean; error?: string };
      if (data.ok) {
        toast({
          title: 'EQUIPPED! ✅',
          description: `${selectedItem.name} is now on your building.`,
        });
        fetchBuildingData();
      } else {
        toast({ title: 'ERROR', description: data.error ?? 'Failed to equip', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'ERROR', description: 'Network error', variant: 'destructive' });
    } finally {
      setEquipping(false);
    }
  };

  const filteredItems = shopItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const rarityColor: Record<string, string> = {
    FREE: 'text-green-400',
    COMMON: 'text-gray-300',
    RARE: 'text-blue-400',
    EPIC: 'text-purple-400',
    LEGENDARY: 'text-yellow-400',
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      <LofiPlayer />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <BackLink />
          {!authLoading && (
            user ? (
              <div className="flex items-center gap-3">
                <img src={user.avatar_url} alt={user.username} className="w-7 h-7 border border-border" />
                <span className="text-sm text-muted-foreground hidden sm:block">@{user.username}</span>
                <Link href={`/user/${user.username}`}>
                  <Button size="sm" variant="outline">MY BUILDING</Button>
                </Link>
              </div>
            ) : (
              <Link href="/login?redirect=/shop">
                <Button variant="outline" data-testid="button-signin-github">
                  <LogIn className="w-4 h-4 mr-2" />
                  SIGN IN WITH GITHUB
                </Button>
              </Link>
            )
          )}
        </div>

        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-2">SHOP</h1>
          <p className="text-muted-foreground text-lg">PREVIEW ANYTHING LIVE BEFORE YOU BUY.</p>
        </div>

        {/* Auth / Claim status bar */}
        {!authLoading && (
          <div className="mb-6 border border-border bg-card p-3 text-sm flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {!user ? (
              <>
                <LogIn className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground flex-1">
                  SIGN IN WITH GITHUB TO EQUIP ITEMS TO YOUR BUILDING.
                </span>
                <Link href="/login?redirect=/shop">
                  <Button size="sm">SIGN IN</Button>
                </Link>
              </>
            ) : !isBuildingClaimed ? (
              <>
                <Palette className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground flex-1">
                  CLAIM YOUR BUILDING FIRST TO START EQUIPPING ITEMS.
                </span>
                <Link href={`/user/${user.username}`}>
                  <Button size="sm">CLAIM BUILDING</Button>
                </Link>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span className="flex-1">
                  BUILDING CLAIMED. SELECT AN ITEM AND CLICK EQUIP TO CUSTOMIZE.
                </span>
                {buildingData?.rooftop_item && (
                  <span className="text-xs text-muted-foreground">ROOF: {buildingData.rooftop_item}</span>
                )}
              </>
            )}
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="building" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="building" data-testid="tab-building">BUILDING</TabsTrigger>
            <TabsTrigger value="battle" data-testid="tab-battle">BATTLE</TabsTrigger>
            <TabsTrigger value="boosts" data-testid="tab-boosts">BOOSTS</TabsTrigger>
          </TabsList>

          <TabsContent value="building">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Item list */}
              <div className="lg:col-span-2 space-y-4">
                <div className="relative">
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

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {filteredItems.map((item) => {
                    const isEquipped =
                      buildingData?.rooftop_item === item.name ||
                      buildingData?.building_item === item.name;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className={`border p-3 text-left transition-colors relative ${
                          selectedItem.id === item.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-card hover:border-muted-foreground'
                        }`}
                        data-testid={`button-item-${item.id}`}
                      >
                        {isEquipped && (
                          <CheckCircle className="absolute top-2 right-2 w-3 h-3 text-primary" />
                        )}
                        <div className="text-xs font-bold mb-1 pr-4">{item.name}</div>
                        <div className={`text-xs ${rarityColor[item.rarity] ?? 'text-gray-300'}`}>
                          {item.rarity}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {item.price === 0 ? 'FREE' : `◆ ${item.price}`}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Item detail panel */}
              <div className="lg:col-span-1">
                <div className="border border-border bg-card p-4 sticky top-4 space-y-4">
                  <div className="text-xs text-muted-foreground">PREVIEW</div>

                  {/* Color picker — only for CUSTOM COLOR */}
                  {selectedItem.name === 'CUSTOM COLOR' && (
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">CHOOSE COLOR</div>
                      <div className="flex flex-wrap gap-2">
                        {COLORS.map((color) => (
                          <button
                            key={color}
                            onClick={() => setCustomColor(color)}
                            className={`w-8 h-8 border-2 transition-colors ${
                              customColor === color ? 'border-white' : 'border-border'
                            }`}
                            style={{ backgroundColor: color }}
                            data-testid={`button-color-${color}`}
                          />
                        ))}
                      </div>
                      <input
                        type="text"
                        value={customColor}
                        onChange={(e) => setCustomColor(e.target.value)}
                        placeholder="#CCFF00"
                        className="w-full bg-background border border-border px-3 py-1.5 text-xs font-mono"
                        maxLength={7}
                      />
                    </div>
                  )}

                  {/* Item details */}
                  <div className="space-y-3 pt-2 border-t border-border">
                    <div className="font-bold text-lg">{selectedItem.name}</div>
                    <div className="text-xs text-muted-foreground">SLOT: {selectedItem.slot}</div>
                    <div className={`text-xs font-bold ${rarityColor[selectedItem.rarity] ?? ''}`}>
                      {selectedItem.rarity}
                    </div>
                    <div className="text-sm text-muted-foreground">{selectedItem.description}</div>
                    <div className="text-primary text-xl flex items-center gap-2">
                      <span>◆</span>
                      <span>{selectedItem.price === 0 ? 'FREE' : selectedItem.price}</span>
                    </div>

                    {canEquip ? (
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleEquip}
                        disabled={equipping}
                        data-testid="button-equip-item"
                      >
                        {equipping ? 'EQUIPPING...' : 'EQUIP TO BUILDING'}
                      </Button>
                    ) : !user ? (
                      <Link href="/login?redirect=/shop">
                        <Button className="w-full" size="lg" data-testid="button-buy-item">
                          SIGN IN TO EQUIP
                        </Button>
                      </Link>
                    ) : !isBuildingClaimed ? (
                      <Link href={`/user/${user.username}`}>
                        <Button className="w-full" size="lg" variant="outline" data-testid="button-buy-item">
                          CLAIM BUILDING FIRST
                        </Button>
                      </Link>
                    ) : (
                      <Button className="w-full" size="lg" disabled data-testid="button-buy-item">
                        NOT YOUR BUILDING
                      </Button>
                    )}
                  </div>
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
