<script>
  let activeIndex = $state(0);
  let dragX = $state(0);
  let startX = 0;
  let startY = 0;
  let isDragging = false;

  const features = [
    { title: "HCC Capture & RAF Scoring", desc: "Surface missed HCCs and calculate RAF scores under the V28 model. See the dollar impact per member, per encounter.", icon: "target" },
    { title: "Batch Processing", desc: "Upload hundreds of notes at once. Process an entire panel in minutes, not days.", icon: "zap" },
    { title: "Documentation Specificity", desc: "Identify where documentation lacks the specificity needed to support higher-value HCCs.", icon: "file-search" },
    { title: "Recapture Tracking", desc: "Track which HCCs from prior years need recapture and flag gaps before they cost you revenue.", icon: "refresh" },
    { title: "FFS Code Generation", desc: "Also generates ICD-10-CM, CPT, and HCPCS codes for fee-for-service billing workflows.", icon: "file-code" },
    { title: "Smart De-ID & HIPAA", desc: "Intelligent PII redaction and enterprise-grade security. HIPAA compliant with BAA available.", icon: "shield" },
  ];

  function next() { activeIndex = (activeIndex + 1) % features.length; }
  function prev() { activeIndex = (activeIndex - 1 + features.length) % features.length; }

  function onDragStart(x, y) { startX = x; startY = y; isDragging = true; }
  function onDragMove(x, y) {
    if (!isDragging) return;
    const dx = x - startX;
    if (Math.abs(dx) > Math.abs(y - startY)) dragX = dx;
  }
  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    if (dragX < -50) next();
    else if (dragX > 50) prev();
    dragX = 0;
  }
</script>

<div class="carousel">
  <div
    class="stage"
    ontouchstart={(e) => onDragStart(e.touches[0].clientX, e.touches[0].clientY)}
    ontouchmove={(e) => onDragMove(e.touches[0].clientX, e.touches[0].clientY)}
    ontouchend={onDragEnd}
    onmousedown={(e) => { e.preventDefault(); onDragStart(e.clientX, e.clientY); }}
    onmousemove={(e) => onDragMove(e.clientX, e.clientY)}
    onmouseup={onDragEnd}
    onmouseleave={() => { if (isDragging) onDragEnd(); }}
    role="listbox"
    tabindex="0"
  >
    {#each features as item, i}
      {@const offset = (i - activeIndex + features.length) % features.length}
      {@const isFar = offset > 3}
      {@const swipeX = offset === 0 ? dragX : 0}
      <div
        class="feature-card"
        class:no-transition={dragX !== 0}
        style="
          transform: translateX({offset * 12 + swipeX}px) translateY({offset * 12}px);
          z-index: {features.length - offset};
          opacity: {isFar ? 0 : 1 - offset * 0.2};
          background: {offset === 0 ? '#1a312a' : `rgba(26,49,42,${0.7 - offset * 0.15})`};
          border-color: {offset === 0 ? 'transparent' : 'rgba(26,49,42,0.15)'};
          box-shadow: {offset === 0 ? '0 1px 2px rgba(26,49,42,0.04), 0 6px 16px rgba(26,49,42,0.06), 0 24px 48px rgba(26,49,42,0.08)' : 'none'};
          pointer-events: {offset === 0 ? 'auto' : 'none'};
          color: {offset === 0 ? '#f8f6e8' : `rgba(248,246,232,${0.9 - offset * 0.2})`};
        "
        role="option"
        aria-selected={offset === 0}
      >
        <div class="feature-icon">
          {#if item.icon === "target"}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
          {:else if item.icon === "zap"}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
          {:else if item.icon === "file-search"}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><circle cx="11.5" cy="14.5" r="2.5"/><path d="M13.3 16.3 15 18"/></svg>
          {:else if item.icon === "refresh"}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
          {:else if item.icon === "file-code"}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="m5 16-3 3 3 3"/><path d="m9 22 3-3-3-3"/></svg>
          {:else if item.icon === "shield"}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
          {/if}
        </div>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
    {/each}
  </div>

  <div class="nav-bar">
    <button class="nav-btn" onclick={prev} aria-label="Previous">
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <div class="dots">
      {#each features as _, i}
        <button
          class="dot"
          class:active={i === activeIndex}
          onclick={() => (activeIndex = i)}
          aria-label="Feature {i + 1}"
        ></button>
      {/each}
    </div>
    <button class="nav-btn" onclick={next} aria-label="Next">
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</div>

<style>
  .carousel { position: relative; }

  .carousel {
    position: relative;
    min-width: 0;
  }

  .stage {
    position: relative;
    height: 300px;
    touch-action: pan-y;
    user-select: none;
    cursor: grab;
  }

  .stage:active { cursor: grabbing; }

  .feature-card {
    position: absolute;
    inset: 0;
    padding: 32px;
    border-radius: var(--radius-lg);
    border: 1px solid;
    transition: all 500ms var(--ease-out);
  }

  .feature-card.no-transition { transition: none; }

  .feature-icon {
    width: 56px;
    height: 56px;
    border-radius: 14px;
    background: rgba(209, 234, 103, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    color: var(--accent-lime);
  }

  .feature-card h3 {
    margin: 0 0 10px;
    font-family: var(--font-heading);
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 0.01em;
    line-height: 1.2;
    color: inherit;
  }

  .feature-card p {
    margin: 0;
    color: inherit;
    opacity: 0.75;
    line-height: 1.5;
  }

  .nav-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 28px;
  }

  .nav-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid rgba(26, 49, 42, 0.2);
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-green);
    cursor: pointer;
    transition: all 200ms;
  }

  .nav-btn:hover {
    border-color: var(--accent-green);
    background: var(--accent-green);
    color: var(--ink-on-dark);
  }

  .dots { display: flex; gap: 6px; }

  .dot {
    height: 6px;
    width: 6px;
    border-radius: 999px;
    border: none;
    background: rgba(49, 43, 36, 0.2);
    padding: 0;
    cursor: pointer;
    transition: all 300ms;
  }

  .dot:hover { background: rgba(49, 43, 36, 0.4); }
  .dot.active { width: 20px; background: var(--ink-strong); }

  @media (min-width: 640px) {
    .stage { height: 320px; }
  }
</style>
