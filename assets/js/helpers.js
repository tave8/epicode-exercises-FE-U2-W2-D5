const isDesktopDevice = () => {
  // 1. Modern API (Chromium-based browsers)
  if (navigator.userAgentData) {
    return !navigator.userAgentData.mobile;
  }

  // 2. Legacy Fallback (Safari, Firefox, etc.)
  // We check for common mobile identifiers; if none match, we assume Desktop
  const mobileRegex = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return !mobileRegex.test(navigator.userAgent);
};
