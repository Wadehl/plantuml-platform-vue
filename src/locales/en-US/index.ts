import settings from './settings';
import puml from './puml';

// eslint-disable-next-line @typescript-eslint/naming-convention
const en_US = {
  reset: 'Reset',
  copy: 'Copy',
  copied: 'Copied',
  copy_failed: 'Copy failed',
  document: 'PlantUML Document',
  download: 'Download',
  setting: 'Setting',
  dark_mode: 'Dark Mode',
  github: 'GitHub',
  light_mode: 'Light Mode',
  import_code: 'Import Code',
  sure_to_delete: 'Are you sure to delete?',
  use_this: 'Use and edit this code',
  add_task: 'Add a new task',
  ...settings,
  ...puml
};

export default en_US;
