<template>
    <!-- Loading Spinner Component -->
    <div 
      class="loading-container" 
      :class="[
        sizeClasses,
        variantClasses,
        { 'loading-overlay': overlay }
      ]"
      :style="customStyles"
    >
      <svg
        class="loading-spinner"
        :class="[
          animationClasses,
          { 'loading-spinner-sm': size === 'sm' },
          { 'loading-spinner-md': size === 'md' || !size },
          { 'loading-spinner-lg': size === 'lg' },
          { 'loading-spinner-xl': size === 'xl' }
        ]"
        viewBox="0 0 50 50"
        :style="svgStyles"
      >
        <!-- Circle background -->
        <circle
          class="loading-track"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          :stroke="trackColor"
          stroke-width="4"
          opacity="0.2"
        />
        
        <!-- Animated circle -->
        <circle
          class="loading-circle"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
          :stroke-dasharray="dashArray"
          :stroke-dashoffset="dashOffset"
        />
      </svg>
  
      <!-- Optional label -->
      <span v-if="label" class="loading-label" :class="labelClasses">
        {{ label }}
      </span>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    // Size options: 'sm', 'md', 'lg', 'xl'
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
    },
    // Color options: 'blue', 'white', 'gray', 'green', 'red', or custom hex
    color: {
      type: String,
      default: 'blue'
    },
    // Variant: 'default', 'pulse', 'bounce'
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'pulse', 'bounce'].includes(value)
    },
    // Whether to show as overlay
    overlay: {
      type: Boolean,
      default: false
    },
    // Optional label text
    label: {
      type: String,
      default: ''
    },
    // Label position: 'bottom', 'right', 'top'
    labelPosition: {
      type: String,
      default: 'bottom',
      validator: (value) => ['bottom', 'right', 'top'].includes(value)
    },
    // Custom stroke width
    strokeWidth: {
      type: Number,
      default: 4
    },
    // Custom track color
    trackColor: {
      type: String,
      default: 'currentColor'
    },
    // Custom styles
    customStyles: {
      type: Object,
      default: () => ({})
    },
    // Animation speed (in seconds)
    speed: {
      type: Number,
      default: 0.8
    }
  })
  
  // Size classes
  const sizeClasses = computed(() => {
    const sizes = {
      sm: 'loading-size-sm',
      md: 'loading-size-md',
      lg: 'loading-size-lg',
      xl: 'loading-size-xl'
    }
    return sizes[props.size] || sizes.md
  })
  
  // Color classes
  const colorClasses = computed(() => {
    const colors = {
      blue: 'text-blue-600',
      white: 'text-white',
      gray: 'text-gray-600',
      green: 'text-green-600',
      red: 'text-red-600',
      yellow: 'text-yellow-500',
      purple: 'text-purple-600',
      indigo: 'text-indigo-600'
    }
    return colors[props.color] || `text-${props.color}`
  })
  
  // Variant classes
  const variantClasses = computed(() => {
    const variants = {
      default: '',
      pulse: 'loading-pulse',
      bounce: 'loading-bounce'
    }
    return variants[props.variant] || ''
  })
  
  // Animation classes
  const animationClasses = computed(() => {
    return {
      'animate-spin': props.variant === 'default' || props.variant === 'pulse',
      'animate-bounce': props.variant === 'bounce'
    }
  })
  
  // Label classes
  const labelClasses = computed(() => {
    const positions = {
      bottom: 'loading-label-bottom',
      right: 'loading-label-right',
      top: 'loading-label-top'
    }
    return [
      colorClasses.value,
      positions[props.labelPosition] || positions.bottom
    ]
  })
  
  // SVG stroke dasharray (circumference)
  const dashArray = computed(() => {
    const circumference = 2 * Math.PI * 20
    return circumference * 0.75
  })
  
  // SVG stroke dashoffset (for animation)
  const dashOffset = computed(() => {
    const circumference = 2 * Math.PI * 20
    return circumference * 0.25
  })
  
  // SVG styles
  const svgStyles = computed(() => {
    return {
      '--loading-speed': `${props.speed}s`,
      'stroke-dasharray': dashArray.value,
      'stroke-dashoffset': dashOffset.value
    }
  })
  
  // Size classes for CSS
  const sizeStyles = computed(() => {
    const sizes = {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xl: 'w-24 h-24'
    }
    return sizes[props.size] || sizes.md
  })
  </script>
  
  <style scoped>
  .loading-container {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }
  
  .loading-overlay {
    position: fixed;
    inset: 0;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(4px);
    z-index: 9999;
  }
  
  .loading-spinner {
    transform-origin: center;
    transition: all 0.3s ease;
  }
  
  /* Size variants */
  .loading-spinner-sm {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .loading-spinner-md {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .loading-spinner-lg {
    width: 4rem;
    height: 4rem;
  }
  
  .loading-spinner-xl {
    width: 5rem;
    height: 5rem;
  }
  
  /* Pulse animation for the container */
  .loading-pulse {
    animation: pulse 1.5s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(0.95);
    }
  }
  
  /* Bounce animation */
  .loading-bounce {
    animation: bounce 0.8s ease-in-out infinite;
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }
  
  /* Circle animation */
  .loading-circle {
    animation: spin var(--loading-speed, 0.8s) linear infinite;
    transform-origin: center;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dashoffset: 0;
    }
    100% {
      transform: rotate(360deg);
      stroke-dashoffset: -125.6;
    }
  }
  
  /* Label positions */
  .loading-label {
    font-size: 0.875rem;
    font-weight: 500;
    opacity: 0.8;
    transition: all 0.3s ease;
  }
  
  .loading-label-bottom {
    margin-top: 0.5rem;
  }
  
  .loading-label-right {
    margin-left: 0.75rem;
  }
  
  .loading-label-top {
    margin-bottom: 0.5rem;
  }
  
  .loading-label-bottom,
  .loading-label-top {
    text-align: center;
  }
  
  .loading-label-right {
    display: inline-flex;
    align-items: center;
  }
  
  /* Container flex directions for label positions */
  .loading-container:has(.loading-label-right) {
    flex-direction: row;
  }
  
  .loading-container:has(.loading-label-top) {
    flex-direction: column-reverse;
  }
  
  /* Overlay content centering */
  .loading-overlay .loading-container {
    min-height: 100vh;
  }
  </style>