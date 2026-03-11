import { User } from 'lucide-react';
import type { PageConfig } from '../types';
import BlockRenderer from './blocks/BlockRenderer';

interface Props {
  page: PageConfig;
}

export default function PublicPage({ page }: Props) {
  const { profile, theme, blocks } = page;
  const isGrid = page.templateId === 'card-grid';
  const isTimeline = page.templateId === 'timeline';
  const isHero = page.templateId === 'hero-profile';

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: theme.backgroundColor, fontFamily: theme.fontFamily }}
    >
      {/* Hero cover for hero-profile template */}
      {isHero && (
        <div
          className="h-40 w-full"
          style={{
            background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.primaryColor}cc)`,
          }}
        />
      )}

      <div className={`max-w-lg mx-auto ${isHero ? '-mt-16' : ''}`}>
        {/* Profile */}
        <div className={`flex flex-col items-center ${isHero ? 'pt-0' : 'pt-10'} pb-4 px-6`}>
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className={`w-20 h-20 rounded-full object-cover border-4 mb-3 ${
                isHero ? 'border-4' : ''
              }`}
              style={{
                borderColor: isHero ? theme.backgroundColor : `${theme.primaryColor}30`,
              }}
            />
          ) : (
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mb-3 ${
                isHero ? 'border-4' : ''
              }`}
              style={{
                backgroundColor: `${theme.primaryColor}15`,
                borderColor: isHero ? theme.backgroundColor : undefined,
              }}
            >
              <User size={32} style={{ color: `${theme.primaryColor}60` }} />
            </div>
          )}
          <h1
            className="text-xl font-bold text-center"
            style={{ color: theme.textColor }}
          >
            {profile.name}
          </h1>
          <p
            className="text-sm text-center mt-1 max-w-[300px]"
            style={{ color: `${theme.textColor}80` }}
          >
            {profile.bio}
          </p>
        </div>

        {/* Blocks */}
        <div className="px-5 pb-10">
          {isGrid ? (
            <div className="grid grid-cols-2 gap-3">
              {blocks.map((block) => (
                <div
                  key={block.id}
                  className={
                    block.type === 'link-button' || block.type === 'social-icons' || block.type === 'divider' || block.type === 'text-section'
                      ? 'col-span-2'
                      : ''
                  }
                >
                  <BlockRenderer block={block} theme={theme} />
                </div>
              ))}
            </div>
          ) : isTimeline ? (
            <div className="relative pl-6">
              <div
                className="absolute left-2 top-0 bottom-0 w-0.5"
                style={{ backgroundColor: `${theme.primaryColor}30` }}
              />
              <div className="space-y-4">
                {blocks.map((block) => (
                  <div key={block.id} className="relative">
                    <div
                      className="absolute -left-[18px] top-3 w-3 h-3 rounded-full border-2"
                      style={{
                        backgroundColor: theme.primaryColor,
                        borderColor: theme.backgroundColor,
                      }}
                    />
                    <BlockRenderer block={block} theme={theme} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {blocks.map((block) => (
                <BlockRenderer key={block.id} block={block} theme={theme} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="py-6 text-center">
          <span className="text-[10px] font-medium" style={{ color: `${theme.textColor}30` }}>
            Powered by Academyat
          </span>
        </div>
      </div>
    </div>
  );
}
