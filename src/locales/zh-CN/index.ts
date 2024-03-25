import settings from './settings';
import puml from './puml';

// eslint-disable-next-line @typescript-eslint/naming-convention
const zh_CN = {
  reset: '重置',
  copy: '复制',
  copied: '复制成功',
  copy_failed: '复制失败',
  document: 'PlantUML文档',
  download: '下载',
  setting: '设置',
  dark_mode: '深色模式',
  github: 'GitHub',
  light_mode: '浅色模式',
  import_code: '导入代码',
  sure_to_delete: '确定删除吗？',
  use_this: '使用并编辑该代码',
  add_task: '添加任务',
  ...settings,
  ...puml
};

export default zh_CN;
