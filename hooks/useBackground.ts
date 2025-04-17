import { useEffect } from 'react';
import { Gradient } from "../types/PanelSettings";

export const useBackground = (background: boolean, color: Gradient) => {
  useEffect(() => {
    const picArea = document.getElementById('pic-area');
    if (picArea) {
      if (background) {
        // Create a style element if it doesn't exist
        let styleEl = document.getElementById('background-style');
        if (!styleEl) {
          styleEl = document.createElement('style');
          styleEl.id = 'background-style';
          document.head.appendChild(styleEl);
        }

        // Apply background to a pseudo-element
        styleEl.textContent = `
          #pic-area::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: ${color.value};
            background-size: cover;
            background-position: center;
            z-index: 0;
            pointer-events: none;
          }
          #pic-area > * {
            position: relative;
            z-index: 1;
          }
        `;
      } else {
        // Remove the style element when background is disabled
        const styleEl = document.getElementById('background-style');
        if (styleEl) {
          styleEl.remove();
        }
      }
    }

    return () => {
      // Clean up the style element on unmount
      const styleEl = document.getElementById('background-style');
      if (styleEl) {
        styleEl.remove();
      }
    };
  }, [background, color]);
}; 