import React from 'react';
import { Star, Clock, Truck, ShieldCheck, MapPin, Accessibility } from 'lucide-react';
import Badge from '../common/Badge';
import { DIETARY_TAGS } from '../../data/allergenData';

export default function RestaurantCard({ restaurant, onSelect }) {
  const getDietLabel = (tagId) => {
    const found = DIETARY_TAGS.find((d) => d.id === tagId);
    return found ? found.name : tagId.toUpperCase();
  };

  const getDietIcon = (tagId) => {
    const found = DIETARY_TAGS.find((d) => d.id === tagId);
    return found ? found.icon : '🌱';
  };

  const spokenSummary = `${restaurant.name}. Rating ${restaurant.rating} stars from ${restaurant.reviewCount} reviews. Preparation time ${restaurant.prepTimeMin}. Delivery fee $${restaurant.deliveryFee.toFixed(2)}. Distance ${restaurant.distance}. Accessibility notes: ${restaurant.accessibilityNotes}. Allergen data: ${restaurant.allergenDataSource}.`;

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
      className="group bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-600 transition-all cursor-pointer focus:ring-4 focus:ring-blue-600 focus:outline-none flex flex-col h-full"
    >
      {/* Image & Badges */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
        <img
          src={restaurant.image}
          alt={restaurant.altText}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-lg bg-slate-950/90 text-white font-extrabold text-xs flex items-center gap-1 shadow">
            <Clock className="w-3.5 h-3.5 text-yellow-400" aria-hidden="true" />
            <span>{restaurant.prepTimeMin}</span>
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-950/90 text-white font-extrabold text-xs flex items-center gap-1 shadow">
            <Truck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            <span>${restaurant.deliveryFee.toFixed(2)} Fee</span>
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-yellow-400 text-slate-950 font-black text-sm flex items-center gap-1 shadow">
          <Star className="w-4 h-4 fill-slate-950 text-slate-950" aria-hidden="true" />
          <span>{restaurant.rating}</span>
          <span className="text-xs text-slate-800 font-bold">({restaurant.reviewCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
              {restaurant.name}
            </h3>
          </div>

          {/* Cuisine & Location */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
            <span>{restaurant.cuisine.join(' • ')}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-slate-500" aria-hidden="true" />
              <span>{restaurant.distance}</span>
            </span>
          </div>

          {/* Accessibility Notes */}
          <div className="mt-3 p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-2">
            <Accessibility className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              <strong className="font-bold">A11y Features:</strong> {restaurant.accessibilityNotes}
            </p>
          </div>

          {/* Certified Allergen Source Tag */}
          <div className="mt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span>{restaurant.allergenDataSource}</span>
          </div>
        </div>

        {/* Dietary Badges */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Suitable Diets:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {restaurant.dietBadges.map((badgeId) => (
              <Badge
                key={badgeId}
                icon={getDietIcon(badgeId)}
                label={getDietLabel(badgeId)}
                variant="info"
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
