// Рассчет рейтинга
/* eslint-disable no-plusplus */
export const ratingItem = (rating) => {
  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(rating)) {
    return 0
  }
  const res = {}
  rating.forEach((el) => {
    if (res[el] !== undefined) {
      ++res[el]
    } else res[el] = 1
  })

  const keys = Object.keys(res)
  const sum = () => {
    let sumR = 0
    for (let i = 0; i < keys.length; i++) {
      const grade = keys[i] * res[keys[i]]
      sumR += grade
    }
    return (sumR / rating.length).toFixed(1)
  }
  const ratingSum = sum()
  return ratingSum
}

// расчет скидки

export const sale = (price, discountActive) => {
  if (discountActive === 0) {
    return null
  }
  return price - (price / discountActive)
}
