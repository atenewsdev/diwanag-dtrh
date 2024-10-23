import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Grid from '@mui/material/Grid';
import art_deets from '../data/art_deets'; // Ensure this file contains the artworks
import localFont from 'next/font/local';

// Import local font
const myFont = localFont({ src: '../public/fonts/Hummer Miller Demo.otf' });
const basicFont = localFont({ src: '../public/fonts/basictitlefont.ttf' });

const ArtModal = ({ isVisible, close }) => {
  const router = useRouter();
  const modalContentRef = useRef(null);

  const handleClickOutside = (e) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
      close(); 
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  const handleTitleClick = (artworkId) => {
    router.push(`/${artworkId}`);
    close(); // Close the modal after the user navigates
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Black tint with 50% opacity
            backdropFilter: "blur(10px)", // Optional: Apply blur for effect
          }}
        >
          {/* Modal content wrapper */}
          <div
            ref={modalContentRef}
            style={{
              borderRadius: '8px',
              paddingTop: '6vh',
              width: '60%',
              maxHeight: '100vh',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <Grid container justifyContent="center" alignItems="center" spacing={1} direction="column">
              <Grid item>
                <img src="/assets/Clover.png" alt="Clover" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 20))' }} />
              </Grid>

              {/* Map through the artworks and display each one as clickable text */}
              {art_deets.map((artwork) => (  
                <Grid item key={artwork.id}>
                  <motion.p
                    className={myFont.className} // Apply the "Architects Daughter" font
                    style={{
                      cursor: 'pointer',
                      fontSize: '2.5rem', // Adjust text size if needed
                      lineHeight: '0.1rem',
                      color: 'rgba(80, 27, 11, 1)',
                      textShadow: '1px 1px 20px #fff, 1px 1px 20px #ccc',
                      textAlign: 'center',
                      fontWeight: 'bold'
                    }}
                    onClick={() => handleTitleClick(artwork.id)} // Close modal and navigate
                    whileHover={{ scale: 1.1 }} // Optional hover animation
                    whileTap={{ scale: 0.9 }} // Optional tap animation
                  >
                    {artwork.title}
                  </motion.p>
                </Grid>
              ))}

              <Grid item>
                <p
                  className={basicFont.className}
                  onClick={() => close()} // Close button
                  style={{
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  Close
                </p>
              </Grid>

              <Grid item>
                <br/>
                <br/>
                <br/>
              </Grid>
            </Grid>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArtModal;
