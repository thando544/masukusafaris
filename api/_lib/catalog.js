import packages from "../../src/data/packages.js";
import activities from "../../src/data/activities.js";

export function toPublicPackage(item) {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    subtitle: item.subtitle || "",
    price: item.price,
    priceLabel: item.priceLabel,
    unit: item.unit,
    shortDescription: item.shortDescription,
    description: item.description,
    location: item.location,
    checkIn: item.checkIn,
    checkOut: item.checkOut,
    bestFor: item.bestFor,
    included: item.included || [],
    excluded: item.excluded || [],
    itinerary: item.itinerary || [],
    url: `https://masukusafaris.com/packages/${item.slug}`,
  };
}

export function toPublicActivity(item) {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    price: item.price,
    maxPrice: item.maxPrice,
    priceLabel: item.priceLabel,
    unit: item.unit,
    category: item.category,
    shortDescription: item.shortDescription,
    description: item.description,
    location: item.location,
    duration: item.duration,
    bestFor: item.bestFor,
    included: item.included || [],
    excluded: item.excluded || [],
    url: `https://masukusafaris.com/activities/${item.slug}`,
  };
}

export function listPackages() {
  return packages.map(toPublicPackage);
}

export function getPackage(slug) {
  const item = packages.find((entry) => entry.slug === slug);
  return item ? toPublicPackage(item) : null;
}

export function listActivities() {
  return activities.map(toPublicActivity);
}

export function getActivity(slug) {
  const item = activities.find((entry) => entry.slug === slug);
  return item ? toPublicActivity(item) : null;
}
