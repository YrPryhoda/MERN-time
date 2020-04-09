import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Fragment>
      <div className='alert'>
      <h1 className='x-large text-primary '>
        <i className='fas fa-exclamation-triangle'></i>
        {' '} Страница не обнаружена!
      </h1>
      <p> Извините, подобной страницы не существует</p>
    <Link className='text-primary' to='/'>
      Вернуться на главную
    </Link>
    </div>
    </Fragment>
  )
}

export default NotFound
