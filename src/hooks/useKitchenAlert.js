import { useRef, useCallback } from "react";

export function useKitchenAlert() {
  const initialLoadDone = useRef(false);
  const knownOrderIds = useRef(new Set());

  const playAlertSound = useCallback(() => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const playBeep = (startTime) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.type = 'square';
        osc.frequency.value = 880;

        gainNode.gain.setValueAtTime(0, ctx.currentTime + startTime);
        gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + startTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + startTime + 0.3);

        osc.start(ctx.currentTime + startTime);
        osc.stop(ctx.currentTime + startTime + 0.3);
      };

      playBeep(0);
      playBeep(0.4);
      playBeep(0.8);
    } catch (err) {
      console.warn("Could not play alert sound", err);
    }
  }, []);

  const notifyOnNewOrders = useCallback((orders) => {
    const pendingIds = orders.filter(o => o.status === "placed").map(o => o.id);
    let hasNewOrder = false;
    
    pendingIds.forEach(id => {
      if (!knownOrderIds.current.has(id)) hasNewOrder = true;
    });

    knownOrderIds.current = new Set(pendingIds);

    if (hasNewOrder && initialLoadDone.current) {
      playAlertSound();
    }
    initialLoadDone.current = true;
  }, [playAlertSound]);

  return { notifyOnNewOrders };
}
