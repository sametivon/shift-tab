/* Single source for site navigation targets — consumed by Nav (desktop pill)
   and MobileMenu. Once the scene registry lands, Nav derives its list from
   registered scenes on the Home journey and falls back to this on other pages. */
export const navLinks = [
  { label: "Products", href: "/#products" },
  { label: "What we build", href: "/#build" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];
