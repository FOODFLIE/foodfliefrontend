import { useRef, useCallback } from "react";

export function useKitchenAlert() {
  const initialLoadDone = useRef(false);
  const knownOrderIds = useRef(new Set());

  const playAlertSound = useCallback(() => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const playBeep = (startTime, frequency = 800, duration = 0.3) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.type = "square";
        osc.frequency.value = frequency;

        gainNode.gain.setValueAtTime(0, ctx.currentTime + startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + startTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + startTime + duration);

        osc.start(ctx.currentTime + startTime);
        osc.stop(ctx.currentTime + startTime + duration);
      };

      // Continuous ringing pattern for 5 seconds
      // High-pitched urgent beeps
      for (let i = 0; i < 15; i++) {
        playBeep(i * 0.33, 1000); // Every 330ms for 5 seconds
      }
      
      // Add some variation with different frequencies
      for (let i = 0; i < 10; i++) {
        playBeep(i * 0.5, 1200, 0.2); // Higher pitch overlay
      }
    } catch (err) {
      console.warn("Could not play alert sound", err);
    }
  }, []);

  const notifyOnNewOrders = useCallback(
    (orders) => {
      const pendingIds = orders
        .filter((o) => o.status === "placed")
        .map((o) => o.id);
      let hasNewOrder = false;

      pendingIds.forEach((id) => {
        if (!knownOrderIds.current.has(id)) hasNewOrder = true;
      });

      knownOrderIds.current = new Set(pendingIds);

      if (hasNewOrder && initialLoadDone.current) {
        // Only play sound if tab is not visible (user not actively looking)
        if (document.hidden || !document.hasFocus()) {
          playAlertSound();
        }
      }
      initialLoadDone.current = true;
    },
    [playAlertSound],
  );

  return { notifyOnNewOrders };
}