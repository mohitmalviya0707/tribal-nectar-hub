import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

interface InteractiveMapProps {
  className?: string;
}

const InteractiveMap = ({ className = "w-full h-96" }: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCOsUu6B4UXcTbJOYtyBoDz_7u1-S8RMCA&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapContainer.current || !window.google) return;

    // Initialize map centered on India (focusing on tribal areas)
    map.current = new window.google.maps.Map(mapContainer.current, {
      zoom: 6,
      center: { lat: 23.5937, lng: 78.9629 }, // Center of India
      mapTypeId: window.google.maps.MapTypeId.HYBRID,
      styles: [
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [{ color: "#333333" }]
        }
      ]
    });

    // Add sample markers for tribal areas
    const tribalAreas = [
      { 
        lat: 22.9734, lng: 78.6569, 
        title: "Madhya Pradesh - Dindori",
        status: "approved",
        info: "Forest Rights Approved - 150 acres"
      },
      { 
        lat: 23.8103, lng: 91.2815, 
        title: "Tripura - Khowai",
        status: "pending",
        info: "Application Under Review - 75 acres"
      },
      { 
        lat: 20.9517, lng: 85.0985, 
        title: "Odisha - Mayurbhanj",
        status: "approved",
        info: "PM Kisan Approved - 50 acres"
      },
      { 
        lat: 17.1232, lng: 79.2088, 
        title: "Telangana - Adilabad",
        status: "rejected",
        info: "Application Rejected - Documentation Issues"
      }
    ];

    tribalAreas.forEach((area) => {
      const marker = new window.google.maps.Marker({
        position: { lat: area.lat, lng: area.lng },
        map: map.current,
        title: area.title,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <circle cx="12" cy="12" r="10" fill="${
                area.status === 'approved' ? '#10B981' : 
                area.status === 'rejected' ? '#EF4444' : '#F59E0B'
              }" stroke="#fff" stroke-width="2"/>
            </svg>
          `)}`,
          scaledSize: new window.google.maps.Size(24, 24)
        }
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-semibold text-sm">${area.title}</h3>
            <p class="text-xs text-gray-600 mt-1">${area.info}</p>
            <div class="mt-2">
              <span class="inline-block px-2 py-1 text-xs rounded ${
                area.status === 'approved' ? 'bg-green-100 text-green-800' :
                area.status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }">
                ${area.status.charAt(0).toUpperCase() + area.status.slice(1)}
              </span>
            </div>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map.current, marker);
      });
    });

    // Add legend
    const legend = document.createElement('div');
    legend.innerHTML = `
      <div class="bg-white p-3 m-2 shadow-lg rounded border text-sm">
        <h4 class="font-semibold mb-2">Legend</h4>
        <div class="space-y-1">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span>Approved</span>
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span>Pending</span>
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span>Rejected</span>
          </div>
        </div>
      </div>
    `;
    
    map.current.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);

  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <div className={`${className} bg-muted rounded-lg flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-2">Loading Map...</p>
        </div>
      </div>
    );
  }

  return <div ref={mapContainer} className={`${className} rounded-lg border`} />;
};

export default InteractiveMap;