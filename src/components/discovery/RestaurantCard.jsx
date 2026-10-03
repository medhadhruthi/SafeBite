import React from 'react';
import { Star, Clock3, Truck, ShieldCheck, MapPin, Accessibility, ArrowRight, Info } from 'lucide-react';
import Badge from '../common/Badge';
import { DIETARY_TAGS } from '../../data/allergenData';
import { formatINR } from '../../utils/currency';

export default function RestaurantCard({ restaurant, onSelect }) {
  const getDietLabel = (tagId) => {
    const found = DIETARY_TAGS.find((d) => d.id === tagId);
    return found ? found.name : tagId.toUpperCase();
  };

  const getDietIcon = (tagId) => {
    const found = DIETARY_TAGS.find((d) => d.id === tagId);
    return found ? found.icon : '🌱';
  };

  const nutritionStatus = {
    verified: {
      label: 'Nutrition: Verified',
      icon: '✓',
      helpText: 'Nutrition information provided and verified for this restaurant.'
    },
    estimated: {
      label: 'Nutrition: Estimated',
      icon: '~',
      helpText: 'Nutrition values are estimates based on listed ingredients and portion size.'
    },
    unavailable: {
      label: 'Nutrition: Unavailable',
      icon: '—',
      helpText: 'Nutrition information is not available for this restaurant.'
    }
  }[restaurant.nutritionStatus || 'verified'];

  const spokenSummary = `${restaurant.name}. Rating ${restaurant.rating} stars from ${restaurant.reviewCount} reviews. Preparation time ${restaurant.prepTimeMin}. Delivery fee ${formatINR(restaurant.deliveryFee)}. Distance ${restaurant.distance}. Accessibility notes: ${restaurant.accessibilityNotes}. Allergen data: ${restaurant.allergenDataSource}. Nutrition status: ${nutritionStatus.label}.`;

  return (
    <article
      onClick={() => onSelect(restaurant)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(restaurant);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={spokenSummary}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_70px_-40px_rgba(15,23,42,0.35)] transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_28px_64px_-30px_rgba(16,185,129,0.35)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
    >
      <div className="relative h-52 overflow-hidden bg-slate-200">
        <img
          src={restaurant.image}
          alt={restaurant.altText}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
              <Clock3 className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
              {restaurant.prepTimeMin}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
              <Truck className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
              {formatINR(restaurant.deliveryFee)} fee
            </span>
          </div>

          <span className="inline-flex items-center gap-1 rounded-full bg-amber-300 px-2.5 py-1 text-xs font-black text-slate-900 shadow-sm">
            <Star className="h-3.5 w-3.5 fill-slate-900 text-slate-900" aria-hidden="true" />
            {restaurant.rating}
            <span className="text-[10px] font-bold text-slate-700">({restaurant.reviewCount})</span>
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-2xl font-black tracking-[-0.05em] text-slate-900">{restaurant.name}</h3>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <span>{restaurant.cuisine.join(' • ')}</span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {restaurant.distance}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            <div className="flex items-start gap-2">
              <Accessibility className="mt-0.5 h-4 w-4 text-emerald-600" aria-hidden="true" />
              <p>
                <span className="font-semibold text-slate-900">Accessibility:</span> {restaurant.accessibilityNotes}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-black text-white">
              {nutritionStatus.icon}
            </span>
            <span className="font-semibold text-slate-800">{nutritionStatus.label}</span>
            <Info
              className="h-4 w-4 text-slate-500"
              aria-label={nutritionStatus.helpText}
              title={nutritionStatus.helpText}
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>{restaurant.allergenDataSource}</span>
          </div>
        </div>

        <div className="mt-5 border-t border-slate-200 pt-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Dietary fit</span>
            <span className="text-xs font-semibold text-slate-500">{restaurant.dietBadges.length} tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {restaurant.dietBadges.map((badgeId) => (
              <Badge
                key={badgeId}
                icon={getDietIcon(badgeId)}
                label={getDietLabel(badgeId)}
                variant="info"
              />
            ))}
          </div>

          <button
            type="button"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
            onClick={(event) => {
              event.stopPropagation();
              onSelect(restaurant);
            }}
          >
            View menu
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
