import { useRef, useCallback } from "react";

export function useKitchenAlert() {
  const initialLoadDone = useRef(false);
  const knownOrderIds = useRef(new Set());
  const audioRef = useRef(null);

  const playAlertSound = useCallback(() => {
    try {
      // Stop previous sound if already playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Try to load the audio file from public folder
      const audio = new Audio("/alertsound.wav");
      
      audio.volume = 1.0; // Maximum volume
      audio.loop = false; // Don't loop, we'll replay manually

      audioRef.current = audio;

      // Handle audio loading errors
      audio.addEventListener('error', (e) => {
        console.warn("Audio file not found, using fallback beep sound");
        playFallbackSound();
      });

      // Play the sound and repeat for 8 seconds
      const playSound = () => {
        audio.currentTime = 0;
        audio.play().catch((err) => {
          console.warn("Could not play alert sound, trying fallback", err);
          playFallbackSound();
        });
      };

      // Start playing
      playSound();

      // Repeat every time the audio ends, for 8 seconds total
      const startTime = Date.now();
      const repeatInterval = setInterval(() => {
        if (Date.now() - startTime >= 8000) {
          clearInterval(repeatInterval);
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
        } else {
          playSound();
        }
      }, audio.duration * 1000 || 1000); // Repeat based on audio duration or every 1 second

      // Fallback: Stop after 8 seconds regardless
      setTimeout(() => {
        clearInterval(repeatInterval);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }, 8000);
    } catch (err) {
      console.warn("Could not play alert sound, trying fallback", err);
      playFallbackSound();
    }
  }, []);

  // Fallback sound using Web Audio API - 8 seconds duration
  const playFallbackSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create continuous beeping for 8 seconds
      const beepDuration = 0.3;
      const pauseDuration = 0.2;
      const totalDuration = 8; // 8 seconds
      const patternDuration = beepDuration + pauseDuration;
      const numberOfBeeps = Math.floor(totalDuration / patternDuration);
      
      for (let i = 0; i < numberOfBeeps; i++) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // 800Hz beep
        
        const startTime = audioContext.currentTime + (i * patternDuration);
        const endTime = startTime + beepDuration;
        
        // Fade in and out for smoother sound
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
        gainNode.gain.setValueAtTime(0.3, endTime - 0.01);
        gainNode.gain.linearRampToValueAtTime(0, endTime);
        
        oscillator.start(startTime);
        oscillator.stop(endTime);
      }
      
    } catch (err) {
      console.warn("Fallback sound also failed", err);
      // Last resort: vibration pattern for 8 seconds
      if (window.navigator && window.navigator.vibrate) {
        // Vibrate pattern: 300ms on, 200ms off, repeated
        const vibrationPattern = [];
        for (let i = 0; i < 16; i++) {
          vibrationPattern.push(300, 200);
        }
        window.navigator.vibrate(vibrationPattern);
      }
    }
  }, []);

  const notifyOnNewOrders = useCallback(
    (orders) => {
      const pendingIds = orders
        .filter((o) => o.status === "placed")
        .map((o) => o.id);

      let hasNewOrder = false;

      pendingIds.forEach((id) => {
        if (!knownOrderIds.current.has(id)) {
          hasNewOrder = true;
        }
      });

      knownOrderIds.current = new Set(pendingIds);

      if (hasNewOrder && initialLoadDone.current) {
        playAlertSound();
      }

      initialLoadDone.current = true;
    },
    [playAlertSound]
  );

  const stopAlertSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return {
    notifyOnNewOrders,
    stopAlertSound,
    playAlertSound, // Export for testing
  };
}