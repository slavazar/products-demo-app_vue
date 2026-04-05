// stores/counter.ts 
// A Pinia store that holds a counter value and a computed property for double the counter value.
// This is a simple example of how to use Pinia for state management in a Vue.js application. The store includes a function to increment the counter value.
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
