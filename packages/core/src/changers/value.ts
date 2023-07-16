import type { FormStore } from '../stores/form'
import { FormStoreSymbol } from '../stores/form'
import { getContainer } from '../share/container'

export const changeValue = (
  formName: string,
  fieldName: string,
  value: string
): void => {
  const container = getContainer()
  const store = container.get<FormStore>(FormStoreSymbol)

  // TODO: 發出事件 - before change
  store.changeValue(formName, fieldName, value)
  // TODO: 發出事件 - after change

  // TODO: 執行資料處理器
  // TODO: 執行可見處理器
  // TODO: 執行禁用處理器
}
