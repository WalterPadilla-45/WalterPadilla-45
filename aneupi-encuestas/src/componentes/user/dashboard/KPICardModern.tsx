import { LucideIcon, Star } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant: 'dark' | 'light';
  trend?: string;
  subtitle?: string;
  progressBar?: { percentage: number; color?: string };
  showStar?: boolean;
}

export function KPICardModern({
  title,
  value,
  icon: Icon,
  variant,
  trend,
  subtitle,
  progressBar,
  showStar,
}: KPICardProps) {
  const isDark = variant === 'dark';

  return (
    <div
      className={`rounded-2xl p-6 card-shadow flex flex-col justify-between min-h-[130px] transition-transform hover:-translate-y-1 ${isDark ? 'bg-[#0F3D5E]' : 'bg-white'
        }`}
    >
      {/* Title + Icon row */}
      <div className="flex justify-between items-start">
        <span
          className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-gray-500'}`}
          style={isDark ? { color: 'rgba(255,255,255,0.7)' } : undefined}
        >
          {title}
        </span>
        <div className="flex items-center gap-1">
          {showStar && <Star size={18} className="text-[#D4AF37] fill-[#D4AF37]" />}
          <Icon size={20} className="text-[#D4AF37]" />
        </div>
      </div>

      {/* Value + extras */}
      <div>
        <div className="flex items-end justify-between">
          <span
            className="text-3xl font-bold"
            style={{ color: isDark ? '#FFFFFF' : '#111827' }}
          >
            {typeof value === 'number' ? value.toLocaleString() : value}
          </span>
          {trend && (
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              {trend}
            </span>
          )}
        </div>

        {subtitle && (
          <p
            className="text-xs mt-1"
            style={{ color: isDark ? 'rgba(255,255,255,0.55)' : '#9ca3af' }}
          >
            {subtitle}
          </p>
        )}

        {progressBar && (
          <div
            className="mt-2 w-full rounded-full h-1.5 overflow-hidden"
            style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : '#e5e7eb' }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progressBar.percentage}%`,
                backgroundColor: progressBar.color || '#D4AF37',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}