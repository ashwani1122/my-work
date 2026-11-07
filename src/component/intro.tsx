import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const AMBIENT_COUNT = 16;

const HERO_START = 0.4;
const HERO_STAGGER = 0.26;
const HERO_REVEAL = 0.85;
const ENTER_RATIO = 0.88;
const SCROLL_SPEED = 560;
const MIN_SCROLL_DURATION = 7.5;
const MAX_SCROLL_DURATION = 11.5;
const COMPLETE_HOLD = 0.6;
const REWIND_DURATION = 1.1;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

type Corner = "tl" | "tr" | "bl" | "br";
type Accent = "yellow" | "white";

type TargetMeta = {
  id: string;
  tag: string;
  accent: Accent;
  from: Corner;
  hero: boolean;
  heroIndex: number;
};

type TargetRuntime = TargetMeta & {
  el: HTMLElement;
  triggered: boolean;
  start: number;
  duration: number;
  done: boolean;
  doneAt: number;
};

const corners: Corner[] = ["tl", "br", "tr", "bl"];

const oppositeCorner = (corner: Corner): Corner => {
  if (corner === "tl") return "br";
  if (corner === "br") return "tl";
  if (corner === "tr") return "bl";
  return "tr";
};

const cornerOf = (rect: DOMRect, corner: Corner) => {
  if (corner === "tl") return { x: rect.left, y: rect.top };
  if (corner === "tr") return { x: rect.right, y: rect.top };
  if (corner === "bl") return { x: rect.left, y: rect.bottom };
  return { x: rect.right, y: rect.bottom };
};

const launchPoint = (rect: DOMRect, corner: Corner, index: number) => {
  const anchor = cornerOf(rect, corner);
  const dx = (index % 2 === 0 ? -1 : 1) * (60 + ((index * 41) % 120));
  const dy = -40 - ((index * 29) % 90);
  return {
    x: clamp(anchor.x + dx, 8, window.innerWidth - 8),
    y: clamp(anchor.y + dy, 8, window.innerHeight - 8),
  };
};

