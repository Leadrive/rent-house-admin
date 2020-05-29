import React, { useState, useEffect } from 'react'
import { Upload, message } from 'antd';
import styled from 'styled-components'
import style from '@assets/global-style'
import TextAvatar from '@/components/TextAvatar'
import uploadApi from '@apis/uploadImg'
const UploadImg = ({ name, url, callback, limits }) => {
  const [limitMessage, setLimitMessage] = useState('')
  let fileList: any, setFileList: any
  [fileList, setFileList] = useState([]);
  console.log('ddd', limits)
  useEffect(() => {
    if (url) {
      setFileList([{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: url,
      }])
    }
  }, [setFileList, url])
  const handleRemove = (file) => {
    return uploadApi.removeUserLogo().then((res) => {
      if (res) {
        setFileList([])
        callback()
        message.success('成功移除头像')
        return true
      } else {
        return false
      }
    })
  }
  const beforeUpload = (file) => {
    const currentType = file.type.split('/')[1]
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      setLimitMessage('')
      message.error(`You can only upload JPG/PNG file!`);
    }
    const isMore = file.size > limits.avatarSizeLimit;
    if (!isMore) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isMore;
  }
  const handleUpload = ({
    file,
    onError,
    onSuccess,
  }) => {
    const form = new FormData();
    form.append('file', file);
    return uploadApi.postImage(form).then((res) => {
      if (res) {
        onSuccess(res, file);
        callback()
      } else {
        onError('上传失败')
      }
    })
  }
  return (
    <>
      <Style>
        <div className='img-border global-flex-center'>
          {!url && <TextAvatar name={name || 'admin'} avatar={url} width="64"></TextAvatar>}
          <Upload
            customRequest={handleUpload}
            onRemove={handleRemove}
            beforeUpload={beforeUpload}
            fileList={fileList}
            listType="picture-card"
          >
            {
              <i className="icon iconfont iconbianji"></i>
            }
          </Upload>

        </div>

      </Style>

    </>
  )
}

const Style = styled.div`
.iconbianji {
  font-size: 12px;
  color: ${style['theme-color']}
}
.img-border {
  .ant-upload-list-picture-card .ant-upload-list-item-info {
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }
  .ant-upload.ant-upload-select-picture-card {
    width: 64px;
    height: 64px;
    line-height: 64px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 1);
    padding: 0px;
    margin-bottom: 0px;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:hover {
      color: ${style['theme-color']};
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.06);
    }
  }
  .ant-upload-list-picture-card-container {
    width: 64px;
    height: 64px;
    line-height: 64px;
  }
  .ant-upload-list-picture-card .ant-upload-list-item {
    width: 64px;
    height: 64px;
    line-height: 64px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 1);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    padding: 0px;
    border: 0px;
    &:hover {
      color: ${style['theme-color']};
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.06);
    }
  }
}


`


export default UploadImg