export type Difficulty = "easy" | "medium" | "hard" | "code";

export const textPools: Record<Difficulty, string[]> = {
  easy: [
    "the quick brown fox jumps over the lazy dog and runs away into the forest where it finds a warm den to rest for the night",
    "cats and dogs are popular pets around the world many people love to have them as companions in their homes",
    "the sun rises in the east and sets in the west every single day bringing light and warmth to all living things on earth",
    "she sells sea shells by the sea shore and the shells she sells are surely sea shells i am sure",
    "a simple life is often the best life we can live with good food clean water and kind friends around us",
    "the rain falls gently on the green leaves making a soft sound that fills the quiet air of the early morning",
    "every day is a new chance to learn something fresh and grow as a person who cares about others",
  ],
  medium: [
    "the ability to focus deeply on difficult tasks is becoming increasingly rare yet increasingly valuable in our distracted world",
    "successful people are not those who never fail but those who learn from every mistake and keep moving forward with purpose",
    "programming is the art of telling another human what one wants the computer to do in a language both can understand",
    "the most dangerous phrase in language is we have always done it this way because it prevents all innovation",
    "reading fiction develops empathy by allowing us to inhabit the minds and experiences of characters vastly different from ourselves",
    "creativity is not about having original ideas but about connecting existing ideas in ways that nobody has thought of before",
    "the greatest challenge of the information age is not access to data but developing the wisdom to interpret it correctly",
  ],
  hard: [
    "the juxtaposition of asymmetric cryptographic algorithms with quantum-resistant protocols demonstrates the extraordinary complexity of modern cybersecurity infrastructure",
    "philosophical epistemology examines the nature justification and rationality of knowledge and belief distinguishing between a priori and a posteriori cognition",
    "the electromagnetic spectrum encompasses radio waves microwaves infrared visible ultraviolet X-rays and gamma rays each with unique wavelength frequencies",
    "neural plasticity refers to the brain's extraordinary capacity to reorganize itself by forming new synaptic connections throughout an individual's lifetime",
    "socioeconomic inequality perpetuates intergenerational poverty cycles through systemic barriers that limit upward mobility in stratified contemporary capitalist societies",
    "the anthropic principle suggests that cosmological constants appear fine-tuned for consciousness because only in such universes can observers exist to measure them",
  ],
  code: [
    "const fibonacci = (n) => n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);",
    "function debounce(fn, delay) { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); }; }",
    "const flatten = (arr) => arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);",
    "async function fetchData(url) { try { const res = await fetch(url); return await res.json(); } catch (err) { console.error(err); } }",
    "const curry = (fn) => { const arity = fn.length; return function curried(...args) { return args.length >= arity ? fn(...args) : curried.bind(null, ...args); }; };",
  ],
};

export function getRandomText(difficulty: Difficulty): string {
  const pool = textPools[difficulty];
  return pool[Math.floor(Math.random() * pool.length)];
}
