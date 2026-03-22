'use client';

import dynamic from 'next/dynamic';

const SkillsGlobe = dynamic(() => import('./SkillsGlobe'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="w-12 h-12 border-2 border-current border-t-transparent rounded-full animate-spin accent-text" />
    </div>
  ),
});

export default function SkillsGlobeClient() {
  return <SkillsGlobe />;
}
