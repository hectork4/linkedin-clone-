import { Avatar } from '@material-ui/core'
import { ThumbUpAltOutlined, ChatOutlined, ShareOutlined, SendOutlined } from '@material-ui/icons'
import React from 'react'
import InputOption from './InputOption'
import './Post.css'

function Post({ name='Guest', description='temporal guest', message='Please, Resgister', photoURL }) {
  return (
    <div className='post'>
      <div className='post__header'>
        <Avatar src={photoURL}>{name[0]}</Avatar>
        <div className='post__info'>
          <p className='post__name'>{name}</p>
          <p className='post__description'>{description}</p>
        </div>
      </div>
      <div className='post__body'>
        <p>{message}</p>
      </div>
      <div className='post__buttons'>
        <InputOption Icon={ThumbUpAltOutlined} title='Like' color='gray' />
        <InputOption Icon={ChatOutlined} title='Comment' color='gray' />
        <InputOption Icon={ShareOutlined} title='Share' color='gray' />
        <InputOption Icon={SendOutlined} title='Send' color='gray' />
      </div>
    </div>
  )
}

export default Post