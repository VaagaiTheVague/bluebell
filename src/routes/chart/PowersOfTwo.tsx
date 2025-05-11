import { createSignal, Index } from 'solid-js';

export default function PowersOfTwo() {
    const [list, _] = createSignal([
        {power: 0, value: 1},
        {power: 1, value: 2},
        {power: 2, value: 4},
        {power: 3, value: 8},
        {power: 4, value: 16},
        {power: 5, value: 32},
        {power: 6, value: 64},
        {power: 7, value: 128},
        {power: 8, value: 256},
        {power: 9, value: 512},
        {power: 10, value: 1024},
        {power: 11, value: 2048},
    ]);

    return <>
        <h1>Powers of 2</h1>
        <div class="grid grid-cols-2 justify-items-center align-items-center">
            <Index each={list()}>{(i, _) =>
                <>
                    <p>{i().power}</p>
                    <p>{i().value}</p>
                </>
            }</Index>
        </div>
    </>
}
