import { useEffect, useRef, useState } from 'react';

const FeatureSection = ({ id, label, title, body, mockupContent, reverse, darkAlt }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`py-20 ${darkAlt ? 'bg-[#111128]' : 'bg-[#0d0d1a]'} border-t border-white/5`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:grid-flow-col-dense' : ''}`}
        >
          <div
            className={`space-y-6 transition-all duration-700 ease-out ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : reverse
                ? 'opacity-0 translate-x-16'
                : 'opacity-0 -translate-x-16'
            }`}
          >
            <p className="text-sm tracking-[0.3em] text-purple-400">{label}</p>
            <div className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              {title.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
            <div className="space-y-4 text-slate-300 text-lg">
              {body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div
            className={`transition-all duration-700 ease-out ${
              isVisible
                ? 'opacity-100 translate-x-0 scale-100'
                : reverse
                ? 'opacity-0 -translate-x-16 scale-95'
                : 'opacity-0 translate-x-16 scale-95'
            }`}
          >
            <div className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-6 shadow-2xl shadow-purple-900/50">
              {mockupContent}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
