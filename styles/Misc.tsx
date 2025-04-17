import { Global } from "@emotion/react";
import { FC } from "react";

const Misc: FC = () => {
  return (
    <Global
      styles={`
        html {
          scroll-behavior: smooth;
        }

        #main {
          width: 100%;
          max-width: 48rem;
          margin: 0 auto;
        }

        /* Ensure backgrounds are properly sized */
        [data-bg="true"] {
          background-size: cover !important;
          background-position: center !important;
          transition: background 0.2s ease-in-out;
        }

        /* Special fix for image backgrounds */
        [data-bg="true"][style*="url("] {
          background-size: cover !important;
          background-position: center !important;
          background-repeat: no-repeat !important;
        }

        /* Linear gradients need a little help */
        [data-bg="true"][style*="linear-gradient"] {
          background-size: 200% 200% !important;
          animation: gradientMovement 15s ease infinite;
        }

        @keyframes gradientMovement {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @media (max-width: 768px) {
          .CodeMirror {
            font-size: 14px !important;
            line-height: 1.5 !important;
            height: auto !important;
            min-height: 200px;
          }
          
          .CodeMirror-lines {
            padding: 8px 0 !important; 
          }
          
          .CodeMirror pre.CodeMirror-line, 
          .CodeMirror pre.CodeMirror-line-like {
            padding: 0 8px !important;
          }
          
          /* Touch-friendly scrollbars */
          .CodeMirror-scroll {
            scrollbar-width: thin;
          }
          
          /* Better tap targets */
          .chakra-button {
            min-height: 40px;
            min-width: 40px;
          }
          
          /* Remove iOS tap highlight */
          * {
            -webkit-tap-highlight-color: transparent;
          }
        }
      `}
    />
  );
};

export default Misc;
