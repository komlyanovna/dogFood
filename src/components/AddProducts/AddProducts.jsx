import { useNavigate } from 'react-router-dom'
import StyleBtn from './styles.module.scss'

export function AddProducts() {
  const navigate = useNavigate()
  const onClickAddProduct = () => {
    navigate('/FormAddProducts')
  }

  return (
    <button
      type="button"
      className={StyleBtn.addProduct}
      onClick={() => onClickAddProduct()}
    >
      Добавить товар
    </button>
  )
}
