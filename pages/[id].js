import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Dialog, DialogContent } from '@mui/material';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import art_deets from '../data/art_deets';
import NavModal from '../components/NavModal';
import localFont from 'next/font/local';

const myFont = localFont({ src: '../public/fonts/Hummer Miller Demo.otf' });
const ArchisDaughter = localFont({ src: '../public/fonts/ArchitectsDaughter.ttf' });

const ViewAll = ({ currentIndex }) => {
  const router = useRouter();
  const [isFadingOut, setIsFadingOut] = useState(false);  // Control fade-out animation
  const [isLoading, setIsLoading] = useState(true);  // Control loading screen visibility
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal open state
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);  // Image modal state

  const handleNavigation = (newIndex) => {
    setIsFadingOut(true); // Trigger fade-out
    setTimeout(() => {
      router.push(`/${art_deets[newIndex].id}`);
    }, 500);  // Match this with the animation duration
  };

  // Listen for route changes and reset isFadingOut when navigation is done
  useEffect(() => {
    const handleRouteChangeComplete = () => {
      setIsFadingOut(false); // Reset isFadingOut after navigation
      setIsLoading(true);
    };

    // Listen to route change complete events
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    // Cleanup the event listener on component unmount
    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);

  const forward = () => {
    if (currentIndex === art_deets.length - 1) {
      handleNavigation(0);
    } else {
      handleNavigation(currentIndex + 1);
      setIsLoading(true);
    }
  };

  const back = () => {
    if (currentIndex === 0) {
      handleNavigation(art_deets.length - 1);
    } else {
      handleNavigation(currentIndex - 1);
    }
  };

  const home = () => {
    router.push('/');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openImageModal = () => setIsImageModalOpen(true);
  const closeImageModal = () => setIsImageModalOpen(false);

  // Handle image and content loading
  const handleImageLoad = () => {
    setIsLoading(false); // Hide the loading screen once the image is loaded
  };

  if (currentIndex < 0 || currentIndex >= art_deets.length) {
    return <div>No art found.</div>;
  }

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

      {/* Background div, kept fixed and behind other content */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/assets/Main_BG.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
        }}
      >

        <img  
          src="/assets/50.png"
          alt="Bottom Forest"
          style={{
            position: 'absolute',
            bottom: '-2%',
            right: '2%',
            width: '55%',
            zIndex: '-1',
            objectFit: 'cover',
            opacity: '20%',
          }}
        />
        
        <img  
        src="/assets/26.png"
        alt="Sword"
        style={{
          position: 'absolute',
          top: '2%',
          left: '-1.3%',
          width: '18.5%',
          zIndex: '-1',
          objectFit: 'cover',
          opacity: '20%',
          transform: 'scaleX(-1)',
        }}
      />
      
      <img  
        src="/assets/05.png"
        alt="Hat"
        style={{
          position: 'absolute',
          top: '5%',
          right: '1%',
          width: '15%',
          zIndex: '-1',
          objectFit: 'cover',
          opacity: '20%',
          transform: 'rotate(10deg)',
        }}
      />

      </div>

      {/* AnimatePresence for fade-in and fade-out */}
      <AnimatePresence>
        {/* Prevent reappearance by checking if fading out */}
        {!isFadingOut && (
          <motion.div
            key={art_deets[currentIndex].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ zIndex: 1, height: '97vh', overflow: 'hidden' }}
          >
            {/* Main content grid with two-column layout */}
            <Grid container sx={{ height: '100vh', p: 0, m: 0 }} alignItems="center" justifyContent="center" overflow="hidden">
              {/* Left side for the artwork image */}
              <Grid item xs={12} md={6} container justifyContent="center" alignItems="center" overflow="hidden">
                <motion.img
                  src={`/art/${art_deets[currentIndex].id}.png`}
                  alt={art_deets[currentIndex].title}
                  style={{
                    maxHeight: '90vh',
                    maxWidth: '80%',
                    margin: '0 auto',
                    cursor: 'pointer',
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  onClick={openImageModal}  // Open modal on image click
                  onLoad={handleImageLoad}  // Trigger once the image is fully loaded
                />
              </Grid>

              {/* Right side for the artwork details and buttons */}
              <Grid item xs={12} md={6} container justifyContent="center" alignItems="center" direction="column" overflow="hidden">
                {/* Centered Text Box */}
                <Grid item xs={12} container justifyContent="center" alignItems="center">
                  <Card sx={{ 
                      width: '80%', 
                      backgroundImage: 'url("/assets/Notebook BG.png")',
                      backgroundSize: 'cover',
                      boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)', 
                      backgroundPosition: 'center',
                      borderRadius: '8px', 
                      color: 'rgba(80, 27, 11, 1)', 
                      padding: 2,
                      textAlign: 'center',
                    }}>
                    <CardContent>
                      <Grid container justifyContent="center" alignItems="center" direction="column">
                        <Grid item>
                          <motion.p
                            className={myFont.className}
                            style={{
                                fontSize: '2.4rem',
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}
                          >
                            {art_deets[currentIndex].title}
                          </motion.p>
                        </Grid>
                        <Grid item>
                          <motion.p
                            className={ArchisDaughter.className}
                            style={{
                                textAlign: 'center',
                                margin: 0,
                            }}
                          >
                            {art_deets[currentIndex].medium}
                          </motion.p>
                        </Grid>
                        <Grid item>
                          <motion.p
                            className={ArchisDaughter.className}
                            style={{
                              fontSize: '1rem',
                              fontStyle: 'italic',
                              textAlign: 'center',
                              marginTop: 0,
                            }}
                          >
                            by {art_deets[currentIndex].artist}
                          </motion.p>
                        </Grid>
                        <Grid item>
                        <motion.p
                            className={ArchisDaughter.className}
                            style={{
                              fontSize: '1rem',
                              textAlign: 'center',
                              margin: 0
                            }}
                          >
                            {art_deets[currentIndex].description}
                          </motion.p>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                {/* Buttons below the text box */}
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                  <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                    {/* Back Button */}
                    <Grid item>
                      <motion.img
                        src="/assets/BackArrow.svg"
                        onClick={back}
                        style={{
                          cursor: 'pointer',
                          width: '15vw',
                          height: 'auto',
                          maxWidth: '75px',
                        }}
                        whileHover={{ scale: 1.1 }}
                      />
                    </Grid>
                    {/* Forward Button */}
                    <Grid item>
                      <motion.img
                        src="/assets/Arrow_button.svg"
                        onClick={forward}
                        style={{
                          cursor: 'pointer',
                          width: '15vw',
                          height: 'auto',
                          maxWidth: '75px',
                        }}
                        whileHover={{ scale: 1.1 }}
                      />
                    </Grid>
                    {/* Home Button */}
                    <Grid item>
                      <motion.img
                        src="/assets/HomeButton.svg"
                        onClick={home}
                        style={{
                          cursor: 'pointer',
                          width: '15vw',
                          height: 'auto',
                          maxWidth: '75px',
                        }}
                        whileHover={{ scale: 1.1 }}
                      />
                    </Grid>
                    {/* Modal Button */}
                    <Grid item>
                      <motion.img
                        src="/assets/BurgerButton.svg"
                        onClick={openModal}
                        style={{
                          cursor: 'pointer',
                          width: '15vw',
                          height: 'auto',
                          maxWidth: '75px',
                        }}
                        whileHover={{ scale: 1.1 }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <Dialog
        open={isImageModalOpen}
        onClose={closeImageModal}
        fullScreen
        PaperProps={{
          style: {
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(10px)', // Apply blur effect
            boxShadow: 'none',
          },
        }}
      >
        <DialogContent sx={{ display: 'flex', justifyContent: 'center' , alignItems: 'center'}} onClick={closeImageModal}>
          <motion.img
            src={`/art/${art_deets[currentIndex].id}.png`}
            alt={art_deets[currentIndex].title}
            style={{
              maxHeight: '95%',
              maxWidth: '100%',
              objectFit: 'contain',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </DialogContent>
      </Dialog>

      {/* Nav Modal */}
      <NavModal isVisible={isModalOpen} close={closeModal} artworks={art_deets} />
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const currentIndex = art_deets.findIndex((art) => art.id === id);

  if (currentIndex === -1) {
    return {
      notFound: true,
    };
  }

  return { props: { currentIndex } };
}

export default ViewAll;
