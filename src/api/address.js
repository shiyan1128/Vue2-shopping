import request from '@/utils/request'

// 获取地址列表
export const getAddressList = () => {
  return request.get('/address/list')
}

// 添加地址列表
export const addAddressList = (name, phone, region, detail) => {
  return request.post('/address/add', {
    form: {
      name,
      phone,
      region,
      detail
    }
  })
}
