import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Map, Layers, Home, Trees, Droplets } from "lucide-react";

declare global {
  interface Window {
    google: any;
  }
}

interface EnhancedMapProps {
  className?: string;
}

const EnhancedMap = ({ className = "w-full h-96" }: EnhancedMapProps) => {
  const { t } = useLanguage();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeLayer, setActiveLayer] = useState('all');

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCOsUu6B4UXcTbJOYtyBoDz_7u1-S8RMCA&libraries=places,drawing`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapContainer.current || !window.google) return;

    // Initialize enhanced 3D map
    map.current = new window.google.maps.Map(mapContainer.current, {
      zoom: 8,
      center: { lat: 23.5937, lng: 78.9629 },
      mapTypeId: window.google.maps.MapTypeId.SATELLITE,
      tilt: 45, // Enable 3D view
      heading: 0,
      mapId: 'DEMO_MAP_ID', // Required for 3D features
      styles: [
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [{ color: "#ffffff" }]
        }
      ]
    });

    // Enhanced tribal areas data with assets
    const enhancedTribalAreas = [
      { 
        lat: 22.9734, lng: 78.6569, 
        title: "Dindori District - Madhya Pradesh",
        village: "Samnapur",
        status: "approved",
        area: "150 acres",
        assets: {
          ponds: 3,
          fields: 12,
          forestCover: "65%"
        },
        boundary: [
          { lat: 22.9634, lng: 78.6469 },
          { lat: 22.9834, lng: 78.6469 },
          { lat: 22.9834, lng: 78.6669 },
          { lat: 22.9634, lng: 78.6669 }
        ]
      },
      { 
        lat: 24.5854, lng: 73.7125, 
        title: "Udaipur District - Rajasthan",
        village: "Kotra",
        status: "pending",
        area: "75 acres",
        assets: {
          ponds: 1,
          fields: 8,
          forestCover: "45%"
        },
        boundary: [
          { lat: 24.5754, lng: 73.7025 },
          { lat: 24.5954, lng: 73.7025 },
          { lat: 24.5954, lng: 73.7225 },
          { lat: 24.5754, lng: 73.7225 }
        ]
      },
      { 
        lat: 20.9517, lng: 85.0985, 
        title: "Mayurbhanj District - Odisha",
        village: "Baripada",
        status: "approved",
        area: "200 acres",
        assets: {
          ponds: 5,
          fields: 15,
          forestCover: "78%"
        },
        boundary: [
          { lat: 20.9417, lng: 85.0885 },
          { lat: 20.9617, lng: 85.0885 },
          { lat: 20.9617, lng: 85.1085 },
          { lat: 20.9417, lng: 85.1085 }
        ]
      }
    ];

    // Clear existing overlays
    const clearOverlays = () => {
      // Clear function will be called when changing layers
    };

    // Add village boundaries
    const addBoundaries = () => {
      enhancedTribalAreas.forEach((area) => {
        const polygon = new window.google.maps.Polygon({
          paths: area.boundary,
          strokeColor: area.status === 'approved' ? '#10B981' : 
                      area.status === 'rejected' ? '#EF4444' : '#F59E0B',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: area.status === 'approved' ? '#10B981' : 
                     area.status === 'rejected' ? '#EF4444' : '#F59E0B',
          fillOpacity: 0.15,
          map: activeLayer === 'all' || activeLayer === 'boundaries' ? map.current : null
        });

        // Add info window for boundary
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-3 max-w-sm">
              <h3 class="font-semibold text-lg mb-2">${area.title}</h3>
              <div class="space-y-2 text-sm">
                <p><strong>Village:</strong> ${area.village}</p>
                <p><strong>Area:</strong> ${area.area}</p>
                <p><strong>Status:</strong> 
                  <span class="inline-block px-2 py-1 text-xs rounded ${
                    area.status === 'approved' ? 'bg-green-100 text-green-800' :
                    area.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }">
                    ${area.status.charAt(0).toUpperCase() + area.status.slice(1)}
                  </span>
                </p>
                <div class="mt-3 p-2 bg-gray-50 rounded">
                  <p class="font-medium mb-1">Assets:</p>
                  <p>🏞️ Ponds: ${area.assets.ponds}</p>
                  <p>🌾 Fields: ${area.assets.fields}</p>
                  <p>🌲 Forest Cover: ${area.assets.forestCover}</p>
                </div>
              </div>
            </div>
          `
        });

        polygon.addListener('click', () => {
          infoWindow.setPosition(area);
          infoWindow.open(map.current);
        });
      });
    };

    // Add asset markers
    const addAssets = () => {
      enhancedTribalAreas.forEach((area, areaIdx) => {
        // Add pond markers
        for (let i = 0; i < area.assets.ponds; i++) {
          const pondLat = area.lat + (Math.random() - 0.5) * 0.02;
          const pondLng = area.lng + (Math.random() - 0.5) * 0.02;
          
          new window.google.maps.Marker({
            position: { lat: pondLat, lng: pondLng },
            map: activeLayer === 'all' || activeLayer === 'water' ? map.current : null,
            title: `Pond ${i + 1} - ${area.village}`,
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                  <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="#fff" stroke-width="2"/>
                  <path d="M12 8c-2 0-4 1-4 3s2 3 4 3 4-1 4-3-2-3-4-3z" fill="#fff"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(20, 20)
            }
          });
        }

        // Add field markers
        for (let i = 0; i < Math.min(area.assets.fields, 5); i++) {
          const fieldLat = area.lat + (Math.random() - 0.5) * 0.015;
          const fieldLng = area.lng + (Math.random() - 0.5) * 0.015;
          
          new window.google.maps.Marker({
            position: { lat: fieldLat, lng: fieldLng },
            map: activeLayer === 'all' || activeLayer === 'fields' ? map.current : null,
            title: `Agricultural Field ${i + 1} - ${area.village}`,
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                  <rect x="4" y="4" width="16" height="16" fill="#10B981" stroke="#fff" stroke-width="2" rx="2"/>
                  <path d="M8 8h8M8 12h8M8 16h8" stroke="#fff" stroke-width="1"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(18, 18)
            }
          });
        }
      });
    };

    // Add forest areas
    const addForests = () => {
      enhancedTribalAreas.forEach((area) => {
        const forestCircle = new window.google.maps.Circle({
          strokeColor: '#059669',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#059669',
          fillOpacity: 0.2,
          map: activeLayer === 'all' || activeLayer === 'forest' ? map.current : null,
          center: { lat: area.lat + 0.005, lng: area.lng + 0.005 },
          radius: 800
        });

        const forestInfo = new window.google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h4 class="font-semibold">Forest Area</h4>
              <p class="text-sm">Coverage: ${area.assets.forestCover}</p>
              <p class="text-sm">Protected under FRA 2006</p>
            </div>
          `
        });

        forestCircle.addListener('click', () => {
          forestInfo.setPosition({ lat: area.lat + 0.005, lng: area.lng + 0.005 });
          forestInfo.open(map.current);
        });
      });
    };

    // Initial load
    addBoundaries();
    addAssets();
    addForests();

    // Enhanced legend
    const legend = document.createElement('div');
    legend.innerHTML = `
      <div class="bg-white p-4 m-3 shadow-lg rounded-lg border text-sm max-w-xs">
        <h4 class="font-semibold mb-3 text-gray-800">Map Legend</h4>
        <div class="space-y-2">
          <div class="flex items-center">
            <div class="w-4 h-4 bg-green-500 rounded mr-2 opacity-75"></div>
            <span>Approved Areas</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 bg-yellow-500 rounded mr-2 opacity-75"></div>
            <span>Pending Areas</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 bg-red-500 rounded mr-2 opacity-75"></div>
            <span>Rejected Areas</span>
          </div>
          <hr class="my-2">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span>Water Bodies</span>
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 bg-green-600 rounded mr-2"></div>
            <span>Agricultural Fields</span>
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 bg-green-700 rounded-full mr-2 opacity-60"></div>
            <span>Forest Areas</span>
          </div>
        </div>
      </div>
    `;
    
    map.current.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);

  }, [isLoaded, activeLayer]);

  if (!isLoaded) {
    return (
      <div className={`${className} bg-muted rounded-lg flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-2">Loading Enhanced Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Map className="w-5 h-5 mr-2" />
            Interactive Land Records Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeLayer} onValueChange={setActiveLayer} className="mb-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">
                <Layers className="w-4 h-4 mr-1" />
                All
              </TabsTrigger>
              <TabsTrigger value="boundaries">
                <Home className="w-4 h-4 mr-1" />
                Boundaries
              </TabsTrigger>
              <TabsTrigger value="water">
                <Droplets className="w-4 h-4 mr-1" />
                Water
              </TabsTrigger>
              <TabsTrigger value="fields">
                <Trees className="w-4 h-4 mr-1" />
                Fields
              </TabsTrigger>
              <TabsTrigger value="forest">
                <Trees className="w-4 h-4 mr-1" />
                Forest
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div ref={mapContainer} className={`${className} rounded-lg border`} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Villages</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Land Mapped</p>
                    <p className="text-2xl font-bold">1,456</p>
                    <p className="text-xs text-muted-foreground">acres</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Surveyed</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Forest Cover</p>
                    <p className="text-2xl font-bold">68%</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Protected</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedMap;