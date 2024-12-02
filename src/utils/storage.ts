import Taro from '@tarojs/taro'

interface StorageData {
  [key: string]: any
}

class Storage {
  /**
   * 获取存储数据
   * @param key 存储的键
   * @returns 存储的值
   */
  static get<T = any>(key: string): T | null {
    try {
      const value = Taro.getStorageSync(key)
      return value ? (value as T) : null
    } catch (error) {
      console.error(`Failed to get storage item with key "${key}":`, error)
      return null
    }
  }

  /**
   * 设置存储数据
   * @param key 存储的键
   * @param value 存储的值
   */
  static set<T = any>(key: string, value: T): void {
    try {
      Taro.setStorageSync(key, value)
    } catch (error) {
      console.error(`Failed to set storage item with key "${key}":`, error)
    }
  }

  /**
   * 删除存储数据
   * @param key 存储的键
   */
  static remove(key: string): void {
    try {
      Taro.removeStorageSync(key)
    } catch (error) {
      console.error(`Failed to remove storage item with key "${key}":`, error)
    }
  }

  /**
   * 清空所有存储数据
   */
  static clear(): void {
    try {
      Taro.clearStorageSync()
    } catch (error) {
      console.error('Failed to clear storage:', error)
    }
  }

  /**
   * 获取所有存储数据
   * @returns 所有存储数据
   */
  static getAll(): StorageData {
    try {
      const { keys } = Taro.getStorageInfoSync()
      const data: StorageData = {}
      keys.forEach(key => {
        data[key] = Taro.getStorageSync(key)
      })
      return data
    } catch (error) {
      console.error('Failed to get all storage items:', error)
      return {}
    }
  }
}

export default Storage