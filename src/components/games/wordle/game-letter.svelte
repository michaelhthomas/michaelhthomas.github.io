<script lang="ts">
  import { LetterState, getColorForState } from './store';

  export let letter: string | undefined = undefined;
  export let state: LetterState = LetterState.NotGuessed;

  let color = getColorForState(state);
</script>

<div
  class={`text-neutral-700 text-4xl select-none font-bold aspect-square flex items-center justify-center text-center rounded border-2 border-neutral-200 ${color}`}
>
  {letter}
</div>
