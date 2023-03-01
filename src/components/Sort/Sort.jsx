import StyleSort from './styles.module.scss'

export function Sort({
  value, onClickSort,
}) {
  const sortItem = [
    { name: 'Популярные', sortProperty: 'data' },
    { name: 'Новинки', sortProperty: 'created_at' },
    { name: 'Сначала дорогие', sortProperty: 'price+' },
    { name: 'Сначала дешевые', sortProperty: 'price-' },
    { name: 'По рейтингу', sortProperty: 'rating' },
    { name: 'По скидке', sortProperty: 'sale' },
  ]

  return (
    <div>
      <ul className={StyleSort.list}>
        {sortItem.map((obj, i) => (
          <li
            key={i}
            onClick={() => {
              onClickSort(obj.sortProperty)
            }}
            className={value === obj.sortProperty ? [StyleSort.active] : [StyleSort.li]}
          >
            {obj.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
