import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useAnimation, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import HomeModal from '../components/HomeModal';
import localFont from 'next/font/local';

// Import local fonts
const archisDaughter = localFont({ src: '../public/fonts/ArchitectsDaughter.ttf' });
const hummerMiller = localFont({ src: '../public/fonts/Hummer Miller Demo.otf' });

const EditorsNote = () => {
  const [modal, setModal] = useState(false);
  const controls = useAnimation();
  const router = useRouter();

  useEffect(() => {
    controls.start({
      filter: modal ? 'blur(50px)' : 'blur(0px)',  // Apply blur based on modal state
    });
  }, [modal, controls]);

  const handleBackToHome = async () => {
    // Trigger exit animation before navigating
    await controls.start({
      opacity: 0,
      y: 20, // Move down slightly
      transition: { duration: 0.5, ease: "easeIn" }, // Smooth transition out
    });

    // Navigate back to the home page
    router.push('/');
  };

  return (
    <>
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
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
          src="/assets/06.png"
          alt="Alice"
          style={{
            position: 'absolute',
            bottom: '2%',
            right: '1%',
            width: '30%',
            zIndex: '-1',
            objectFit: 'cover',
            opacity: '25%',
          }}
        />
        
        <img
        src="/assets/54.png"
        alt="Alice"
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '0',
          height: '90%',
          zIndex: '-1',
          objectFit: 'cover',
          opacity: '20%',
        }}
      />

      </div>

      {/* Main content with framer-motion for smooth entry and exit */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }} // Start with a slight vertical offset and invisible
        exit={{ opacity: 0, y: 20 }} // Add exit animation for smooth transition
        transition={{ duration: 0.5, ease: "easeOut" }} // Smooth entry transition
        className={archisDaughter.className} // Apply ArchitectsDaughter font to entire content
        style={{ 
          padding: '2rem', 
          filter: modal ? 'blur(10px)' : 'blur(0px)', 
          display: 'flex', 
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
          height: '80vh', // Ensure it takes a good amount of space
        }}
      >
        {/* Replace image with div containing text and background */}
        <motion.div
          style={{
            backgroundImage: 'url("/assets/Notebook BG.png")', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '2rem',
            width: '70%', 
            maxWidth: '900px', 
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)', 
            borderRadius: '8px', 
            color: 'rgba(80, 27, 11, 1)', 
          }}
        >
          {/* Heading with Hummer Miller font */}
          <h1
            className={hummerMiller.className} 
            style={{
              fontSize: '2.5rem', 
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
            Epilogue
          </h1>

          {/* Body text */}
          <p
            style={{
              fontSize: '1.2rem', 
              lineHeight: '1.6', 
              textAlign: 'justify', 
            }}
          >
            In the whimsical tale of Alice in Wonderland,
            a curious little girl in a blue-and-white dress,
            urged by her desire to explore the unknown, fell into the
            rabbit hole after chasing the white hare. From there, she
            ventured across a peculiar land and had thrilling
            experiences with distinctive characters---what fun!
          </p>
          <p
            style={{
              fontSize: '1.2rem',
              lineHeight: '1.6',
              marginTop: '1rem', 
            }}
          >
            Going through the rabbit hole captures the essence of
            one’s journey in self-discovery as one exposes and
            immerses oneself in different realities yet to navigate.
            While there shall be times of strife and discomfort, the
            whole endeavor is not for naught as it is to seek
            understanding of our environment.  
          </p>

          <p
            style={{
              fontSize: '1.2rem',
              lineHeight: '1.6',
              marginTop: '1rem', 
            }}
          >
            In this year’s Diwanag, with the theme ‘Down the Rabbit
            Hole,’ we hope to reveal the diverse realities within the
            rabbit hole that are reminiscent of the issues about the
            self and the world. Moreover, it features various
            artworks that depict the different perspectives of
            artists about these curiosities and realities they have
            been exposed to. 
          </p>

          <p
            style={{
              fontSize: '1.2rem',
              lineHeight: '1.6',
              marginTop: '1rem', 
            }}
          >
            May every page of this art folio expand yourself into
            unexplored horizons and build the reality of your own
            imagination.
          </p>

          {/* Signature with Hummer Miller font */}
          <div
            style={{
              marginTop: '2rem', 
              textAlign: 'right', 
            }}
          >
            <p
              className={hummerMiller.className} 
              style={{
                fontSize: '1.8rem', 
                marginBottom: '0.2rem',
              }}
            >
              Earl Geibriel Dicipulo
            </p>
            <p style={{ fontSize: '1rem', fontStyle: 'italic' }}>
              Art Editor for Cartoon and Layout AY 2023-2024
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Arrow button with smooth transition back to home */}
      <Grid
        container
        justifyContent="flex-end"
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '5%',
          padding: '1px',
        }}
      >
        <motion.img
          src="/assets/Arrow_button.svg"
          alt="Arrow Icon"
          onClick={handleBackToHome} 
          style={{
            cursor: 'pointer',
            width: '15vw',  
            height: 'auto', 
            maxWidth: '75px',  
          }}
          whileHover={{ scale: 1.1 }}  
        />
      </Grid>

      {/* Modal */}
      <HomeModal isVisible={modal} close={() => setModal(false)} />
    </>
  );
};

export default EditorsNote;