function CursorSvg({
  accent = "yellow",
  size = 22,
}: {
  accent?: Accent;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={(size * 26) / 22}
      viewBox="0 0 22 26"
      fill="none"
      aria-hidden="true"
      className="drop-shadow-[2px_2px_0_rgba(0,0,0,0.28)]"
    >
      <path
        d="M2 1.5L20 13.2L11.4 15.1L15.7 23.3L11.8 25.1L7.6 16.6L2 22.2V1.5Z"
        fill={accent === "yellow" ? "#ffe600" : "#ffffff"}
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const buildAmbient = (width: number, height: number) => {
  const w = Math.max(360, width);
  const h = Math.max(480, height);
  const paths = [
    `M ${0.08 * w} ${0.18 * h} C ${0.36 * w} ${0.02 * h}, ${0.82 * w} ${0.04 * h}, ${0.93 * w} ${0.26 * h} C ${1.02 * w} ${0.55 * h}, ${0.78 * w} ${0.9 * h}, ${0.45 * w} ${0.92 * h} C ${0.12 * w} ${0.94 * h}, ${-0.02 * w} ${0.52 * h}, ${0.08 * w} ${0.18 * h} Z`,
    `M ${0.22 * w} ${0.08 * h} C ${0.55 * w} ${0.16 * h}, ${0.7 * w} ${0.36 * h}, ${0.86 * w} ${0.42 * h} C ${0.98 * w} ${0.72 * h}, ${0.72 * w} ${0.98 * h}, ${0.48 * w} ${0.8 * h} C ${0.24 * w} ${0.62 * h}, ${0.08 * w} ${0.34 * h}, ${0.22 * w} ${0.08 * h} Z`,
    `M ${0.04 * w} ${0.62 * h} C ${0.24 * w} ${0.4 * h}, ${0.48 * w} ${0.56 * h}, ${0.62 * w} ${0.44 * h} C ${0.82 * w} ${0.28 * h}, ${0.96 * w} ${0.46 * h}, ${0.9 * w} ${0.68 * h} C ${0.84 * w} ${0.9 * h}, ${0.56 * w} ${1.02 * h}, ${0.34 * w} ${0.86 * h} C ${0.14 * w} ${0.72 * h}, ${-0.04 * w} ${0.78 * h}, ${0.04 * w} ${0.62 * h} Z`,
    `M ${0.5 * w} ${0.12 * h} C ${0.72 * w} ${0.06 * h}, ${0.98 * w} ${0.2 * h}, ${0.94 * w} ${0.44 * h} C ${0.9 * w} ${0.68 * h}, ${0.7 * w} ${0.6 * h}, ${0.58 * w} ${0.48 * h} C ${0.42 * w} ${0.34 * h}, ${0.36 * w} ${0.2 * h}, ${0.5 * w} ${0.12 * h} Z`,
  ];

  return Array.from({ length: AMBIENT_COUNT }, (_, i) => ({
    id: `ambient-${i}`,
    path: paths[i % paths.length],
    duration: 14 + (i % 6) * 2.2,
    delay: -((i * 1.61) % 16),
    opacity: 0.14 + (i % 3) * 0.06,
    scale: 0.62 + (i % 4) * 0.07,
    label:
      i % 6 === 0
        ? `${["ui", "ux", "dev", "qa"][i % 4]}_${String(i).padStart(2, "0")}`
        : "",
  }));
};

export default function IntroSequence({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [metas, setMetas] = useState<TargetMeta[]>([]);
  const [exiting, setExiting] = useState(false);
  const [viewport, setViewport] = useState(() => ({
    w: typeof window === "undefined" ? 1440 : window.innerWidth,
    h: typeof window === "undefined" ? 900 : window.innerHeight,
  }));

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const finishedRef = useRef(false);
  const completeRef = useRef(false);
  const skipRef = useRef<HTMLButtonElement | null>(null);

  const statusRef = useRef<HTMLParagraphElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const percentRef = useRef<HTMLSpanElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const scrollFillRef = useRef<HTMLDivElement | null>(null);
  const scrollPctRef = useRef<HTMLSpanElement | null>(null);

  const cursorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dimRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const doneRefs = useRef<(HTMLDivElement | null)[]>([]);

  const ambient = useMemo(
    () => buildAmbient(viewport.w, viewport.h),
    [viewport],
  );

  useEffect(() => {
    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  const skip = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onCompleteRef.current();
  };

  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const page = document.querySelector<HTMLElement>("[data-portfolio-page]");
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-intro]"),
    );

    if (!page || elements.length === 0) {
      onCompleteRef.current();
      return;
    }

    finishedRef.current = false;
    completeRef.current = false;

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    let previousScrollRestoration: ScrollRestoration | null = null;
    try {
      previousScrollRestoration = history.scrollRestoration;
      history.scrollRestoration = "manual";
    } catch {
      /* ignore */
    }

    // Lock scrolling first: programmatic scrolling still works, but the page
    // cannot be moved by the user while the agents are drawing.
    html.dataset.introPlaying = "true";
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const originalClip = new Map<HTMLElement, string>();
    for (const el of elements) {
      originalClip.set(el, el.style.clipPath);
      el.style.clipPath = "inset(0 100% 100% 0)";
    }

    const vh = window.innerHeight;
    const heroSection = document.getElementById("home");
    const isHeroElement = (el: HTMLElement) =>
      Boolean(el.closest("header")) ||
      Boolean(heroSection && heroSection.contains(el));

    const runtime: TargetRuntime[] = elements.map((el, i) => {
      const id = el.dataset.intro || `block-${i + 1}`;
      const hero = isHeroElement(el) && el.getBoundingClientRect().top < vh * 0.92;
      return {
        el,
        id,
        tag: id.replace(/-/g, "_").toUpperCase(),
        accent: i % 3 === 0 ? "yellow" : "white",
        from: corners[i % corners.length],
        hero,
        heroIndex: 0,
        triggered: false,
        start: Number.POSITIVE_INFINITY,
        duration: HERO_REVEAL,
        done: false,
        doneAt: 0,
      };
    });

    let heroCount = 0;
    for (const target of runtime) {
      if (target.hero) target.heroIndex = heroCount++;
    }

    setMetas(
      runtime.map((target) => ({
        id: target.id,
        tag: target.tag,
        accent: target.accent,
        from: target.from,
        hero: target.hero,
        heroIndex: target.heroIndex,
      })),
    );

    const heroTargets = runtime.filter((target) => target.hero);
    const heroEnd =
      heroCount > 0
        ? HERO_START + (heroCount - 1) * HERO_STAGGER + HERO_REVEAL
        : HERO_START;
    // Hold on the fully revealed hero before the page starts moving.
    const scrollStart = heroEnd + 0.9;

    const startedAt = performance.now();
    html.dataset.introStarted = String(startedAt);

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      onCompleteRef.current();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        finish();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    let raf = 0;
    let scrollStarted = false;
    let scrollStartAt = 0;
    let scrollMax = 0;
    let scrollDuration = 0;
    let completeAt = 0;
    let rewindStarted = false;
    let rewindAt = 0;
    let rewindFrom = 0;
    let lastDone = -1;
    let lastStatus = "";
    let lastScrollPct = -1;

    const tick = (now: number) => {
      const t = (now - startedAt) / 1000;
      const viewHeight = window.innerHeight;

      // Hero targets are drawn in place before the page starts scrolling.
      for (const target of heroTargets) {
        if (!target.triggered && t >= HERO_START + target.heroIndex * HERO_STAGGER) {
          target.triggered = true;
          target.start = HERO_START + target.heroIndex * HERO_STAGGER;
          target.duration = HERO_REVEAL;
        }
      }

      // Read every target rect once per frame, before any writes.
      const frames = runtime.map((target) => ({
        target,
        rect: target.el.getBoundingClientRect(),
      }));

      // Scrolled targets are drawn as soon as they enter the viewport.
      if (t >= scrollStart) {
        const entering = frames.filter(
          ({ target, rect }) =>
            !target.hero &&
            !target.triggered &&
            rect.top <= viewHeight * ENTER_RATIO &&
            rect.bottom > 8,
        );
        entering.sort((a, b) => a.rect.top - b.rect.top);
        entering.forEach(({ target, rect }, i) => {
          target.triggered = true;
          target.start = t + i * 0.1;
          target.duration = clamp(
            0.75 + Math.max(rect.width, rect.height) / 3000,
            0.85,
            1.15,
          );
        });
      }

      let scrollY = window.scrollY;

      if (t >= scrollStart) {
        if (!scrollStarted) {
          scrollStarted = true;
          scrollStartAt = t;
          scrollMax = Math.max(
            0,
            document.documentElement.scrollHeight - viewHeight,
          );
          scrollDuration = clamp(
            scrollMax / SCROLL_SPEED,
            MIN_SCROLL_DURATION,
            MAX_SCROLL_DURATION,
          );
        }

        if (!rewindStarted) {
          const progress = clamp((t - scrollStartAt) / scrollDuration, 0, 1);
          scrollY = Math.round(progress * scrollMax);
          window.scrollTo(0, scrollY);
        }
      }

      const scrollDone =
        scrollStarted && t >= scrollStartAt + scrollDuration;

      if (scrollDone && !rewindStarted) {
        for (const target of runtime) {
          if (!target.triggered) {
            target.triggered = true;
            target.start = t;
            target.duration = 0.7;
          }
        }
      }

      // Finish any reveal whose window has elapsed.
      for (const { target } of frames) {
        if (
          target.triggered &&
          !target.done &&
          t >= target.start + target.duration
        ) {
          target.done = true;
          target.doneAt = t;
          target.el.style.clipPath = "none";
        }
      }

      let doneCount = 0;
      let activeTag = "";
      let activeStart = -Infinity;

      for (let i = 0; i < frames.length; i++) {
        const { target, rect } = frames[i];
        const cursor = cursorRefs.current[i];
        const tag = tagRefs.current[i];
        const box = boxRefs.current[i];
        const dim = dimRefs.current[i];
        const slot = slotRefs.current[i];
        const badge = doneRefs.current[i];
        const onScreen = rect.bottom > 0 && rect.top < viewHeight;

        if (target.done) doneCount += 1;

        if (slot) {
          if (!onScreen || target.done) {
            slot.style.opacity = "0";
          } else {
            slot.style.opacity = target.triggered ? "0.12" : "0.55";
            slot.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`;
            slot.style.width = `${rect.width}px`;
            slot.style.height = `${rect.height}px`;
          }
        }

        if (!target.triggered) {
          if (cursor) cursor.style.opacity = "0";
          if (tag) tag.style.opacity = "0";
          if (box) box.style.opacity = "0";
          if (badge) badge.style.opacity = "0";
          continue;
        }

        if (target.done) {
          const since = t - target.doneAt;
          const fade = clamp(1 - since / 0.3, 0, 1);
          const endPoint = cornerOf(rect, oppositeCorner(target.from));
          if (cursor) {
            cursor.style.transform = `translate3d(${endPoint.x - 2}px, ${endPoint.y - 1.5}px, 0) scale(${1 - (1 - fade) * 0.18})`;
            cursor.style.opacity = String(fade);
          }
          if (tag) tag.style.opacity = "0";
          if (box) box.style.opacity = "0";
          if (badge) {
            badge.style.opacity = String(clamp(1 - since / 0.7, 0, 1));
            badge.style.transform = `translate3d(${rect.right - 8}px, ${rect.top - 8}px, 0)`;
          }
          continue;
        }

        const anchor = cornerOf(rect, target.from);
        const opposite = cornerOf(rect, oppositeCorner(target.from));
        const appearAt = target.start - 0.6;

        let pointerX = anchor.x;
        let pointerY = anchor.y;
        let cursorOpacity = 0;
        let cursorScale = 1;
        let tagOpacity = 0;
        let boxOpacity = 0;

        if (t >= appearAt) {
          if (t < target.start) {
            const p = easeOutCubic(clamp((t - appearAt) / 0.6, 0, 1));
            const launch = launchPoint(rect, target.from, i);
            pointerX = lerp(launch.x, anchor.x, p);
            pointerY = lerp(launch.y, anchor.y, p);
            cursorOpacity = p;
            cursorScale = 0.72 + 0.28 * p;
          } else {
            const p = easeInOutCubic(
              clamp((t - target.start) / target.duration, 0, 1),
            );
            const wobble = Math.sin(p * Math.PI * 2.2) * (1 - p) * 2;
            pointerX = clamp(
              lerp(anchor.x, opposite.x, p) + wobble,
              rect.left,
              rect.right,
            );
            pointerY = clamp(
              lerp(anchor.y, opposite.y, p) - wobble,
              rect.top,
              rect.bottom,
            );
            cursorOpacity = 1;
            tagOpacity = 1;
            boxOpacity = 1;
            if (target.start > activeStart) {
              activeStart = target.start;
              activeTag = target.tag;
            }
          }
        }

        if (t >= target.start) {
          const left = Math.min(anchor.x, pointerX);
          const top = Math.min(anchor.y, pointerY);
          const right = Math.max(anchor.x, pointerX);
          const bottom = Math.max(anchor.y, pointerY);
          const topInset = clamp(top - rect.top, 0, rect.height);
          const leftInset = clamp(left - rect.left, 0, rect.width);
          const rightInset = clamp(rect.right - right, 0, rect.width);
          const bottomInset = clamp(rect.bottom - bottom, 0, rect.height);
          target.el.style.clipPath = `inset(${topInset}px ${rightInset}px ${bottomInset}px ${leftInset}px)`;
        }

        if (cursor) {
          cursor.style.transform = `translate3d(${pointerX - 2}px, ${pointerY - 1.5}px, 0) scale(${cursorScale})`;
          cursor.style.opacity = String(cursorOpacity);
        }
        if (tag) tag.style.opacity = String(tagOpacity);

        if (box && dim) {
          if (boxOpacity > 0) {
            const left = Math.min(anchor.x, pointerX);
            const top = Math.min(anchor.y, pointerY);
            const right = Math.max(anchor.x, pointerX);
            const bottom = Math.max(anchor.y, pointerY);
            box.style.opacity = "1";
            box.style.transform = `translate3d(${left}px, ${top}px, 0)`;
            box.style.width = `${right - left}px`;
            box.style.height = `${bottom - top}px`;
            dim.textContent = `${Math.round(right - left)} × ${Math.round(bottom - top)}`;
          } else {
            box.style.opacity = "0";
          }
        }
        if (badge) badge.style.opacity = "0";
      }

      const allDone = doneCount === runtime.length;

      if (!completeRef.current && scrollDone && allDone) {
        completeRef.current = true;
        completeAt = t;
        window.scrollTo(0, scrollMax);
      }

      if (
        completeRef.current &&
        !rewindStarted &&
        t >= completeAt + COMPLETE_HOLD
      ) {
        rewindStarted = true;
        rewindAt = t;
        rewindFrom = window.scrollY;
        setExiting(true);
      }

      if (rewindStarted) {
        const p = clamp((t - rewindAt) / REWIND_DURATION, 0, 1);
        window.scrollTo(
          0,
          Math.round(rewindFrom * (1 - easeInOutCubic(p))),
        );
        if (p >= 1) {
          finish();
          return;
        }
      }

      if (doneCount !== lastDone) {
        lastDone = doneCount;
        const total = runtime.length;
        if (progressRef.current) {
          progressRef.current.textContent = `PLACED ${String(doneCount).padStart(2, "0")}/${total}`;
        }
        if (percentRef.current) {
          percentRef.current.textContent = `${Math.round((doneCount / total) * 100)}%`;
        }
        if (barRef.current) {
          barRef.current.style.width = `${(doneCount / total) * 100}%`;
        }
      }

      const scrollPct =
        scrollStarted && scrollMax > 0 ? clamp(scrollY / scrollMax, 0, 1) : 0;
      if (Math.abs(scrollPct - lastScrollPct) > 0.002) {
        lastScrollPct = scrollPct;
        if (scrollFillRef.current) {
          scrollFillRef.current.style.height = `${scrollPct * 100}%`;
        }
        if (scrollPctRef.current) {
          scrollPctRef.current.textContent = `${Math.round(scrollPct * 100)}%`;
        }
      }

      const status = completeRef.current
        ? "render complete · 0 errors"
        : activeTag
          ? `${activeTag.toLowerCase()} is being drawn…`
          : !scrollStarted
            ? "agents drawing hero…"
            : scrollDone
              ? "finalizing render…"
              : "agents scrolling page…";
      if (status !== lastStatus && statusRef.current) {
        lastStatus = status;
        statusRef.current.textContent = status;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    skipRef.current?.focus({ preventScroll: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      for (const [el, value] of originalClip) {
        el.style.clipPath = value;
      }
      delete html.dataset.introPlaying;
      delete html.dataset.introStarted;
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      window.scrollTo(0, 0);
      try {
        history.scrollRestoration = previousScrollRestoration ?? "auto";
      } catch {
        /* ignore */
      }
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[200] select-none touch-none overflow-hidden font-mono text-black dark:text-white"
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio render sequence"
    >
      {/* Ambient agents drifting across the viewport */}
      <div className="absolute inset-0">
        {ambient.map((agent) => (
          <div
            key={agent.id}
            className="intro-drift pointer-events-none absolute left-0 top-0"
            style={
              {
                offsetPath: `path("${agent.path}")`,
                offsetRotate: "0deg",
                animationDuration: `${agent.duration}s`,
                animationDelay: `${agent.delay}s`,
                opacity: agent.opacity,
                transform: `scale(${agent.scale})`,
              } as CSSProperties
            }
          >
            <CursorSvg accent="white" size={16} />
            {agent.label && (
              <span className="absolute left-3 top-3 whitespace-nowrap border border-black/25 bg-[#f4f1ea]/80 px-1 py-0.5 text-[7px] font-bold uppercase tracking-wider text-black/60 dark:border-white/25 dark:bg-black/80 dark:text-white/60">
                {agent.label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Blueprint slots marking where each real component will be drawn */}
      {metas.map((meta, i) => (
        <div
          key={`slot-${meta.id}`}
          ref={(el) => {
            slotRefs.current[i] = el;
          }}
          className="pointer-events-none absolute left-0 top-0 border border-dashed border-black/50 dark:border-white/50"
          style={{ opacity: 0, willChange: "transform, opacity" }}
        >
          <span className="absolute -left-px -top-px h-1.5 w-1.5 border border-black bg-[#ffe600] dark:border-white" />
          <span className="absolute -right-px -top-px h-1.5 w-1.5 border border-black bg-[#ffe600] dark:border-white" />
          <span className="absolute -bottom-px -left-px h-1.5 w-1.5 border border-black bg-[#ffe600] dark:border-white" />
          <span className="absolute -bottom-px -right-px h-1.5 w-1.5 border border-black bg-[#ffe600] dark:border-white" />
        </div>
      ))}

      {/* Drag selection boxes */}
      {metas.map((meta, i) => (
        <div
          key={`box-${meta.id}`}
          ref={(el) => {
            boxRefs.current[i] = el;
          }}
          className="pointer-events-none absolute left-0 top-0 z-20 border border-dashed border-[#b8a600] dark:border-[#ffe600]"
          style={{ opacity: 0, willChange: "transform, width, height" }}
        >
          <span className="absolute -left-[3px] -top-[3px] h-[5px] w-[5px] border border-black bg-[#ffe600] dark:border-white" />
          <span className="absolute -right-[3px] -top-[3px] h-[5px] w-[5px] border border-black bg-[#ffe600] dark:border-white" />
          <span className="absolute -bottom-[3px] -left-[3px] h-[5px] w-[5px] border border-black bg-[#ffe600] dark:border-white" />
          <span className="absolute -bottom-[3px] -right-[3px] h-[5px] w-[5px] border border-black bg-[#ffe600] dark:border-white" />
          <span
            ref={(el) => {
              dimRefs.current[i] = el;
            }}
            className="absolute -bottom-[13px] left-0 whitespace-nowrap bg-[#f4f1ea] px-0.5 text-[6px] font-bold tracking-[0.18em] text-[#7c6f00] dark:bg-black dark:text-[#ffe600]"
          >
            0 × 0
          </span>
        </div>
      ))}

      {/* Completion checks */}
      {metas.map((meta, i) => (
        <div
          key={`done-${meta.id}`}
          ref={(el) => {
            doneRefs.current[i] = el;
          }}
          className="pointer-events-none absolute left-0 top-0 z-30 grid h-4 w-4 place-items-center border border-black bg-[#ffe600] text-[8px] font-bold text-black opacity-0"
        >
          ✓
        </div>
      ))}

      {/* Agent cursors */}
      {metas.map((meta, i) => (
        <div
          key={`cursor-${meta.id}`}
          ref={(el) => {
            cursorRefs.current[i] = el;
          }}
          className="pointer-events-none absolute left-0 top-0 z-40 opacity-0"
          style={{ transform: "translate3d(-100px,-100px,0)" }}
        >
          <CursorSvg accent={meta.accent} />
          <div
            ref={(el) => {
              tagRefs.current[i] = el;
            }}
            className={`absolute left-[15px] top-[17px] flex items-center gap-1 whitespace-nowrap border px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] opacity-0 ${
              meta.accent === "yellow"
                ? "border-black bg-[#ffe600] text-black"
                : "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 ${
                meta.accent === "yellow" ? "bg-black" : "bg-[#ffe600]"
              }`}
            />
            <span className="opacity-55">
              ag_{String(i + 1).padStart(2, "0")}
            </span>
            <span>{meta.tag}</span>
          </div>
        </div>
      ))}

      {/* Scroll rail */}
      <div className="pointer-events-none absolute right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 sm:flex">
        <span className="text-[7px] font-bold uppercase tracking-[0.2em] opacity-50">
          scroll
        </span>
        <div className="relative h-[140px] w-[6px] overflow-hidden border border-black bg-white/60 dark:border-white dark:bg-black/60">
          <div
            ref={scrollFillRef}
            className="absolute left-0 top-0 w-full bg-[#ffe600]"
            style={{ height: "0%" }}
          />
        </div>
        <span
          ref={scrollPctRef}
          className="text-[7px] font-bold uppercase tracking-[0.1em] opacity-50"
        >
          0%
        </span>
      </div>

      {/* Bottom HUD */}
      <div
        className={`pointer-events-auto absolute inset-x-0 bottom-0 z-50 border-t-2 border-black bg-[#f4f1ea]/95 backdrop-blur-sm transition-opacity duration-300 dark:border-white dark:bg-black/95 ${
          exiting ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-2.5 sm:gap-5 sm:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="h-2 w-2 shrink-0 animate-pulse bg-[#b8a600] dark:bg-[#ffe600]" />
            <div className="min-w-0">
              <p
                ref={statusRef}
                className="truncate text-[9px] font-bold uppercase tracking-[0.14em] sm:text-[10px]"
              >
                initializing render grid…
              </p>
              <p className="mt-0.5 hidden text-[7px] uppercase tracking-[0.16em] opacity-45 sm:block">
                {metas.length} agents · {metas.length + AMBIENT_COUNT} cursors ·
                scroll-linked
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 text-[9px] font-bold uppercase tracking-[0.14em] sm:text-[10px]">
            <span ref={progressRef}>PLACED 00/{metas.length}</span>
            <span
              ref={percentRef}
              className="text-[#7c6f00] dark:text-[#ffe600]"
            >
              0%
            </span>
          </div>

          <div className="hidden h-2 w-[150px] border-2 border-black bg-white sm:block dark:border-white dark:bg-black">
            <div
              ref={barRef}
              className="h-full w-0 bg-[#ffe600] transition-[width] duration-300"
            />
          </div>

          <button
            ref={skipRef}
            type="button"
            onClick={skip}
            className="pointer-events-auto shrink-0 border-2 border-black bg-[#ffe600] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.12em] text-black shadow-[2px_2px_0_0_#000] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 dark:border-white dark:shadow-[2px_2px_0_0_#fff] sm:px-3 sm:text-[9px]"
          >
            skip [esc]
          </button>
        </div>
      </div>
    </div>
  );
}
