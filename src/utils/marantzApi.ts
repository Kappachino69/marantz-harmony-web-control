
/**
 * Marantz SR6009 API utilities
 * Based on the HTTP API protocol exposed by the receiver
 */

// Test the connection to the receiver
export const testConnection = async (ipAddress: string): Promise<boolean> => {
  try {
    // Try to fetch the status page to verify the connection
    const response = await fetch(`http://${ipAddress}/MainZone/index.html`, {
      method: 'GET',
      mode: 'no-cors', // Required for cross-origin requests to the receiver
    });
    
    // If we get here, connection succeeded (even with no-cors we can detect network errors)
    return true;
  } catch (error) {
    console.error('Connection test failed:', error);
    return false;
  }
};

// Get the current power state
export const getPowerState = async (ipAddress: string): Promise<boolean> => {
  try {
    // This is just a mock implementation since we can't actually parse the response with no-cors
    // In a real implementation, you might use a server-side proxy to make these requests
    return true;
  } catch (error) {
    console.error('Failed to get power state:', error);
    return false;
  }
};

// Set the power state (ON/OFF)
export const setPowerState = async (ipAddress: string, isOn: boolean): Promise<boolean> => {
  try {
    const state = isOn ? 'ON' : 'OFF';
    await fetch(`http://${ipAddress}/MainZone/index.put.asp?cmd0=PutZone_OnOff/${state}&ZoneName=MainZone`, {
      method: 'GET',
      mode: 'no-cors',
    });
    return true;
  } catch (error) {
    console.error('Failed to set power state:', error);
    return false;
  }
};

// Set the volume level (0-98)
export const setVolume = async (ipAddress: string, volume: number): Promise<boolean> => {
  try {
    // Ensure volume is in valid range (0-98)
    const safeVolume = Math.max(0, Math.min(98, volume));
    await fetch(`http://${ipAddress}/MainZone/index.put.asp?cmd0=PutMasterVolumeSet/${safeVolume}`, {
      method: 'GET',
      mode: 'no-cors',
    });
    return true;
  } catch (error) {
    console.error('Failed to set volume:', error);
    return false;
  }
};

// Set the mute state
export const setMute = async (ipAddress: string, isMuted: boolean): Promise<boolean> => {
  try {
    const state = isMuted ? 'ON' : 'OFF';
    await fetch(`http://${ipAddress}/MainZone/index.put.asp?cmd0=PutVolumeMute/${state}`, {
      method: 'GET',
      mode: 'no-cors',
    });
    return true;
  } catch (error) {
    console.error('Failed to set mute state:', error);
    return false;
  }
};

// Set the input source
export const setSource = async (ipAddress: string, source: string): Promise<boolean> => {
  try {
    // Convert friendly source names to Marantz source codes
    const sourceMap: Record<string, string> = {
      'tv': 'TV',
      'cd': 'CD',
      'bluray': 'BD',
      'game': 'GAME',
      'media': 'MPLAY',
      'pc': 'PC',
      'tuner': 'TUNER',
      'aux': 'AUX1'
    };
    
    const sourceCode = sourceMap[source] || source.toUpperCase();
    
    await fetch(`http://${ipAddress}/MainZone/index.put.asp?cmd0=PutZone_InputFunction/${sourceCode}`, {
      method: 'GET',
      mode: 'no-cors',
    });
    return true;
  } catch (error) {
    console.error('Failed to set source:', error);
    return false;
  }
};
