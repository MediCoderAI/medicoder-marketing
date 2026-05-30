<script>
  import { onMount } from "svelte";

  export let delay = 0;
  export let distance = 100;
  export let duration = 760;
  export let rotate = -20;

  let visible = false;
  let element;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        visible = true;
        observer.disconnect();
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  });
</script>

<div
  bind:this={element}
  class:visible
  class="reveal"
  style="--r-delay:{delay}ms; --r-dist:{distance}px; --r-dur:{duration}ms; --r-rot:{rotate}deg;"
>
  <slot />
</div>

<style>
  .reveal {
    opacity: 0;
    transform: perspective(1300px) translateY(var(--r-dist)) rotateX(var(--r-rot));
    transition:
      opacity var(--r-dur) var(--ease-standard),
      transform var(--r-dur) var(--ease-standard);
    transition-delay: var(--r-delay);
    will-change: transform, opacity;
  }

  .visible {
    opacity: 1;
    transform: perspective(1300px) translateY(0) rotateX(0deg);
  }
</style>
