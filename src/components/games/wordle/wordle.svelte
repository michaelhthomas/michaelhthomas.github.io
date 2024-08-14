<script lang="ts">
  import { slide } from 'svelte/transition';
  import bowIcon from '~src/assets/images/bow.min.svg?raw';
  import GameRow from './game-row.svelte';
  import {
    createWordleGame,
    type Guess,
    getColorForState,
    LetterState,
    type Letter
  } from './store';

  let { state, makeGuess } = createWordleGame();

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const keyboard = [
    'qwertyuiop'.split('') as Letter[],
    'asdfghjkl'.split('') as Letter[],
    'zxcvbnm'.split('') as Letter[]
  ];

  let currentGuess = '';

  function handleLetter(l: string) {
    if (currentGuess.length < 5) currentGuess += l;
  }
  function handleBackspace() {
    currentGuess = currentGuess.slice(0, -1);
  }
  function handleEnter() {
    if (currentGuess.length != 5) return;
    makeGuess(currentGuess.split('') as Guess);
    currentGuess = '';
  }

  function onKeyDown({ key }: { key: string }) {
    if (alphabet.includes(key)) {
      handleLetter(key);
    } else if (key == 'Enter') {
      handleEnter();
    } else if (key == 'Backspace') {
      handleBackspace();
    }
  }
</script>

<div
  class="game relative w-full min-h-0 flex-grow max-w-[650px] mx-auto gap-4 flex flex-col py-4 justify-between"
>
  {#if $state.message}
    <div class="fixed left-0 right-0 top-0">
      <div
        transition:slide={{ axis: 'y' }}
        class="w-fit mx-auto z-1 p-2 mt-4 bg-neutral-700 text-white rounded shadow-lg"
      >
        {$state.message}
      </div>
    </div>
  {/if}

  <div />

  <div class="w-full px-4 max-h-[600px] min-h-0 flex-shrink">
    <div
      class="flex flex-col gap-2 mx-auto aspect-[5/6] min-h-0 h-full max-w-full relative"
    >
      <div
        class="absolute left-0 top-0 translate -translate-x-1/3 -translate-y-1/3 -rotate-15"
      >
        {@html bowIcon}
      </div>

      {#each $state.guesses as guess}
        <GameRow {guess} />
      {/each}

      {#if $state.guesses.length < 6}
        <GameRow letters={currentGuess} />
      {/if}

      {#each Array(5 - $state.guesses.length) as _}
        <GameRow />
      {/each}
    </div>
  </div>

  <div class="space-y-1 sm:space-y-2 px-1">
    {#each keyboard as row, i}
      <div
        class="flex flex-row gap-1 sm:gap-2 justify-center text-xl font-semibold"
      >
        {#if i == 1}
          <div class="w-5" />
        {/if}
        {#if i == 2}
          <button
            on:click={handleEnter}
            class="w-16 py-3 md:py-4 bg-neutral-50 text-neutral-800 border-2 border-neutral-200 rounded text-base"
          >
            Enter
          </button>
        {/if}
        {#each row as key}
          <button
            class={`w-10 py-3 md:py-4 text-center rounded text-neutral-800 border-2 border-neutral-200 ${getColorForState($state.letters.get(key) ?? LetterState.NotGuessed) || 'bg-neutral-50'}`}
            on:click={() => {
              if (currentGuess.length < 5) currentGuess += key;
            }}
          >
            {key}
          </button>
        {/each}
        {#if i == 2}
          <button
            on:click={handleBackspace}
            class="w-16 py-3 md:py-4 bg-neutral-50 border-2 borer-neutral-200 text-neutral-800 rounded"
            aria-label="Backspace"
          >
            &#x232B
          </button>
        {/if}
        {#if i == 1}
          <div class="w-5" />
        {/if}
      </div>
    {/each}
  </div>

  <div />
</div>

<svelte:window on:keydown={onKeyDown} />
