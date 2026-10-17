const revealTargets = document.querySelectorAll(
  [
    ".hero-copy",
    ".hero-visual",
    ".intro-layout > *",
    ".section-heading",
    ".benefit-card",
    ".industries-heading",
    ".industry-list > *",
    ".gallery-heading > *",
    ".gallery-card",
    ".contact-layout > *",
    ".interior-hero-content > *",
    ".gallery-section-heading > *",
    ".before-after-pair",
    ".gallery-video-copy",
    ".video-teaser-card",
    ".gallery-video-content > .button",
    ".video-card h3",
    ".gallery-cta-content > *",
  ].join(", "),
);

if ("IntersectionObserver" in window && revealTargets.length > 0) {
  const siblingIndexes = new Map();

  revealTargets.forEach((target) => {
    const parent = target.parentElement;
    const index = siblingIndexes.get(parent) || 0;
    siblingIndexes.set(parent, index + 1);

    target.classList.add("scroll-reveal");
    target.style.setProperty("--reveal-delay", `${Math.min(index * 90, 270)}ms`);
  });

  document.body.classList.add("motion-ready");

  const revealGroups = new Map();

  revealTargets.forEach((target) => {
    const observerTarget = target.closest(".gallery-video-teaser, .gallery-cta") || target;
    const group = revealGroups.get(observerTarget) || [];
    group.push(target);
    revealGroups.set(observerTarget, group);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        revealGroups.get(entry.target).forEach((target) => {
          target.classList.toggle("is-visible", entry.isIntersecting);
        });
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealGroups.forEach((_, target) => observer.observe(target));
}
