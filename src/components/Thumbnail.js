import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const x = StyleSheet.create({
  thumbnail: {
    margin: "0 30px 30px 0",
    borderRadius: "50%",
    backgroundPosition: "center center",
    height: "180px",
    width: "180px"
  }
})

export default ({src, alt, onClick}) => {

  const url = `url(${src})`
  return (
    <div className={css([x.thumbnail])} style={{backgroundImage: url}} onClick={onClick} />
  )
}
