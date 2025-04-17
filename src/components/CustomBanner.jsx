// components/PageHeader.js
import Link from 'next/link';

export default function CustomBanner({ 
  title, 
  backgroundImage = "/car-highway.jpg",
  breadcrumbs = [] 
}) {
  return (
    <div className="relative w-full h-64 md:h-80">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      ></div>
      
      {/* Centered Title */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-wider text-white">
          {title}
        </h1>
      </div>
      
      {/* Breadcrumb Navigation */}
      {breadcrumbs.length > 0 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
          <div className="bg-white rounded-full py-2 px-6 shadow-md">
            <div className="flex items-center text-sm">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.label} className="flex items-center">
                  {index > 0 && (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 mx-2 text-gray-500" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  )}
                  
                  {crumb.href ? (
                    <Link 
                      href={crumb.href} 
                      className="text-gray-700 hover:text-gray-900"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-blue-800 font-medium">{crumb.label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}