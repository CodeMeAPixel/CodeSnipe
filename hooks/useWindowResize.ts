import { useEffect, useState } from 'react';
import { theme } from '../config/theme';

export const useWindowResize = () => {
  const [width, setWidth] = useState<string | number>('100%');

  useEffect(() => {
    const setupResizers = () => {
      const wResizer = document.getElementById('w') as HTMLElement;
      const eResizer = document.getElementById('e') as HTMLElement;
      const mainEl = document.getElementById('main') as HTMLElement;
      
      if (!wResizer || !eResizer || !mainEl) {
        return false;
      }
      
      const resizers = [wResizer, eResizer];
      
      resizers.forEach(resizer => {
        // Clean up old event listeners
        const oldResizer = resizer.cloneNode(true) as HTMLElement;
        resizer.parentNode?.replaceChild(oldResizer, resizer);
        
        // Double click handler
        oldResizer.addEventListener('dblclick', () => {
          mainEl.style.width = theme.breakpoints.md;
          setWidth(theme.breakpoints.md);
        });
        
        // Mousedown handler for resize
        oldResizer.addEventListener('mousedown', (e) => {
          e.preventDefault();
          document.body.style.cursor = `${oldResizer.id}-resize`;
          oldResizer.style.transform = 'scale(1.25)';
          
          const startResize = (e: MouseEvent) => {
            if (oldResizer.id === 'e') {
              const newWidth = e.pageX - mainEl.getBoundingClientRect().left;
              mainEl.style.width = `${newWidth}px`;
              setWidth(newWidth);
            }
            
            if (oldResizer.id === 'w') {
              const newWidth = mainEl.getBoundingClientRect().right - e.pageX;
              mainEl.style.width = `${newWidth}px`;
              setWidth(newWidth);
            }
          };
          
          const stopResize = () => {
            oldResizer.style.transform = '';
            document.body.style.cursor = 'default';
            
            window.removeEventListener('mousemove', startResize);
            window.removeEventListener('mouseup', stopResize);
          };
          
          window.addEventListener('mousemove', startResize);
          window.addEventListener('mouseup', stopResize);
        });
      });
      
      return true;
    };
    
    // Try to setup resizers, and if elements are not ready, try again
    const intervalId = setInterval(() => {
      if (setupResizers()) {
        clearInterval(intervalId);
      }
    }, 100);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return width;
}; 