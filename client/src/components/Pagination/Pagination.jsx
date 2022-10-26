import React, { useEffect, useRef, useState } from 'react';
import style from './Pagination.module.css'

const Pagination = ({countries, onChangePagination}) => {


  useEffect(() => {
  
    // console.log(lengthArray)
    // console.log('Me actualizo')
  }, [countries])


  return (
    <div className={style.containerButtonsPagination}>
      <div className={style.containerButtons}>
      { countries.length > 0 ?
      (
        countries.map((countriesArrays, index)=> {
          return (
            <button className={style.buttonPag} key={index} value={index} onClick={(e) => {onChangePagination(e)}}>{index+=1}</button>
          )
        })
        ) : (
          <></>
          )
        }
      </div>
    </div>
  )
}

export default Pagination