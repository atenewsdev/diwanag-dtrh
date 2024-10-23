import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useAnimation, motion, AnimatePresence } from 'framer-motion';
import HomeModal from '../components/HomeModal';

const Home = () => {
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  // Control loading screen visibility
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      filter: modal ? 'blur(20px)' : 'blur(0px)',  // Apply blur based on modal state
      transition: { duration: 0.5 },               // Optional: Smooth transition
    });
  }, [modal, controls]);

  // Handle image and content loading
  const handleImageLoad = () => {
    setIsLoading(false); // Hide the loading screen once the image is loaded
  };

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundImage: 'url("/assets/Main_BG.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 9999,
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/assets/loading.gif"
                alt="Loading..."
                style={{ width: '20vw' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background image (background.png) */}
      <motion.div
        animate={controls}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/assets/Main_BG.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1, // Ensure it stays behind other content
          overflow: 'hidden',
        }}
        onLoad={handleImageLoad}
      >
        <img
          src="/assets/57.png"
          alt="Left Mountains"
          style={{
            position: 'absolute',
            bottom: '2%',
            left: '2%',
            width: '35%',
            zIndex: '-1',
            objectFit: 'cover',
            opacity: '25%',
          }}
        />

        <img
          src="/assets/09.png"
          alt="Right Mountains"
          style={{
            position: 'absolute',
            top: '2%',
            right: '2%',
            width: '20%',
            zIndex: '-1',
            objectFit: 'cover',
            opacity: '30%',
          }}
        />
      </motion.div>

      {/* Main content */}
      <Grid
        component={motion.div}
        container
        justifyContent="center"
        alignItems="center"
        direction="row"
        spacing={2}
        animate={controls}
        style={{ height: '100vh', width: '100vw' }}
      >
        <Grid item>
          <img
            src="/assets/Typeface w Logo (Brown).png"
            alt="Down The Rabbit Hole Logo"
            style={{
              width: 'auto',
              maxWidth: '50vw',
              height: 'auto',
              maxHeight: '50vh',
              margin: '0 auto',
              display: 'block',
            }}
          />
        </Grid>
      </Grid>

      {/* Arrow button */}
      <Grid
        container
        justifyContent="flex-end"
        style={{
          position: 'absolute',
          bottom: '3%',
          right: '2%',
          padding: '1px',
        }}
      >
        <motion.img
          src="/assets/Button2.svg"
          alt="Clover Icon"
          onClick={() => setModal((i) => !i)}
          style={{
            cursor: 'pointer',
            width: '15vw',
            maxWidth: '175px',
            filter: 'drop-shadow(0 0 5px rgba(0, 0, 0, 0.5))',
          }}
          whileHover={{ scale: 1.1 }}  // Optionally add hover animation
        />
      </Grid>

      {/* Modal */}
      <HomeModal isVisible={modal} close={() => setModal(false)} />
    </>
  );
};

export default Home;
