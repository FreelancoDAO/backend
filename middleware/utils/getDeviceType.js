const deviceTypes = [
  { label: 'iphone', type: 'ios' },
  { label: 'android', type: 'android' },
  { label: 'ipad', type: 'ios' },
  { label: 'macintosh', type: 'mac' },
  { label: 'windows', type: 'windows' },
  { label: 'okhttp', type: 'android' },
  { label: 'darwin', type: 'ios' }
];
/**
 * Gets the device type from device got through header 'user-agent'
 * @param {string} device - device name
 */
const getDeviceType = (device) => {
  if (!device) {
    return 'NA';
  }
  let deviceType;
  for (type of deviceTypes) {
    if (device.toLowerCase().includes(type.label)) {
      deviceType = type.type;
      break;
    }
  }
  return deviceType ?? 'NA';
};

module.exports = { getDeviceType };
