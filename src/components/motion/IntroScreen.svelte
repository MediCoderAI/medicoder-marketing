<script>
  import { onMount } from "svelte";

  let displayedText = $state("");
  let isAnimatingOut = $state(false);
  let isVisible = $state(true);
  const fullText = "MediCoder.AI";
  const typingSpeed = 80;

  onMount(() => {
    // Plays on every home load; skipped on deep links (e.g. /#faq). See MarketingLayout.
    if (document.documentElement.classList.contains("skip-intro")) {
      isVisible = false;
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        displayedText = fullText.slice(0, i);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(dismiss, 800);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  });

  function dismiss() {
    if (isAnimatingOut) return;
    isAnimatingOut = true;
    window.dispatchEvent(new Event("intro:done"));
    setTimeout(() => (isVisible = false), 800);
  }
</script>

{#if isVisible}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="intro"
    data-intro
    class:out={isAnimatingOut}
    onclick={dismiss}
  >
    <h1 class="intro-title">
      {displayedText}
      {#if displayedText.length < fullText.length}
        <span class="cursor"></span>
      {/if}
    </h1>
  </div>
{/if}

<style>
  .intro {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg);
    cursor: pointer;
    transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1),
      opacity 700ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .intro.out {
    transform: translateY(-100%);
    opacity: 0;
  }

  .intro-title {
    margin: 0;
    font-family: var(--font-sans);
    font-weight: 400;
    font-size: clamp(40px, 6vw, 72px);
    color: var(--ink);
    letter-spacing: -0.04em;
    line-height: 1;
  }

  .cursor {
    display: inline-block;
    width: 3px;
    height: 0.85em;
    margin-left: 2px;
    background: var(--green);
    vertical-align: baseline;
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
</style>
