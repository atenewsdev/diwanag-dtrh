import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Dialog, DialogContent } from '@mui/material';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import art_deets from '../data/art_deets';
import NavModal from '../components/NavModal';
import localFont from 'next/font/local';

const HummerMiller = localFont({ src: '../public/fonts/Hummer Miller Demo.otf' });
const ArchisDaughter = localFont({ src: '../public/fonts/ArchitectsDaughter.ttf' });

const ViewAll = ({ currentIndex }) => {
  const router = useRouter();
  const [isFadingOut, setIsFadingOut] = useState(false);  // Control fade-out animation
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal open state
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);  // Image modal state

  const handleNavigation = (newIndex) => {
    setIsFadingOut(true);
    setTimeout(() => {
      router.push(`/${art_deets[newIndex].id}`);
      setIsFadingOut(false);  // Reset fade-out state for the next animation
    }, 500);  // Match this with the animation duration
  };

  const forward = () => {
    if (currentIndex === art_deets.length - 1) {
      handleNavigation(0);
    } else {
      handleNavigation(currentIndex + 1);
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

  if (currentIndex < 0 || currentIndex >= art_deets.length) {
    return <div>No art found.</div>;
  }

  return (
    <>
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

      {/* <img  
        src="/assets/10.png"
        alt="Bird"
        style={{
          position: 'absolute',
          top: '10%',
          left: '33%',
          width: '25%',
          zIndex: '-1',
          objectFit: 'cover',
          opacity: '10%',
          transform: 'rotate(30deg)',
        }}
      /> */}

      </div>

      {/* AnimatePresence for fade-in and fade-out */}
      <AnimatePresence wait>
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
                    cursor: 'pointer', // Add pointer to indicate clickable
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  onClick={openImageModal}  // Open modal on image click
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
                          <Typography className={HummerMiller.className} sx={{ fontSize: '2.4rem', fontWeight: 'bold', textAlign: 'center' }}>
                            {art_deets[currentIndex].title}
                          </Typography>
                        </Grid>
                        <br/>
                        <Grid item>
                          <Typography className={ArchisDaughter.className} sx={{ textAlign: 'center' }} >
                            {art_deets[currentIndex].medium}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography className={ArchisDaughter.className} sx={{ fontSize: '1rem', fontStyle: 'italic', textAlign: 'center' }}>
                            by {art_deets[currentIndex].artist}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography className={ArchisDaughter.className} sx={{ fontSize: '1rem', textAlign: 'center' }}>
                            {art_deets[currentIndex].description}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <br/>
                <br/>
                <br/>
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
