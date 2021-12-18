import defaultSettings from '@/settings'

const title = defaultSettings.title || '店家管理系統'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
