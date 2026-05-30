<script>
  import { onMount } from "svelte";

  let animationStep = $state(0);
  let isPlaying = $state(false);

  const hccResults = [
    { code: "HCC 85", desc: "Congestive Heart Failure", raf: "+0.323", status: "Missed" },
    { code: "HCC 18", desc: "Diabetes with Chronic Complications", raf: "+0.302", status: "Missed" },
    { code: "HCC 85", desc: "Coronary Artery Disease", raf: "+0.141", status: "Captured" },
    { code: "HCC 22", desc: "Morbid Obesity", raf: "+0.250", status: "Missed" },
  ];

  const timings = [1500, 2000, 200, 2000, 4000];

  $effect(() => {
    if (!isPlaying) return;
    const timer = setTimeout(() => {
      if (animationStep === 4) {
        isPlaying = false;
        setTimeout(() => (animationStep = 0), 600);
      } else {
        animationStep = animationStep + 1;
      }
    }, timings[animationStep]);
    return () => clearTimeout(timer);
  });

  function handlePlay() {
    animationStep = 0;
    isPlaying = true;
  }
</script>

<div class="demo-shell">
  <div class="demo-card">
    <div
      class="slide-wrap"
      style="transform: translateY({animationStep >= 4 ? '-100%' : '0'})"
    >
      <!-- Slide 1: Clinical Note -->
      <div class="slide">
        <div class="row-header">
          <span class="label-badge mono">CLINICAL NOTE</span>
          {#if animationStep === 0}
            <span class="paste-tag">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Pasted
            </span>
          {/if}
          <div class="rule"></div>
        </div>

        <div class="note-body" class:fade-in={animationStep === 0}>
          <p>
            73-year-old male presents for annual check-up. History of
            <mark>congestive heart failure</mark>
            and <mark>type 2 diabetes with neuropathy</mark>.
          </p>
          <p>
            BMI 42. <mark>Morbid obesity</mark> documented. Prior
            <mark>coronary artery disease</mark> with stent 04/2022.
          </p>
        </div>

        <div class="action-area">
          {#if animationStep === 1}
            <button class="analyze-btn" onclick={undefined}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Analyze Note
            </button>
          {:else if animationStep === 2}
            <button class="analyze-btn pressed">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Analyze Note
            </button>
          {:else if animationStep === 3}
            <div class="dots-row">
              <span class="dot d1"></span>
              <span class="dot d2"></span>
              <span class="dot d3"></span>
              <span class="dots-label">Analyzing...</span>
            </div>
          {/if}
        </div>
      </div>

      <!-- Slide 2: Results -->
      <div class="slide slide-results">
        <div class="row-header">
          <span class="label-badge results-badge mono">HCC GAP ANALYSIS</span>
          <div class="rule"></div>
        </div>

        <div class="results-list">
          {#each hccResults as item}
            <div class="result-row">
              <div class="result-left">
                <span class="result-code mono">{item.code}</span>
                <span class="result-desc">{item.desc}</span>
              </div>
              <div class="result-right">
                <span class="result-raf mono">{item.raf}</span>
                <span class="result-tag" class:missed={item.status === "Missed"} class:captured={item.status === "Captured"}>
                  {item.status}
                </span>
              </div>
            </div>
          {/each}
        </div>

        <div class="raf-summary">
          <div>
            <div class="raf-label mono">TOTAL RAF SCORE</div>
            <div class="raf-value">1.847</div>
          </div>
          <div class="raf-right">
            <div class="raf-label mono">EST. REVENUE IMPACT</div>
            <div class="raf-value raf-green">+$4,215<span class="raf-unit">/yr</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Play overlay -->
    <div class="play-overlay" class:hidden={isPlaying}>
      <h3 class="play-heading">
        <span>Watch a note</span><br />
        <span>become <em>revenue</em></span>
      </h3>
      <button class="play-btn btn-dark" onclick={handlePlay}>
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
        Watch Demo
        <span class="arrow-circle">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </button>
    </div>
  </div>
</div>

<style>
  .demo-shell {
    position: relative;
  }

  .demo-card {
    position: relative;
    overflow: hidden;
    height: 500px;
    border-radius: var(--radius-lg);
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid var(--line-subtle);
    box-shadow: var(--shadow-card);
  }

  .slide-wrap {
    position: absolute;
    inset: 0;
    padding: 28px;
    transition: transform 700ms ease-in-out;
  }

  .slide {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .slide-results {
    padding-top: 2.5rem;
  }

  .mono {
    font-family: var(--font-mono);
  }

  .row-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }

  .label-badge {
    padding: 3px 10px;
    border-radius: var(--radius-pill);
    background: rgba(49, 43, 36, 0.08);
    color: var(--ink-strong);
    font-size: 11px;
    font-weight: 600;
    white-space: nowrap;
  }

  .results-badge {
    background: rgba(209, 234, 103, 0.25);
    color: #5a6e1c;
  }

  .paste-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--ink-muted);
    font-size: 12px;
    font-weight: 500;
    animation: fadeIn 400ms ease-out;
  }

  .rule {
    flex: 1;
    height: 1px;
    background: var(--line-subtle);
  }

  .note-body {
    color: var(--ink-strong);
    line-height: 1.7;
    font-size: 14px;
  }

  .note-body.fade-in {
    animation: slideUp 600ms ease-out;
  }

  .note-body p {
    margin: 0 0 10px;
  }

  mark {
    background: rgba(209, 234, 103, 0.3);
    color: #3d5a0a;
    padding: 1px 5px;
    border-radius: 3px;
    font-weight: 500;
  }

  .action-area {
    display: flex;
    justify-content: center;
    padding-top: 3.5rem;
  }

  .analyze-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: var(--radius-pill);
    border: none;
    cursor: pointer;
    font-family: var(--font-body);
    font-weight: 500;
    font-size: 14px;
    color: var(--ink-on-dark);
    background: var(--accent-green);
    box-shadow: 0 8px 20px rgba(26, 49, 42, 0.3);
    animation: scaleIn 400ms ease-out;
  }

  .analyze-btn.pressed {
    transform: scale(0.95);
    opacity: 0.8;
    transition: all 200ms;
  }

  .dots-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--accent-lime);
    animation: pulse 1.4s ease-in-out infinite;
  }

  .d2 { animation-delay: 200ms; }
  .d3 { animation-delay: 400ms; }

  .dots-label {
    color: var(--ink-muted);
    font-weight: 500;
    margin-left: 4px;
    font-size: 14px;
  }

  .results-list {
    display: grid;
    gap: 6px;
  }

  .result-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    background: rgba(49, 43, 36, 0.04);
    border-radius: 8px;
    transition: all 200ms;
  }

  .result-row:hover {
    background: rgba(209, 234, 103, 0.12);
  }

  .result-left {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .result-code {
    font-size: 12px;
    font-weight: 600;
    color: var(--ink-strong);
    flex-shrink: 0;
  }

  .result-desc {
    font-size: 13px;
    color: var(--ink-muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .result-right {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .result-raf {
    font-size: 12px;
    font-weight: 600;
    color: var(--accent-green);
  }

  .result-tag {
    font-size: 11px;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 4px;
  }

  .result-tag.missed {
    background: #fef2f2;
    color: #b91c1c;
  }

  .result-tag.captured {
    background: rgba(209, 234, 103, 0.2);
    color: #3d5a0a;
  }

  .raf-summary {
    margin-top: 10px;
    padding: 14px 16px;
    border-radius: 10px;
    border: 1px solid var(--line-subtle);
    background: rgba(49, 43, 36, 0.03);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .raf-label {
    font-size: 10px;
    color: var(--ink-muted);
    margin-bottom: 4px;
  }

  .raf-value {
    font-family: var(--font-heading);
    font-weight: 500;
    font-size: 22px;
    color: var(--ink-strong);
    letter-spacing: -0.02em;
  }

  .raf-green {
    color: var(--accent-green);
  }

  .raf-unit {
    font-size: 13px;
    font-weight: 400;
    color: var(--ink-muted);
  }

  .raf-right {
    text-align: right;
  }

  /* Play overlay */
  .play-overlay {
    position: absolute;
    inset: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--bg-page);
    transition: opacity 500ms;
  }

  .play-overlay.hidden {
    opacity: 0;
    pointer-events: none;
  }

  .play-heading {
    font-family: var(--font-heading);
    font-weight: 400;
    font-size: clamp(28px, 3vw, 38px);
    color: var(--ink-strong);
    text-align: center;
    letter-spacing: -0.03em;
    line-height: 1.2;
    margin: 0 0 24px;
  }

  .play-heading em {
    font-style: italic;
  }

  .play-btn {
    font-size: 14px !important;
    gap: 10px !important;
    padding: 8px 8px 8px 20px !important;
  }

  .play-btn .arrow-circle {
    width: 2.2rem;
    height: 2.2rem;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  @media (max-width: 640px) {
    .demo-card {
      height: 500px;
    }

    .slide-wrap {
      padding: 16px;
    }

    .result-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }

    .raf-value {
      font-size: 18px;
    }

    .action-area {
      padding-top: 5rem;
    }
  }
</style>
